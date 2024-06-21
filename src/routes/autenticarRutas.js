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

// Iniciar sesion
router.post('/login', async (req, res) => {
  const { nombreUsuario, contrasena } = req.body;

  // Buscar el usuario por nombre de usuario
  const user = await Usuario.findOne({ where: { nombreUsuario } });

  if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  // Comparar la contraseña
  const validPassword = await bcrypt.compare(contrasena, user.contrasena);
  if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  // Generar el token JWT
  const token = jwt.sign({ nombreUsuario: user.nombreUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// recuperar la contraseña
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.post('/forgot-password', async (req, res) => {
    const { correo } = req.body;

    // Buscar el usuario por correo electrónico
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
        return res.status(400).json({ message: 'Correo no encontrado' });
    }

    // Generar un token de recuperación
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.codigoVerificacion = resetToken;
    await user.save();

    // Configurar el transporte de correo
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


// reestablecer la contraseña
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { nuevaContrasena } = req.body;

  // Buscar el usuario por el token de recuperación
  const user = await Usuario.findOne({ where: { codigoVerificacion: token } });

  if (!user) {
      return res.status(400).json({ message: 'Token de recuperación inválido' });
  }

  // Hash de la nueva contraseña
  const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
  user.contrasena = hashedPassword;
  user.codigoVerificacion = null; // Limpiar el token de recuperación
  await user.save();

  res.json({ message: 'Contraseña actualizada' });
});


module.exports = router;

