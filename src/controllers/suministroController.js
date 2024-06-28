const Suministro = require('../models/suministro');
const { Op } = require('sequelize');

exports.createSuministro = async (req, res) => {
  try {
    const nuevoSuministro = await Suministro.create(req.body);
    res.status(201).json(nuevoSuministro);
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

exports.getSuministroByNombre = async (req, res) => {
  try {
    const nombre = req.query.nombre;
    const suministros = await Suministro.findAll({
      where: {
        nombreSuministro: {
          [Op.like]: `%${nombre}%`
        }
      }
    });
    if (suministros.length > 0) {
      res.status(200).json(suministros);
    } else {
      res.status(404).json({ error: 'No se encontraron suministros con ese nombre' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
