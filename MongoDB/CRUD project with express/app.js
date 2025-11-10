const express = require("express");
const User = require("./model");

const app = express();

app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(201).json(allUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/user", async (req, res) => {
  try {
    const insertUser = await User.insertMany(req.body);
    res.status(201).json({ InsertedUser: insertUser });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/user/:name", async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { name: `${req.params.name}` },
      req.body
    );
    res.status(200).json({ udatedUser: updateUser });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/user/:name", async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ name: `${req.params.name}` });
    res.status(200).json({ deletedUser: deleteUser });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3000, () => {
  console.log("running");
});
