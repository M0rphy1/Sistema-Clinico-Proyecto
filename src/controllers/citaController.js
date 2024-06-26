const Cita = require('../models/cita');
const Mascota = require('../models/mascota');
// const Empleado = require('../models/empleado');
const Usuario = require('../models/usuario');
const DiaSemana = require('../models/diaSemana');
const Hora = require('../models/hora');
const HorarioAtencion = require('../models/horarioAtencion');
const Inventario = require('../models/inventario');

exports.createCita = async (req, res) => {
  const { idMascota, idUsuario, idDiaSemana, idHora, idHorarioAtencion, idInventario, fechaCita, motivo } = req.body;

  try {
    // Verificar si existen los modelos relacionados
    const mascota = await Mascota.findByPk(idMascota);
    const usuario = await Usuario.findByPk(idUsuario);
    const diaSemana = await DiaSemana.findByPk(idDiaSemana);
    const hora = await Hora.findByPk(idHora);
    const horarioAtencion = await HorarioAtencion.findByPk(idHorarioAtencion);
    const inventario = await Inventario.findByPk(idInventario);

    if (!mascota || !usuario || !diaSemana || !hora || !horarioAtencion || !inventario) {
      return res.status(404).json({ message: 'Uno o más datos de la cita no son válidos.' });
    }

    // Verificar si hay suficiente cantidad en el inventario
    if (inventario.cantidad <= 0) {
      return res.status(400).json({ message: 'No hay suficiente cantidad en el inventario.' });
    }

    // Crear la cita
    const nuevaCita = await Cita.create({
      idMascota,
      idUsuario,
      idDiaSemana,
      idHora,
      idHorarioAtencion,
      idInventario,
      fechaCita,
      motivo
    });

    // Reducir la cantidad en el inventario
    inventario.cantidad -= 1; // Reducir en 1 la cantidad disponible
    await inventario.save(); // Guardar el inventario actualizado

    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ error: 'Error al crear la cita' });
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
