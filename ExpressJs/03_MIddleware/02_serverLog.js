const express = require("express");
const Logger = require("./02_Logger");
const app = express();

app.use(Logger);

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("3000 running");
});
