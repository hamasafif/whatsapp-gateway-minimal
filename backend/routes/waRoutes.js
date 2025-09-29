const express = require('express');
const router = express.Router();
const waController = require('../controllers/waController');
const auth = require('../middleware/auth');

router.get('/qr', auth, waController.getQR);
router.post('/send', auth, waController.sendMessage);
router.post('/logout', auth, waController.logout);

module.exports = router;