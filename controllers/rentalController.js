const Rental = require('../models/Rental');

const getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ isAvailable: true }).populate('provider', 'name');
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRental = async (req, res) => {
  try {
    const rental = await Rental.create({ ...req.body, provider: req.user._id });
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRentals, createRental, updateRental };