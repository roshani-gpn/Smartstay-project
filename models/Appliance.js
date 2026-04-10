const mongoose = require("mongoose");

const ApplianceSchema = new mongoose.Schema({
  name: String,
  rentalPrice: Number,
  description: String,
  availability: Boolean
});

module.exports = mongoose.model("Appliance", ApplianceSchema);