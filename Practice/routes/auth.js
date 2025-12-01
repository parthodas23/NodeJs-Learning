import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import JWT from "jsonwebtoken";
const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(500).json("Wrong Credentials.");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(500).json("Wrong credentials.");

    const accessToken = JWT.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
