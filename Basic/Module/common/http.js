const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello Partha You're doing great.");
});

server.listen(3000, () => {
  console.log("Server listining on the port 3000.");
});
