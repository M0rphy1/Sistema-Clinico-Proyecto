const Mascota = require('../models/mascota');

exports.createMascota = async (req, res) => {
  try {
    const nuevaMascota = await Mascota.create(req.body);
    res.status(201).json(nuevaMascota);
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

