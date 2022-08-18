#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netdb.h>
#include <pthread.h>
#include <signal.h>
#include <poll.h>
#include <sys/stat.h>

#define DEFAULT_PORT 10074
#define MAX_CONNECTIONS 12
#define MAX_REQUEST_SIZE 8192
#define SEGMENT_SIZE 0x100
#define MAX_LOAD_TIME 1000

// Credit to Dr. Brian Stuart's chat server example
// For this Client struct technique
// https://www.cs.drexel.edu/~bls96/cs283/chatsrv.c

typedef struct Client Client;
struct Client
{
	int acceptedSock;
	pthread_t thread;
	Client *next, *prev;
};

Client *head = NULL;

void *handle_request(void *);
void terminate(int);

struct sockaddr_in addr;
int current_port = DEFAULT_PORT;
int sock;
int acceptedSock;
char rootDir[256];

int main(int argc, char **argv)
{
	switch (argc)
	{
	case 1:
		snprintf(rootDir, 256, "%s", ".");
		break;
	case 2:
		// accept directory with or without tail
		// forward slash
		if (argv[1][strlen(argv[1]) - 1] == '/')
		{
			argv[1][strlen(argv[1]) - 1] = '\0';
		}

		snprintf(rootDir, 256, "%s%s", "", argv[1]);
		printf("Root: %s\n", rootDir);
		break;
	default:
		printf("Ignoring extra arguments.\n");
		break;
	}

	signal(SIGINT, terminate);

	sock = socket(AF_INET, SOCK_STREAM, 0);
	setsockopt(sock, SOL_SOCKET, SO_REUSEPORT, &(int){1}, sizeof(int));

	if (sock < 0)
	{
		perror("Sock");
		terminate(1);
	}

	printf("Socket created\n");

	int addr_len;

	addr.sin_addr.s_addr = htonl(INADDR_ANY);
	addr.sin_family = AF_INET;
	addr.sin_port = htons(current_port++);
	addr_len = sizeof(addr);

	if (bind(sock, (struct sockaddr *)&addr, sizeof(addr)))
	{
		perror("Bind");
		terminate(2);
	}

	printf("Socket bound\n");
	Client *client;

	printf("Accepting new requests...\n");

	while (1)
	{
		if (listen(sock, MAX_CONNECTIONS) < 0)
		{
			perror("Listen");
			terminate(3);
		}

		if ((acceptedSock = accept(sock, (struct sockaddr *)&addr, &addr_len)) < 0)
		{
			perror("Accept");
			terminate(4);
		}

		client = calloc(1, sizeof(Client));
		client->acceptedSock = acceptedSock;
		client->next = NULL;
		client->prev = head;
		head = client;

		pthread_create(&client->thread, NULL, handle_request, client);
	}

	return 0;
}

void *handle_request(void *cli)
{
	Client *client = cli;
	char request[MAX_REQUEST_SIZE] = {0};
	int segmentSize = 0;
	int requestSize = 0;
	int dirSize = 0;
	int p;

	while (1)
	{
		struct pollfd pfds;
		pfds.fd = client->acceptedSock;
		pfds.events = POLL_IN;
		p = poll(&pfds, 1, MAX_LOAD_TIME);

		if (p < 0)
		{
			perror("Poll");
			terminate(5);
		}
		else if (p == 0)
		{
			break;
		}

		char segment[SEGMENT_SIZE] = {0};
		segmentSize = recv(client->acceptedSock, &segment, SEGMENT_SIZE, 0);

		// strcat(request, segment);
		memcpy(&request[requestSize], segment, segmentSize);
		requestSize += segmentSize;
	}

	if (requestSize == 0)
	{
		// fprintf(stderr,"Request cancelled\n");
	}
	else if (requestSize < 0)
	{
		perror("recv");
		terminate(1);
	}
	else
	{
		printf("\n\033[1;35mRequest:\n\033[0;37m%s", request);

		char parsedRequest[64][256] = {{0}};

		// I want to do more later and parse every line,
		// but for now I'll just parse the first line to
		// get the GET request
		char c = request[0];
		int i = 0, tok = 0, start = 0;

		while (c != '\n')
		{
			c = request[i];

			if (c == ' ' || c == '\n')
			{
				strncpy(parsedRequest[tok], &request[start], i - start);
				tok++;
				start = i + 1;
			}
			i++;
		}

		char dir[256] = {0};
		strcpy(dir, rootDir);
		strcat(dir, parsedRequest[1]);
		struct stat path_stat;
		stat(dir, &path_stat);
		int s;
		if((s=S_ISREG(path_stat.st_mode))==0) { //check if file is directory
			strcat(dir, "/");
		}

		if (dir[strlen(dir) - 1] == '/')
		{
			strcat(dir, "index.html");
		}

		char *response = malloc(0);
		int responseSize = 0;

		printf("File: %s\n", dir);

		FILE *file = fopen(dir, "r+");


		if (file != NULL)
		{
			if (fseek(file, 0, SEEK_END) < 0)
			{
				perror("fseek");
			}

			int fileSize = ftell(file);

			response = realloc(response, 18);
			bzero(response, 18);
			strcpy(response, "HTTP/1.1 200 OK\n\n");
			responseSize = strlen(response) + 1;

			rewind(file);
			char *buffer = malloc(fileSize+1);
			bzero(buffer, fileSize+1);
			int bufsize = fread(buffer, 1, fileSize, file);
			printf("bufs %i files%i\n",bufsize,fileSize);
			responseSize += bufsize;
			response = realloc(response, responseSize);
			bzero(&response[responseSize-bufsize-1], bufsize+1);
			memcpy(&response[responseSize-bufsize-1], buffer, bufsize+1);
			free(buffer);
			fclose(file);
		}
		else
		{
			printf("\033[0;31mCan't find file.\033[0;37m\n");
			response = realloc(response, 25);
			bzero(response, 25);
			strcpy(response, "HTTP/1.1 404 Not Found\n\n");
		}

		printf("\n\033[1;34mResponse:\n\033[0;37m%s", response);

		if (send(client->acceptedSock, response, responseSize-1, 0) < 0)
		{
			perror("Send");
			terminate(8);
		}

		free(response);

		printf("\n\033[1;32mFinished.\033[0;37m\n");
	}

	if (client->prev != NULL)
		client->prev->next = client->next;
	if (client->next != NULL)
		client->next->prev = client->prev;

	shutdown(client->acceptedSock, SHUT_RDWR);
	free(client);
	fflush(stdin);
}

void terminate(int exitcode)
{
	shutdown(acceptedSock, SHUT_RDWR);
	shutdown(sock, SHUT_RDWR);
	printf("\n\033[1;32mGoodbye!\n");
	exit(exitcode);
}
