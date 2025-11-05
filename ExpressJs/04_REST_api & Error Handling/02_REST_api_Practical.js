const express = require("express");
const app = express();

app.use(express.json());
const users = [
  { name: "Partha", id: 1, email: "parthodasm@gmail.com" },
  { name: "Annie", id: 2, email: "anniedas@gmail.com" },
];
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ message: "User couldn't found." });
  res.status(200).json(user);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  users.push(newUser);

  res.status(200).json(users);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ message: "User couldn't found." });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.status(200).json(users);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1)
    return res.status(404).json({ message: "User couldn't found." });

  users.splice(userIndex, 1);

  res.status(200).json();
});

app.listen(3000, () => {
  console.log("3000 running");
});
