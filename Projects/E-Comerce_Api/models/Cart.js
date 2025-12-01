import mongoose from "mongoose";

const CartSchema = mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
  },

  { timestams: true }
);

export default mongoose.model("Cart", CartSchema);
