import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  price: {
    type: Number,
    required: true
  },
  description: String,
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],

});

const Product = mongoose.model("Product", productSchema);

export default Product;
