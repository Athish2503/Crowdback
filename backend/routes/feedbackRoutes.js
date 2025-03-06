const express = require('express');
const { createFeedback, getFeedback, updateFeedbackStatus, sendEmail,getFeedbackCount, DeleteFeedback  } = require('../controllers/feedbackController');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/post-feedback', upload.single('image'), createFeedback);
router.get('/get-feedback', getFeedback);
router.put('/update-feedback-status', updateFeedbackStatus);
router.post('/send-email', sendEmail);
router.get('/get-feedback-count', getFeedbackCount);
router.delete('/delete-feedback/:id', DeleteFeedback);

module.exports = router;