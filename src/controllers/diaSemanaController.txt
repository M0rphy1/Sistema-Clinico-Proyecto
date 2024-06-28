const DiaSemana = require('../models/diaSemana');

exports.createDiaSemana = async (req, res) => {
  try {
    const nuevaDiaSemana = await DiaSemana.create(req.body);
    res.status(201).json(nuevaDiaSemana);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiaSemanas = async (req, res) => {
  try {
    const diaSemanas = await DiaSemana.findAll();
    res.status(200).json(diaSemanas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiaSemanaById = async (req, res) => {
  try {
    const diaSemana = await DiaSemana.findByPk(req.params.id);
    if (diaSemana) {
      res.status(200).json(diaSemana);
    } else {
      res.status(404).json({ error: 'DiaSemana not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDiaSemana = async (req, res) => {
  try {
    const diaSemana = await DiaSemana.findByPk(req.params.id);
    if (diaSemana) {
      await diaSemana.update(req.body);
      res.status(200).json(diaSemana);
    } else {
      res.status(404).json({ error: 'DiaSemana not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDiaSemana = async (req, res) => {
  try {
    const diaSemana = await DiaSemana.findByPk(req.params.id);
    if (diaSemana) {
      await diaSemana.destroy();
      res.status(200).json({ message: 'DiaSemana deleted' });
    } else {
      res.status(404).json({ error: 'DiaSemana not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
