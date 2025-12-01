import Product from "../models/Product.js";
import { Router } from "express";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";

const router = Router();

// create
router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// delete
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted.");
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get product
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    let products;
    const qCategory = req.query.category;
    const qNew = req.query.new;
    if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else if (qNew) {
      products = await Product.find().limit(1);
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
