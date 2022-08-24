const http = require("http");
const fs = requre('fs').promises;
const host = 'tux3.cs.drexel.edu';
const port = 10074;
let indexFile;
const requestListener = function (request, response) {
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(indexFile);
};

const server = http.createServer(requestListener);
fs.readFile(__dirname + "/index.html")
	.then(content => {
		indexFile = contents;
		server.listen(port, host, () => {
    		console.log(`Server is running on http://${host}:${port}`);
		});
	})
	.catch(err => {
		console.error(`Could not read index.html file: ${err}`);
		porcess.exit(1);
	});
