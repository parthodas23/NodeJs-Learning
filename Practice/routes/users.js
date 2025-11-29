import { Router } from "express";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
const router = Router();

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    if (req.body.password) {
      const genSalt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, genSalt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
