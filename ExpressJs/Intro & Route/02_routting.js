const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/page/:pageName", (req, res) => {
  const name = req.params.pageName;
  res.send(`This is ${name} Page`);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: "User Created", user: newUser });
});

app.listen(3000, () => {
  console.log("App listening on the post 3000");
});
