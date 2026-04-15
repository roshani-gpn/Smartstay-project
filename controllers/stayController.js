const Stay = require('../models/Stay');

// GET /api/stays — get all stays with optional filters
const getStays = async (req, res) => {
  try {
    const { type, minPrice, maxPrice } = req.query;
    let filter = { isAvailable: true };

    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const stays = await Stay.find(filter).populate('provider', 'name email phone');
    res.json(stays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/stays/:id
const getStayById = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id).populate('provider', 'name email');
    if (!stay) return res.status(404).json({ message: 'Stay not found' });
    res.json(stay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/stays
const createStay = async (req, res) => {
  try {
    const stay = await Stay.create({ ...req.body, provider: req.user._id });
    res.status(201).json(stay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/stays/:id
const updateStay = async (req, res) => {
  try {
    const stay = await Stay.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stay) return res.status(404).json({ message: 'Stay not found' });
    res.json(stay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/stays/:id
const deleteStay = async (req, res) => {
  try {
    await Stay.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stay deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStays, getStayById, createStay, updateStay, deleteStay };