const Hora = require('../models/hora');

exports.createHora = async (req, res) => {
  try {
    const nuevaHora = await Hora.create(req.body);
    res.status(201).json(nuevaHora);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHoras = async (req, res) => {
  try {
    const horas = await Hora.findAll();
    res.status(200).json(horas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHoraById = async (req, res) => {
  try {
    const hora = await Hora.findByPk(req.params.id);
    if (hora) {
      res.status(200).json(hora);
    } else {
      res.status(404).json({ error: 'Hora not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHora = async (req, res) => {
  try {
    const hora = await Hora.findByPk(req.params.id);
    if (hora) {
      await hora.update(req.body);
      res.status(200).json(hora);
    } else {
      res.status(404).json({ error: 'Hora not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHora = async (req, res) => {
  try {
    const hora = await Hora.findByPk(req.params.id);
    if (hora) {
      await hora.destroy();
      res.status(200).json({ message: 'Hora deleted' });
    } else {
      res.status(404).json({ error: 'Hora not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

