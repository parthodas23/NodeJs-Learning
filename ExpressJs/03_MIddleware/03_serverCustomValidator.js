const express = require("express");
const validateUser = require("./03_validateUser");
const app = express();

app.use(express.json());

//                   Genarel Format
// app.METHOD(path, middleware1, middleware2, ..., routeHandler)
// "/register" --> path
// validateUser --> middleware
// (req,res) --> route handler

app.post("/register", validateUser, (req, res) => {
  res
    .status(200)
    .json({ message: "User registration successfull", data: req.body });
});

app.listen(3000, () => {
  console.log("Running");
});
