const express = require('express');
const { getUserData, getUserDetails, addPoints } = require('../controllers/userController'); // Import addPoints controller
const authMiddleware = require('../middleware/authMiddleware'); // Ensure the correct import path

const router = express.Router();

router.get('/get-user-data', authMiddleware, getUserData); // Use the auth middleware
router.get('/get-user-details', authMiddleware, getUserDetails); // Use the auth middleware
router.post('/add-points', authMiddleware, addPoints); // Add new route for adding points

module.exports = router;