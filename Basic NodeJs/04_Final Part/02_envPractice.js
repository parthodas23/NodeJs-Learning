require("dotenv").config();
const http = require("http");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Api running on the key ${process.env.API_KEY}`);
  }
});

server.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});
