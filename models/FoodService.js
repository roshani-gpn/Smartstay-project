const mongoose = require('mongoose');

const foodServiceSchema = new mongoose.Schema({
  provider:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messName:    { type: String, required: true },
  description: { type: String },
  address:     { type: String },
  mealPlans: [{
    type:  { type: String, enum: ['breakfast', 'lunch', 'dinner', 'full-day'] },
    price: { type: Number },           // price per month
  }],
  isVeg:       { type: Boolean, default: true },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('FoodService', foodServiceSchema);