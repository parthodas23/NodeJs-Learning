const express = require("express");
const authUser = require("./04_authUser");
const app = express();

app.get("/dashboard", authUser, (req, res) => {
  res.status(200).send("Welcome to Dashboard");
});

app.listen(3000, () => {
  console.log("running");
});
