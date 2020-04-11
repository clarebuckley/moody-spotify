const http = require("http");

http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Listening on 8080");
    response.end();
}).listen(8080);