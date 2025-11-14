import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected with mongoDB");
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};
