const http = require("http");
const fs = require("fs");
var root = ".";
const args = process.argv.slice(2);
if(args.length<1) {throw "no host provided."}
if(args.length<2) {throw "no port provided."}
if(args.length==3) {root = args[2]}
const host = args[0];
const port = args[1];
//if(args[0])ls
//const host = 'tux3.cs.drexel.edu';
//const port = 10074;

const requestListener = (request, response) => {
	var fullPath = root+request.url;
	console.log("Requested: " + request.url);
	var fileName; 
	if (!fs.existsSync(fullPath)) {
		console.log("Requested file '" + request.url + "' does not exist");
		response.writeHead(404);
		fs.readFile("./404.html", 'utf8', function(err, data) {
			console.log("Returning 404 file");
			response.end(data);	
		});
		
		return;
	}
	
	if(request.url[request.url.length-1]== '/') {
		fileName = "index.html"
	}
	else {
		var p = request.url.split('/');
		fileName = p[p.length-1];
	}
	
	const q = fileName.split('.');
	const ext = q[q.length-1];
	
	console.log(fileName,ext);
	switch(ext) {
		case "html":
			response.setHeader("Content-Type","text/html");
			break;
		case "css":
			response.setHeader("Content-Type","text/css");
			break;
		case "js":
			response.setHeader("Content-Type","application/javascript");
			break;
		case "ico":
			response.setHeader("Content-Type","image/x-icon");
			break;
		case "json":
			response.setHeader("Content-Type", "application/json");
			break;
		case "png":
		case "gif":
			response.setHeader("Content-Type", "image/" + ext);
			break;
		case "jpg":
		case "jpeg":
		case "jpe":
			response.setHeader("Content-Type", "image/jpeg");
			break;
		case "pdf":
			response.setHeader("Content-Type", "application/pdf");
	}
  	
	response.writeHead(200);
	  
	fs.readFile(fullPath, null, function(err, data){
		// Display the file content
		//console.log(data);
		response.end(data);
		return;
    });
	
};


const server = http.createServer(requestListener);
server.listen(port, host, () => {
	console.log(`Server on http://${host}:${port}`);
});


