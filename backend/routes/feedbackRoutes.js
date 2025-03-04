const express = require('express');
const { createFeedback, getFeedback } = require('../controllers/feedbackController');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/post-feedback', upload.single('image'), createFeedback);
router.get('/get-feedback', getFeedback);

module.exports = router;