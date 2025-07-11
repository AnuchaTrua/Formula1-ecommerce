import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["team", "type", "driver"], required: true },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
