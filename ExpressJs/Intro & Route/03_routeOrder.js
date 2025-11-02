const express = require("express");
const app = express();

// middleware run before any route
app.use((req, res, next) => {
  // middleware is a function that run between request comming in and response going out
  // middleware has three parametter
  console.log(`First Middleware`);
  next(); // go to next middleware or route
});

app.use(express.json()); // this is also a middleware for convert json into js object

app.get("/", (req, res) => {
  // route are defined after middleware
  res.send("Home Page");
});

// this will run only if no route matched
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log(`App running on the post 3000`);
});
