import { Router } from "express";
import Product from "../models/Product.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/verifyToken.js";

const router = Router();

// add product
router.post("/add", verifyTokenAndAdmin, async(req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct=await product.save()
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(403).json(error);
  }
});

// update product
router.put("/update/:productId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: req.body }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(401).json(error);
  }
});

// delete product
router.delete("/delete/:productId", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get a product

router.get("/find/:productId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const qCategory = req.query.category;

    const products = qCategory
      ? await Product.find({ categories: req.query.category })
      : await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
