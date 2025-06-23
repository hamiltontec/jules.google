const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login (to be implemented)
router.post('/login', authController.login);

module.exports = router;
