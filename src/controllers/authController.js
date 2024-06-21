const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const generateToken = require('../utils/generateToken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const register = async (req, res) => {
  const { nombreUsuario, correo, contrasena, idRol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await Usuario.findOne({ where: { correo } });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el usuario
    const nuevoUsuario = await Usuario.create({
      nombreUsuario,
      correo,
      contrasena: hashedPassword,
      idRol,
    });

    // Generar token de confirmación
    const confirmToken = crypto.randomBytes(32).toString('hex');
    nuevoUsuario.codigoVerificacion = confirmToken;
    await nuevoUsuario.save();

    // Enviar correo de confirmación
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: nuevoUsuario.correo,
      subject: 'Confirmación de cuenta',
      text: `Utiliza este enlace para confirmar tu cuenta: ${process.env.FRONTEND_URL}/confirm-email/${confirmToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error al enviar el correo de confirmación' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente. Verifica tu correo para confirmar la cuenta.' });
    });

  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

module.exports = {
  register,
  login,
};
///////////
// inicio sesion
const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    if (!user.codigoVerificacion) {
      return res.status(400).json({ message: 'Por favor confirma tu correo electrónico.' });
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
////////

