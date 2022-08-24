const http = require("http");

const host = 'tux3.cs.drexel.edu';
const port = 10074;

const requestListener = function (request, response) {
	resonse.setHeader("Content-Type","application/json");
	response.writeHead(200);
	response.end(`{message: "This is JSON"}`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
