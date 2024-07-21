const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  const {
    nombreUsuario,
    correo,
    contrasena,
    nombre,
    apellido,
    telefono,
    direccion,
    idRol,
  } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await Usuario.findOne({ where: { correo } });
    if (userExists) {
      return res.status(400).json({
        message:
          "El correo electrónico ya está en uso. Por favor, intenta con otro.",
      });
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

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

const registerAdmin = async (req, res) => {
  const {
    nombreUsuario,
    correo,
    contrasena,
    nombre,
    apellido,
    telefono,
    direccion,
    idRol,
  } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await Usuario.findOne({ where: { correo } });
    if (userExists) {
      return res.status(400).json({
        message:
          "El correo electrónico ya está en uso. Por favor, intenta con otro.",
      });
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

    res.status(201).json({ message: "Administrador registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el admin:", error);
    res.status(500).json({ message: "Error al registrar el admin" });
  }
};

const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken(user.idUsuario);
    res.json({
      id: user.idUsuario,
      nombreUsuario: user.nombreUsuario,
      correo: user.correo,
      token,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

const loginAdmin = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    if (user.idRol !== 2) {
      return res.status(400).json({ message: "No eres administrador" });
    }

    const token = generateToken(user.nombreUsuario);
    res.json({
      nombreUsuario: user.nombreUsuario,
      correo: user.correo,
      token,
      rol: user.idRol,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
//
const { sendPasswordResetEmail } = require('../utils/mailer');
const resetPassword = async (req, res) => {
  const { email } = req.body;

  // Generar una nueva contraseña temporal
  const tempPassword = Math.random().toString(36).slice(-8);

  try {
    // Buscar el usuario por correo
    const usuario = await Usuario.findOne({ where: { correo: email } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Encriptar la contraseña temporal
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Actualizar la contraseña en la base de datos
    await usuario.update({ contrasena: hashedPassword });

    // Enviar el correo de restablecimiento
    await sendPasswordResetEmail(email, tempPassword);
    res.status(200).send('Correo de recuperación enviado');
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res.status(500).send('Error al enviar el correo');
  }
};

module.exports = {
  register,
  login,
  loginAdmin,
  registerAdmin,
  resetPassword,
};
