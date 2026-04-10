const mongoose = require("mongoose");

const StaySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Stay", StaySchema);