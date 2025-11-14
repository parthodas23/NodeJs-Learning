import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.end("Finish the project Setup.");
});

app.listen(3000, () => {
  console.log("Running 3000");
});
