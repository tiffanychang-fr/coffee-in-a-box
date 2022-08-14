const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost/coffee-in-a-box";

module.exports = MONGO_URI;
