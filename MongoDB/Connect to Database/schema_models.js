require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log("Error happen"));

let userSchema = new mongoose.Schema({
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
  },
});

const User = mongoose.model("User", userSchema);

const run = async () => {
  try {
    const user = new User({
      name: "Partha das",
      age: 20,
      email: "parthodasm123@gmail.com",
    });

    await user.save();
    console.log("User saved", user);
    const insert = await User.insertMany([
      {
        name: "Annie",
        age: 10,
        email: "annie@gmail.com",
      },
      {
        name: "Farhad",
        age: 21,
        email: "forhad@gmail.com",
      },
    ]);
    console.log("Inserted many users");

    const allUser = await User.find();
    console.log("All users", allUser);

    const updateUser = await User.updateOne(
      { name: "annie" },
      { email: "prithadas@gmail.com" }
    );

    console.log("Updated user", updateUser);
  } catch (err) {
    console.log("Error", err.message);
  } finally {
    mongoose.connection.close();
  }
};

run();
