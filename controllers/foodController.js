const FoodService = require('../models/FoodService');

const getFoodServices = async (req, res) => {
  try {
    const services = await FoodService.find({ isAvailable: true }).populate('provider', 'name phone');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFoodService = async (req, res) => {
  try {
    const service = await FoodService.create({ ...req.body, provider: req.user._id });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFoodServices, createFoodService };