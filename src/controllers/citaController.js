const Cita = require('../models/cita');

exports.createCita = async (req, res) => {
  try {
    const newCita = await Cita.create(req.body);
    res.status(201).json(newCita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCitaById = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
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
