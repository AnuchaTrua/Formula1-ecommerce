import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST new product
router.post("/", async (req, res) => {
  const { name, image, price, description, categories } = req.body; // ✅ เพิ่ม categories

  try {
    const newProduct = new Product({
      name,
      image,
      price,
      description,
      categories, // ✅ บันทึกลง DB ด้วย
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


export default router;
