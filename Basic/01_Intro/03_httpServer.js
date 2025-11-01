const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  if (req.url === "/") {
    res.end("This is Home Page Brooooo........");
  } else if (req.url === "/about") {
    res.end("This is About Page Brooooo........");
  } else if (req.url === "/contact") {
    res.end("This is Contact Page Brooooo........");
  } else if (req.url === "/profile") {
    res.end("This is Profile Page Brooooo........");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Page couldn't found");
  }
});

server.listen(4000, () => {
  console.log("Server listening on the port 4000");
});
