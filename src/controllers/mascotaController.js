const Mascota = require('../models/mascota');
const { Op } = require('sequelize');

exports.createMascota = async (req, res) => {
  const { nombreMascota } = req.body;

  try {
    // Verificar si el nombre de la mascota ya existe
    const mascotaExistente = await Mascota.findOne({ where: { nombreMascota } });
    if (mascotaExistente) {
      return res.status(400).json({ message: 'El nombre de mascota ya está en uso. Por favor, intenta con otro.' });
    }

    // Crear la mascota si no existe
    const nuevaMascota = await Mascota.create(req.body);
    res.status(201).json(nuevaMascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ruta para verificar si el nombre de la mascota ya existe
exports.verificarNombreMascota = async (req, res) => {
  const { nombre } = req.query;

  try {
    const mascotaExistente = await Mascota.findOne({ where: { nombreMascota: nombre } });
    if (mascotaExistente) {
      res.status(400).json({ message: 'El nombre de mascota ya está en uso. Por favor, intenta con otro.' });
    } else {
      res.status(200).json({ message: 'El nombre de mascota está disponible.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.findAll();
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMascotaById = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    if (mascota) {
      res.status(200).json(mascota);
    } else {
      res.status(404).json({ error: 'Mascota not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    if (mascota) {
      await mascota.update(req.body);
      res.status(200).json(mascota);
    } else {
      res.status(404).json({ error: 'Mascota not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    if (mascota) {
      await mascota.destroy();
      res.status(200).json({ message: 'Mascota deleted' });
    } else {
      res.status(404).json({ error: 'Mascota not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar mascotas por nombre
exports.getMascotaByNombre = async (req, res) => {
  try {
    const nombre = req.query.nombre;
    const mascotas = await Mascota.findAll({
      where: {
        nombreMascota: {
          [Op.like]: `%${nombre}%`
        }
      }
    });
    if (mascotas.length > 0) {
      res.status(200).json(mascotas);
    } else {
      res.status(404).json({ error: 'No se encontraron mascotas con ese nombre' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};