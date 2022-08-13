const { Schema, model } = require("mongoose");

const boxSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

const Box = model("Box", boxSchema);

module.exports = Box;
