import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./router/auth.js";
import userRoute from "./router/user.js";
import productRoute from "./router/product.js";
import cartRoute from "./router/cart.js";
import orderRoute from "./router/order.js";

const app = express();

app.use(express.json()); // this will help in parsing body
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("BD connected successfully");
  })
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(5000, () => {
  console.log("Server listening on 5000");
});
