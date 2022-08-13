const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
