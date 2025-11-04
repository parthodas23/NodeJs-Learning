// Middleware is a function that sits between the request and the response — it can inspect, modify, or handle the request before sending a response.

// Think of it like a checkpoint or layer that every HTTP request goes through before it reaches your route handler

const express = require("express");
const app = express();

app.use(express.json()); // built-in middleware for json body parser

app.use((req, res, next) => {
  // this middleware run for every res & req
  console.log(`Method :${req.method} | Url : ${req.url}`);
  next(); // continue to the next route or middleware
});

app.get("/hello", (req, res) => {
  console.log("Get -----");
  res.send("Hello Partha");
});

app.post("/users/:id", (req, res) => {
  console.log("Post ----- Request");

  res.status(200).json({
    message: "This is Post Request",
    id: req.params,
    body: req.body,
    query: req.query,
  });
});

app.listen(3000, () => {
  console.log("3000 running");
});
