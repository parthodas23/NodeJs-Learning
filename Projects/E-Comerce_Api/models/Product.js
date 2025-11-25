import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timesatms: true }
);

export default mongoose.model("Product", ProductSchema);
