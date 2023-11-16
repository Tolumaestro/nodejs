const http = require("http");
const routes = require("./routes");
const { log } = require("console");

const server = http.createServer(routes.handler);
console.log("it's working");

server.listen(3000);
