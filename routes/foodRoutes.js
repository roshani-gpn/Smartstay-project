const express = require('express');
const router = express.Router();
const { getFoodServices, createFoodService } = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/',  getFoodServices);
router.post('/', protect, authorizeRoles('provider', 'admin'), createFoodService);

module.exports = router;