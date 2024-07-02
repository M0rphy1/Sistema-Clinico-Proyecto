const Usuario = require("../../models/usuario"); // Asegúrate de que la ruta es correcta
const Cita = require("../../models/cita");
const Mascota = require("../../models/mascota");
const Suministro = require("../../models/suministro");
const Medicamento = require("../../models/medicamento");
const Cliente = require("../../models/cliente");
const controller = {};

controller.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al obtener usuarios" });
  }
};

controller.getContadoresAdmin = async (req, res) => {
  try {
    const usuarios = await Usuario.count();
    const mascotas = await Mascota.count();
    const citas = await Cita.count();
    const suministros = await Suministro.count();
    const medicamentos = await Medicamento.count();
    const clientes = await Cliente.count();
    res.status(200).json({
      usuarios,
      mascotas,
      citas,
      suministros,
      medicamentos,
      clientes,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al obtener usuarios" });
  }
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
