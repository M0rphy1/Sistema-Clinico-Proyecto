const Cita = require('../models/cita');
const Mascota = require('../models/mascota');
const Usuario = require('../models/usuario');
const Medicamento = require('../models/medicamento');
const Suministro = require('../models/suministro');
const { Op } = require('sequelize');

exports.createCita = async (req, res) => {
  try {
    const nuevaCita = await Cita.create(req.body);
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        { model: Mascota },
        { model: Usuario },
        { model: Medicamento },
        { model: Suministro }
      ]
    });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCitaById = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id, {
      include: [
        { model: Mascota },
        { model: Usuario },
        { model: Medicamento },
        { model: Suministro }
      ]
    });
    if (cita) {
      res.status(200).json(cita);
    } else {
      res.status(404).json({ error: 'Cita not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (cita) {
      await cita.update(req.body);
      res.status(200).json(cita);
    } else {
      res.status(404).json({ error: 'Cita not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (cita) {
      await cita.destroy();
      res.status(200).json({ message: 'Cita deleted' });
    } else {
      res.status(404).json({ error: 'Cita not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Nuevo controlador para buscar citas por fecha
exports.getCitasByFecha = async (req, res) => {
  try {
    const fecha = req.query.fecha;
    const citas = await Cita.findAll({
      where: {
        fechaCita: fecha
      },
      include: [
        { model: Mascota },
        { model: Usuario },
        { model: Medicamento },
        { model: Suministro }
      ]
    });
    if (citas.length > 0) {
      res.status(200).json(citas);
    } else {
      res.status(404).json({ error: 'No se encontraron citas para la fecha especificada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Nuevo controlador para buscar citas por estado
exports.getCitasByEstado = async (req, res) => {
  try {
    const estado = req.query.estado;
    const citas = await Cita.findAll({
      where: {
        estado: estado
      },
      include: [
        { model: Mascota },
        { model: Usuario },
        { model: Medicamento },
        { model: Suministro }
      ]
    });
    if (citas.length > 0) {
      res.status(200).json(citas);
    } else {
      res.status(404).json({ error: 'No se encontraron citas con ese estado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Nuevo controlador para buscar citas por nombre de mascota
exports.getCitasByNombreMascota = async (req, res) => {
  try {
    const nombreMascota = req.query.nombreMascota;
    const citas = await Cita.findAll({
      include: [
        {
          model: Mascota,
          where: {
            nombreMascota: {
              [Op.like]: `%${nombreMascota}%`
            }
          }
        },
        { model: Usuario },
        { model: Medicamento },
        { model: Suministro }
      ]
    });
    if (citas.length > 0) {
      res.status(200).json(citas);
    } else {
      res.status(404).json({ error: 'No se encontraron citas para esa mascota' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Otros controladores según sea necesario

module.exports = exports;
