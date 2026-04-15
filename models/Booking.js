const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stay:       { type: mongoose.Schema.Types.ObjectId, ref: 'Stay', required: true },
  startDate:  { type: Date, required: true },
  endDate:    { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status:     { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  paymentId:  { type: String },    // Razorpay payment ID
  isPaid:     { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);