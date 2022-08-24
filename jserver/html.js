const http = require("http");

const host = 'tux3.cs.drexel.edu';
const port = 10074;

const requestListener = function (request, response) {
	response.setHeader("Content-Type","text/html");
	response.writeHead(200);
	response.end(`<html><body>This is HTML</h1></body></html>`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
