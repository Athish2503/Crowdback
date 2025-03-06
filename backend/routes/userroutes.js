const express = require('express');
const { getUserData } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure the correct import path

const router = express.Router();

router.get('/get-user-data', authMiddleware, getUserData); // Use the auth middleware

module.exports = router;