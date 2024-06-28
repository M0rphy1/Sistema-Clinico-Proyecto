// citaController.js

const Cita = require('../models/cita');
const Mascota = require('../models/mascota');
const Usuario = require('../models/usuario');
const { Op } = require('sequelize');

exports.crearCita = async (req, res) => {
  try {
    const nuevaCita = await Cita.create(req.body);
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createCita = async (req, res) => {
  try {
    const nuevaCita = await Cita.create(req.body);
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerTodasLasCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        { model: Mascota },
        { model: Usuario }
      ]
    });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCitaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const cita = await Cita.findByPk(id, {
      include: [
        { model: Mascota },
        { model: Usuario }
      ]
    });
    if (cita) {
      res.status(200).json(cita);
    } else {
      res.status(404).json({ error: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarCita = async (req, res) => {
  const { id } = req.params;
  try {
    const cita = await Cita.findByPk(id);
    if (cita) {
      await cita.update(req.body);
      res.status(200).json(cita);
    } else {
      res.status(404).json({ error: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarCita = async (req, res) => {
  const { id } = req.params;
  try {
    const cita = await Cita.findByPk(id);
    if (cita) {
      await cita.destroy();
      res.status(200).json({ message: 'Cita eliminada' });
    } else {
      res.status(404).json({ error: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarCitasPorFecha = async (req, res) => {
  const { fecha } = req.query;
  try {
    const citas = await Cita.findAll({
      where: {
        fechaCita: fecha
      },
      include: [
        { model: Mascota },
        { model: Usuario }
      ]
    });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarCitasPorEstado = async (req, res) => {
  const { estado } = req.query;
  try {
    const citas = await Cita.findAll({
      where: {
        estado: estado
      },
      include: [
        { model: Mascota },
        { model: Usuario }
      ]
    });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarCitasPorNombreMascota = async (req, res) => {
  const { nombreMascota } = req.query;
  try {
    const citas = await Cita.findAll({
      include: [{
        model: Mascota,
        where: {
          nombreMascota: {
            [Op.like]: `%${nombreMascota}%`
          }
        }
      }],
      include: [
        { model: Usuario }
      ]
    });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

