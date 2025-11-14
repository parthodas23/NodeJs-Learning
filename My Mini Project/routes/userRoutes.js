import express from "express";
import { User } from "../model/User";

const router = express.Router();

router.post("/user", async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

router.get("/user", async (req, res) => {
  const found = await User.find();
  res.json(found);
});

export default router;
