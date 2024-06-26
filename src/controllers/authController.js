const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  const { nombreUsuario, correo, contrasena, nombre, apellido, telefono, direccion, idRol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await Usuario.findOne({ where: { correo } });
    if (userExists) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso. Por favor, intenta con otro.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el usuario
    const nuevoUsuario = await Usuario.create({
      nombreUsuario,
      correo,
      contrasena: hashedPassword,
      nombre,
      apellido,
      telefono,
      direccion,
      idRol,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = generateToken(user.idUsuario);
    res.json({
      id: user.idUsuario,
      nombreUsuario: user.nombreUsuario,
      correo: user.correo,
      token,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = {
  register,
  login,
};
