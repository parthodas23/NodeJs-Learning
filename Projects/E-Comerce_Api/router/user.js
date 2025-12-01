import { Router } from "express";
import bcrypt from "bcryptjs";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js";
import User from "../models/User.js";
const router = Router();

// update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    const genSalt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, genSalt);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (error) {
    return res.status(400).json(error);
  }
});

// get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.params.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(2)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get stats for Admin
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    let date = new Date();
    let lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    let data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
