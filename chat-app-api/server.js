const http = require("http");

const urlAddress = "127.0.0.1";
const port = 4000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Hello from node</h1>");
});

server.listen(port, urlAddress, () => {
    console.log("server running at " + urlAddress + ":" + port + "/");
});
