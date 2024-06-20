const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  const { nombreUsuario, correo, contrasena } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await User.findUserByEmail(correo);
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(contrasena, 10);

  // Crear el usuario
  const newUser = await User.createUser({ nombreUsuario, correo, contrasena: hashedPassword });

  if (newUser) {
    const token = generateToken(newUser.idUsuario);
    res.status(201).json({
      id: newUser.idUsuario,
      nombreUsuario: newUser.nombreUsuario,
      correo: newUser.correo,
      token,
    });
  } else {
    res.status(400).json({ message: 'Datos del usuario inválidos' });
  }
};

const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  const user = await User.findUserByEmail(correo);

  if (user && (await bcrypt.compare(contrasena, user.contrasena))) {
    const token = generateToken(user.idUsuario);
    res.json({
      id: user.idUsuario,
      nombreUsuario: user.nombreUsuario,
      correo: user.correo,
      token,
    });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};

module.exports = {
  register,
  login,
};
