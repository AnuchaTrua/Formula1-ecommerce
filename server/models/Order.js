import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String, // หรือใช้ ref: "User" ถ้ามีระบบ user เต็มรูปแบบ
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      qty: Number,
      price: Number,
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
