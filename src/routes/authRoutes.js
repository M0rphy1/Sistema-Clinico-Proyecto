const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

// Registrar usuario
router.post('/register', async (req, res) => {
  const { nombreUsuario, correo, contrasena, idRol } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const nuevoUsuario = await Usuario.create({
      nombreUsuario,
      correo,
      contrasena: hashedPassword,
      idRol,
    });
    
    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

const { authenticateToken } = require('../middleware/authMiddleware'); // Importa tu middleware de autenticación

// Ruta protegida
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hola ${req.user.nombreUsuario}, estás autenticado!` });
});

module.exports = router;


