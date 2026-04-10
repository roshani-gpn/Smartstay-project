const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  serviceType: String,
  serviceId: String,
  date: Date
});

module.exports = mongoose.model("Booking", BookingSchema);