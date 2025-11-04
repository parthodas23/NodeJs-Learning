const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.get("/about", (req, res) => {
  res.send("Wellcome to about page");
});

app.listen(3000, () => {
  console.log("Server running on the port 3000");
});

// const http = require("http");
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Welcome to the Home Page");
//   } else if (req.url === "/about") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("This is our about page");
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Page not found");
//   }
// });
// server.listen(3000, () => {
//   console.log("Server listening on the post 3000");
// });
