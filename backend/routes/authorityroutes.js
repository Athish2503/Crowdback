const express = require('express');
const { authoritiesLogin } = require('../controllers/authController');

const router = express.Router();

router.post('/authorities-login', authoritiesLogin);

module.exports = router;