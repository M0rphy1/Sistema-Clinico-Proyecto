const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registro de usuario
router.post('/register', authController.register);

// Ruta para inicio de sesión
router.post('/login', authController.login);

module.exports = router;



