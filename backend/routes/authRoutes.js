const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/register', rateLimiter, authController.register);
router.post('/login', rateLimiter, authController.login);

module.exports = router;