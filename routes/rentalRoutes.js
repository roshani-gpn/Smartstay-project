const express = require('express');
const router = express.Router();
const { getRentals, createRental, updateRental } = require('../controllers/rentalController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/',    getRentals);
router.post('/',   protect, authorizeRoles('provider', 'admin'), createRental);
router.put('/:id', protect, authorizeRoles('provider', 'admin'), updateRental);

module.exports = router;