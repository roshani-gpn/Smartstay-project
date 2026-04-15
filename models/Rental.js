const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  provider:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:        { type: String, required: true },           // e.g. "Washing Machine"
  category:    { type: String, enum: ['appliance', 'furniture', 'vehicle', 'other'] },
  description: { type: String },
  pricePerDay: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  images:      [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);