const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = 3000;
const filePath = path.join(__dirname, "data.json");

const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/users") {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) return sendJSON(res, 500, { message: "Could't read file" });
      sendJSON(res, 200, JSON.parse(data));
    });
  } else if (req.method === "POST" && req.url === "/users") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const newUser = JSON.parse(body);

      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return sendJSON(res, 500, { message: "Server Error" });
        const users = JSON.parse(data);
        newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
          if (err) return sendJSON(res, 500, { message: "Write Error" });

          sendJSON(res, 200, {
            message: "User added",
            user: newUser,
          });
        });
      });
    });
  } else {
    sendJSON(res, 404, { message: "Page not found" });
  }
});

server.listen(PORT, () => {
  console.log("Server listening on the port 3000");
});
