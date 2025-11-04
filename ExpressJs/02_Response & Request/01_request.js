// Req --> it's a incomming http request , data sent by clint

const express = require("express");
const app = express();

app.use(express.json()); // express body parser middleware

app.post("/users/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body); // require middleware like app.use(express.json())
});

app.listen(3000, () => {
  console.log("Server listening on the post 3000");
});
