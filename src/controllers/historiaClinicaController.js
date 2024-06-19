// historiaClinicaController.js

const HistoriaClinica = require('../models/historiaClinica');

exports.createHistoriaClinica = async (req, res) => {
  try {
    const newHistoriaClinica = await HistoriaClinica.create(req.body);
    res.status(201).json(newHistoriaClinica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistoriasClinicas = async (req, res) => {
  try {
    const historiasClinicas = await HistoriaClinica.findAll();
    res.status(200).json(historiasClinicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistoriaClinicaById = async (req, res) => {
  try {
    const historiaClinica = await HistoriaClinica.findByPk(req.params.id);
    if (historiaClinica) {
      res.status(200).json(historiaClinica);
    } else {
      res.status(404).json({ error: 'HistoriaClinica not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHistoriaClinica = async (req, res) => {
  try {
    const historiaClinica = await HistoriaClinica.findByPk(req.params.id);
    if (historiaClinica) {
      await historiaClinica.update(req.body);
      res.status(200).json(historiaClinica);
    } else {
      res.status(404).json({ error: 'HistoriaClinica not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHistoriaClinica = async (req, res) => {
  try {
    const historiaClinica = await HistoriaClinica.findByPk(req.params.id);
    if (historiaClinica) {
      await historiaClinica.destroy();
      res.status(200).json({ message: 'HistoriaClinica deleted' });
    } else {
      res.status(404).json({ error: 'HistoriaClinica not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

