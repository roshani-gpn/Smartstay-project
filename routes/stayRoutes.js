const express = require('express');
const router = express.Router();
const { getStays, getStayById, createStay, updateStay, deleteStay } = require('../controllers/stayController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/',    getStays);           // public — anyone can browse
router.get('/:id', getStayById);        // public
router.post('/',   protect, authorizeRoles('provider', 'admin'), createStay);
router.put('/:id', protect, authorizeRoles('provider', 'admin'), updateStay);
router.delete('/:id', protect, authorizeRoles('admin'), deleteStay);

module.exports = router;