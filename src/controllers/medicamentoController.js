const Medicamento = require('../models/medicamento');

exports.createMedicamento = async (req, res) => {
  try {
    const nuevoMedicamento = await Medicamento.create(req.body);
    res.status(201).json(nuevoMedicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll();
    res.status(200).json(medicamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicamentoById = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id);
    if (medicamento) {
      res.status(200).json(medicamento);
    } else {
      res.status(404).json({ error: 'Medicamento not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMedicamento = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id);
    if (medicamento) {
      await medicamento.update(req.body);
      res.status(200).json(medicamento);
    } else {
      res.status(404).json({ error: 'Medicamento not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMedicamento = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id);
    if (medicamento) {
      await medicamento.destroy();
      res.status(200).json({ message: 'Medicamento deleted' });
    } else {
      res.status(404).json({ error: 'Medicamento not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
