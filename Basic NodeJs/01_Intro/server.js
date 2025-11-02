const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello NodeJs.");
});
server.listen(3000, () => {
  console.log("Server running on the port 3000");
});
module.exports = { server };
