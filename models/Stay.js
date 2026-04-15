const mongoose = require('mongoose');

const staySchema = new mongoose.Schema({
  provider:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:        { type: String, required: true },
  type:         { type: String, enum: ['PG', 'hostel', 'apartment'], required: true },
  description:  { type: String },
  price:        { type: Number, required: true },          // per month
  address:      { type: String, required: true },
  location: {
    lat:  { type: Number },
    lng:  { type: Number },
  },
  amenities:    [{ type: String }],                        // e.g. ["WiFi", "AC"]
  images:       [{ type: String }],                        // image URLs
  totalRooms:   { type: Number, default: 1 },
  availableRooms: { type: Number, default: 1 },
  isAvailable:  { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Stay', staySchema);