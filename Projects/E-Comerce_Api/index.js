import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./router/user.js";
import authRoute from "./router/auth.js";
const app = express();
app.use(express.json());

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("Err", err));

// app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("Backend server is running.");
});
