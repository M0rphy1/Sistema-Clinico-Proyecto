// medicoController.js

const Medico = require('../models/medico');

exports.createMedico = async (req, res) => {
  try {
    const nuevoMedico = await Medico.create(req.body);
    res.status(201).json(nuevoMedico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll();
    res.status(200).json(medicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicoById = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      res.status(200).json(medico);
    } else {
      res.status(404).json({ error: 'Medico not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMedico = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      await medico.update(req.body);
      res.status(200).json(medico);
    } else {
      res.status(404).json({ error: 'Medico not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMedico = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      await medico.destroy();
      res.status(200).json({ message: 'Medico deleted' });
    } else {
      res.status(404).json({ error: 'Medico not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
