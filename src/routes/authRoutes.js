// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/login', authController.login);
// router.post('/register', authController.register);
// router.post('/forgot-password', authController.forgotPassword);
// router.put('/reset-password/:token', authController.resetPassword);

// Rutas para registro e inicio de sesión
// router.post('/registro', authController.registrarUsuario);
// router.post('/inicio-sesion', authController.iniciarSesion);


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); // Asegúrate de que la ruta es correcta
const sequelize = require('../database/conexiones');  // Asegúrate de importar sequelize
const { Sequelize } = require('sequelize');  // Importar Sequelize
const router = express.Router();

// Generar token JWT
const generateToken = (nombreUsuario) => {
  return jwt.sign({ nombreUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { idEmpleado, nombreUsuario, correo, contrasena } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExist = await Usuario.findOne({ where: { [Sequelize.Op.or]: [{ nombreUsuario }, { correo }] } });

    if (userExist) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Insertar el nuevo usuario en la base de datos
    const newUser = await Usuario.create({
      idEmpleado,
      nombreUsuario,
      correo,
      contrasena: hashedPassword,
      estado: true,
    });

    // Generar token JWT
    const token = generateToken(newUser.nombreUsuario);

    res.json({ token });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

module.exports = router;
