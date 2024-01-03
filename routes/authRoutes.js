const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Kullanıcı kaydı
router.post('/register', authController.registerUser);

// Kullanıcı girişi
router.post('/login', authController.loginUser);

module.exports = router;
