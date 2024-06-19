const HorarioAtencion = require('../models/horarioAtencion');

exports.createHorarioAtencion = async (req, res) => {
  try {
    const nuevoHorario = await HorarioAtencion.create(req.body);
    res.status(201).json(nuevoHorario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHorariosAtencion = async (req, res) => {
  try {
    const horarios = await HorarioAtencion.findAll();
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHorarioAtencionById = async (req, res) => {
  try {
    const horario = await HorarioAtencion.findByPk(req.params.id);
    if (horario) {
      res.status(200).json(horario);
    } else {
      res.status(404).json({ error: 'HorarioAtencion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHorarioAtencion = async (req, res) => {
  try {
    const horario = await HorarioAtencion.findByPk(req.params.id);
    if (horario) {
      await horario.update(req.body);
      res.status(200).json(horario);
    } else {
      res.status(404).json({ error: 'HorarioAtencion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHorarioAtencion = async (req, res) => {
  try {
    const horario = await HorarioAtencion.findByPk(req.params.id);
    if (horario) {
      await horario.destroy();
      res.status(200).json({ message: 'HorarioAtencion deleted' });
    } else {
      res.status(404).json({ error: 'HorarioAtencion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

