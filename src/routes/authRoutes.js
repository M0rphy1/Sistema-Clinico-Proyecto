const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// router.post('/login', authController.login);
// router.post('/register', authController.register);
// router.post('/forgot-password', authController.forgotPassword);
// router.put('/reset-password/:token', authController.resetPassword);

// Rutas para registro e inicio de sesión
router.post('/registro', authController.registrarUsuario);
router.post('/inicio-sesion', authController.iniciarSesion);

module.exports = router;
