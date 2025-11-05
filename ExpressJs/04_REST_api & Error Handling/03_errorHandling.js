const express = require("express");
const app = express(); // this insialize our app, app reresent's the hole server

app.use(express.json());

app.get("/", (req, res) => {
  throw new Error("Home couldn't found.");
});

app.get("/user", (req, res, next) => {
  const err = new Error("User couldn't found.");
  err.status = 404;
  next(err); // this send the err to the next middleware which our error handleing  middleware below
});

app.use((err, req, res, next) => {
  // this is error handling middleware (always set at the end)
  res.status(err.status || 500).json({
    error: true,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("rinning 3000");
});
