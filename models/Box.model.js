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
  releaseMonth: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: String,
    required: true,
  },
});

const Box = model("Box", boxSchema);

module.exports = Box;
