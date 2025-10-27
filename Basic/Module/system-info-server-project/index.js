const fs = require("fs");
const http = require("http");
const path = require("path");
const os = require("os");

const filePath = path.join(__dirname, "data.txt");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading file");
      }

      const systemInfo = `
      <ul>
      <li><strong>Platform:</strong>${os.platform()}</li>
      <li><strong>Architechture:</strong>${os.arch()}</li>
      <li><strong>CPU Cores:</strong>${os.cpus().length}</li>
      <li><strong>Free Memory:</strong>${(
        os.freemem() /
        1024 /
        1024 /
        1024
      ).toFixed(2)}</li>
      <li><strong>Total Memory:</strong>${(
        os.totalmem() /
        1024 /
        1024 /
        1024
      ).toFixed(2)}</li>
      <li><strong>Home Directory:</strong>${os.homedir()}</li>
      </ul>
      `;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <h1>${data}</h1>
        <h2>System Info:</h2>
        ${systemInfo}
        `);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}`);
});
