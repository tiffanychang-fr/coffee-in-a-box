const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema(
  {
    productType: {
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
    userId: {
      type: Schema.Types.ObjectId,
    },
    // To Do: user-order relationship
  },
  {
    timestamps: true,
  }
);

const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
