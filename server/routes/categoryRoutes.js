import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// POST new category
router.post("/", async (req, res) => {
  const { name, type } = req.body;
  try {
    const newCat = new Category({ name, type });
    await newCat.save();
    res.status(201).json(newCat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update category
router.put("/:id", async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE category
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
