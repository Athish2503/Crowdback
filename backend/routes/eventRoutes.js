const express = require('express');
const router = express.Router();
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have an auth middleware

router.get('/fetch-events', authMiddleware, getEvents);
router.post('/events', authMiddleware, addEvent);
router.put('/events/:id', authMiddleware, updateEvent);
router.delete('/events/:id', authMiddleware, deleteEvent);

module.exports = router;