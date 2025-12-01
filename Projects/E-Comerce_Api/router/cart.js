import { Router } from "express";
import Cart from "../models/Cart.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/verifyToken.js";

const router = Router();

router.post("/add", verifyToken, async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete();
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
