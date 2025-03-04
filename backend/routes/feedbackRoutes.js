const express = require('express');
const { createFeedback, getFeedback, updateFeedbackStatus, sendEmail } = require('../controllers/feedbackController');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/post-feedback', upload.single('image'), createFeedback);
router.get('/get-feedback', getFeedback);
router.put('/update-feedback-status', updateFeedbackStatus);
router.post('/send-email', sendEmail);

module.exports = router;