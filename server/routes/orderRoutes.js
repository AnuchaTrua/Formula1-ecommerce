import express from "express";
import Order from "../models/Order.js";
import mongoose from "mongoose";

const router = express.Router();

// POST /api/orders
router.post("/", async (req, res) => {
  const { userId, items, total } = req.body;

  try {
    const newOrder = new Order({ userId, items, total });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/orders (สำหรับ admin)
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// GET /api/orders/user/:userId
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userIdObj = mongoose.Types.ObjectId.isValid(userId)
        ? new mongoose.Types.ObjectId(userId)
        : userId;

    const orders = await Order.find({ userId: userIdObj }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
