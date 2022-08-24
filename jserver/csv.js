const http = require("http");

const host = 'tux3.cs.drexel.edu';
const port = 10074;

const requestListener = function (request, response) {
	response.setHeader("Content-Type","text/csv");
	response.setHeader("Content-Disposition","attachment;filename=oceanpals.csv");
	response.writeHead(200);
	response.end(`id,name,email\n1Jarod Mellus,jtm365@drexel.edu`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
