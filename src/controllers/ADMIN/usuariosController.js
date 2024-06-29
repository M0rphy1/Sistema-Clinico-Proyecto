const Usuario = require("../../models/usuario"); // Asegúrate de que la ruta es correcta
const controller = {};

controller.showViewUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  
  res.render("ADMIN/usuarios", { usuarios });
};

controller.createUsuario = async (req, res) => {
  console.log(req.body);
  try {
    const { nombreUsuario, correo, contrasena } = req.body;
    const nuevoUsuario = await Usuario.create({
      nombreUsuario,
      correo,
      contrasena,
      idRol: 1,
    });
    res
      .status(201)
      .json({ message: "Usuario creado correctamente", usuario: nuevoUsuario });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al crear usuario" });
  }
};

controller.updateUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  const { nombreUsuario, correo } = req.body;
  try {
    await Usuario.update({ nombreUsuario, correo }, { where: { idUsuario } });
    res.status(200).send("Usuario actualizado exitosamente");
  } catch (error) {
    res.status(500).send("Error al actualizar usuario");
  }
};

controller.deleteUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  console.log(idUsuario);
  try {
    await Usuario.destroy({ where: { idUsuario } });
    res.status(200).send("Usuario eliminado exitosamente");
  } catch (error) {
    res.status(500).send("Error al eliminar usuario");
  }
};

module.exports = controller;
