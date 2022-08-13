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
  shippingAddress: {
    type: String,
  },
  // To Do: User-Subscription relationship
  // subscritionHistory: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: "subscription",
  //   },
  // ],
});

const User = model("User", userSchema);

module.exports = User;
