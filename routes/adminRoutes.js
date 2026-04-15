const express = require('express');
const router = express.Router();
const { getAllUsers, banUser } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// ALL admin routes are double-protected
router.get('/users',       protect, authorizeRoles('admin'), getAllUsers);
router.put('/users/:id/ban', protect, authorizeRoles('admin'), banUser);

module.exports = router;