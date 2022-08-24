const http = require("http");

const host = 'tux3.cs.drexel.edu';
const port = 10074;

const requestListener = function (req, res) {};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
