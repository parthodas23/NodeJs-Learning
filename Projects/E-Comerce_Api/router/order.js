import { Router } from "express";
import Order from "../models/Order.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/verifyToken.js";

const router = Router();

router.post("/order/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// cancel order
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = await Order.findById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Order.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: prevMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
