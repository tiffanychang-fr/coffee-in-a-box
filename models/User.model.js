const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // To Do: user-order relationship
  // orderHistory: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: "subscription",
  //   },
  // ],
});

const User = model("User", userSchema);

module.exports = User;
