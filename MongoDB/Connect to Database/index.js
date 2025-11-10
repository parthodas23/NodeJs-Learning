require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log("Error happen", err));

app.get("/", (req, res) => [
  res.send("Your Express app successfully connected with mongoDB."),
]);

app.listen(PORT, () => {
  console.log("Server running");
});
