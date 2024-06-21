const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { authenticateToken } = require('../middleware/authMiddleware');
const generateToken = require('../utils/generateToken');

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

    const token = generateToken(nuevoUsuario.id);
    // Enviar email de confirmación aquí

    res.status(201).json({ message: 'Usuario registrado exitosamente. Revisa tu correo para confirmar.', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// Confirmación de email
router.get('/confirm-email/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuario.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido' });
    }

    user.verified = true;
    await user.save();

    res.json({ message: 'Correo confirmado exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  const user = await Usuario.findOne({ where: { correo } });

  if (user && (await bcrypt.compare(contrasena, user.contrasena))) {
    const token = generateToken(user.id);
    res.json({
      id: user.id,
      nombreUsuario: user.nombreUsuario,
      correo: user.correo,
      token,
    });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Recuperar contraseña
router.post('/forgot-password', async (req, res) => {
  const { correo } = req.body;

  const user = await Usuario.findOne({ where: { correo } });

  if (!user) {
    return res.status(400).json({ message: 'Correo no encontrado' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.codigoVerificacion = resetToken;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.correo,
    subject: 'Recuperación de contraseña',
    text: `Utiliza este enlace para restablecer tu contraseña: ${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error al enviar el correo' });
    }
    res.json({ message: 'Correo de recuperación enviado' });
  });
});

// Restablecer contraseña
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { nuevaContrasena } = req.body;

  const user = await Usuario.findOne({ where: { codigoVerificacion: token } });

  if (!user) {
    return res.status(400).json({ message: 'Token de recuperación inválido' });
  }

  const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
  user.contrasena = hashedPassword;
  user.codigoVerificacion = null;
  await user.save();

  res.json({ message: 'Contraseña actualizada' });
});

// Ruta protegida
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hola ${req.user.nombreUsuario}, estás autenticado!` });
});

module.exports = router;
