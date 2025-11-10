require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => console.log("Err Happen", err));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 0,
    default: 18,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports=User
