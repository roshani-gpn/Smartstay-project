const mongoose = require("mongoose");

const FoodServiceSchema = new mongoose.Schema({
  name: String,
  location: String,
  monthlyPrice: Number,
  menu: String
});

module.exports = mongoose.model("FoodService", FoodServiceSchema);