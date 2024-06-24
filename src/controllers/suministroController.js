const Suministro = require('../models/suministro');

exports.createSuministro = async (req, res) => {
  try {
    const newSuministro = await Suministro.create(req.body);
    res.status(201).json(newSuministro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSuministros = async (req, res) => {
  try {
    const suministros = await Suministro.findAll();
    res.status(200).json(suministros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSuministroById = async (req, res) => {
  try {
    const suministro = await Suministro.findByPk(req.params.id);
    if (suministro) {
      res.status(200).json(suministro);
    } else {
      res.status(404).json({ error: 'Suministro not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSuministro = async (req, res) => {
  try {
    const suministro = await Suministro.findByPk(req.params.id);
    if (suministro) {
      await suministro.update(req.body);
      res.status(200).json(suministro);
    } else {
      res.status(404).json({ error: 'Suministro not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSuministro = async (req, res) => {
  try {
    const suministro = await Suministro.findByPk(req.params.id);
    if (suministro) {
      await suministro.destroy();
      res.status(200).json({ message: 'Suministro deleted' });
    } else {
      res.status(404).json({ error: 'Suministro not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

