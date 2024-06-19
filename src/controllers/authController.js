const authService = require('../services/authService');

// Controlador para registrar un nuevo usuario
async function registrarUsuario(req, res) {
  const { nombreUsuario, correo, contrasena, idEmpleado } = req.body;
  try {
    const nuevoUsuario = await authService.registrarUsuario(nombreUsuario, correo, contrasena, idEmpleado);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controlador para iniciar sesión
async function iniciarSesion(req, res) {
  const { correo, contrasena } = req.body;
  try {
    const { usuario, token } = await authService.iniciarSesion(correo, contrasena);
    res.json({ usuario, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  registrarUsuario,
  iniciarSesion
};
