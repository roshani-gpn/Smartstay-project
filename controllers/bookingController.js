const Booking = require('../models/Booking');
const Stay = require('../models/Stay');

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { stayId, startDate, endDate } = req.body;

    const stay = await Stay.findById(stayId);
    if (!stay || !stay.isAvailable) {
      return res.status(400).json({ message: 'Stay not available' });
    }

    // Calculate number of months
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 30));
    const totalPrice = stay.price * months;

    const booking = await Booking.create({
      user: req.user._id,
      stay: stayId,
      startDate,
      endDate,
      totalPrice,
    });

    // Reduce available rooms
    stay.availableRooms -= 1;
    if (stay.availableRooms === 0) stay.isAvailable = false;
    await stay.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/bookings/my
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('stay', 'title address price');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();

    // Restore room availability
    const stay = await Stay.findById(booking.stay);
    if (stay) {
      stay.availableRooms += 1;
      stay.isAvailable = true;
      await stay.save();
    }

    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getUserBookings, cancelBooking };