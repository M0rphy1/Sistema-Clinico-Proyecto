const Usuario = require("../models/usuario");

const createUsuario = async (req, res) => {
  console.log(req.body);
  try {
    const newUsuario = await Usuario.create(req.body);
    res.status(201).json(newUsuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: error.message });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.nombreUsuario);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: "Usuario not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsuarioByNombreUsuario = async (req, res) => {
  const { nombreUsuario } = req.params;

  try {
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Error al buscar usuario por nombre de usuario:", error);
    res.status(500).json({ message: "Error al buscar usuario" });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.nombreUsuario);
    if (usuario) {
      await usuario.update(req.body);
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: "Usuario not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.nombreUsuario);
    if (usuario) {
      await usuario.destroy();
      res.status(200).json({ message: "Usuario deleted" });
    } else {
      res.status(404).json({ error: "Usuario not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // userController.js
// const { sendPasswordResetEmail } = require('../utils/mailer');

// const resetPassword = async (req, res) => {
//   const { email } = req.body;

//   // Generar una nueva contraseña temporal
//   const tempPassword = Math.random().toString(36).slice(-8);

//   try {
//       // Buscar el usuario por correo
//       const usuario = await Usuario.findOne({ where: { correo: email } });
//       if (!usuario) {
//           return res.status(404).json({ message: "Usuario no encontrado" });
//       }

//       // Actualizar la contraseña en la base de datos
//       await usuario.update({ contrasena: tempPassword });

//       // Enviar el correo de restablecimiento
//       await sendPasswordResetEmail(email, tempPassword);
//       res.status(200).send('Correo de recuperación enviado');
//   } catch (error) {
//       console.error("Error al restablecer la contraseña:", error);
//       res.status(500).send('Error al enviar el correo');
//   }
// };

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  getUsuarioByNombreUsuario,
  // resetPassword,
};
