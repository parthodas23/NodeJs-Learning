import { Router } from "express";
import Cart from "../models/Cart.js";
import {
    verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/verifyToken.js";

const router = Router();

router.post("/add/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.userId);
    res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
