const { Cita, Mascota, Usuario, Cliente, Medicamento, Suministro } = require('../models');

// Crear una nueva cita
const createCita = async (req, res) => {
  try {
    const { idMascota, nombreUsuario, idCliente, idMedicamento, idSuministro, fechaCita, motivo, horaCita } = req.body;
    const nuevaCita = await Cita.create({
      idMascota,
      nombreUsuario,
      idCliente,
      idMedicamento,
      idSuministro,
      fechaCita,
      motivo,
      horaCita
    });
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error });
  }
};

// Obtener todas las citas
const getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        { model: Mascota },
        { model: Usuario },
        { model: Cliente },
        { model: Medicamento },
        { model: Suministro }
      ]
    });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error });
  }
};

// Obtener una cita por ID
const getCitaById = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await Cita.findByPk(id, {
      include: [
        { model: Mascota, attributes: ['idMascota', 'nombreMascota'] },
        { model: Cliente, attributes: ['idCliente', 'nombreCliente'] },
        { model: Usuario, attributes: ['nombreUsuario'] },
        { model: Medicamento, attributes: ['idMedicamento', 'nombreMedicamento'] },
        { model: Suministro, attributes: ['idSuministro', 'nombreSuministro'] }
      ]
    });
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la cita', error });
  }
};

// Actualizar una cita
const updateCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { idMascota, nombreUsuario, idCliente, idMedicamento, idSuministro, fechaCita, motivo, horaCita } = req.body;
    const cita = await Cita.findByPk(id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    await cita.update({
      idMascota,
      nombreUsuario,
      idCliente,
      idMedicamento,
      idSuministro,
      fechaCita,
      motivo,
      horaCita
    });
    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error });
  }
};

// Eliminar una cita
const deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await Cita.findByPk(id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    await cita.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita', error });
  }
};

module.exports = {
  createCita,
  getCitas,
  getCitaById,
  updateCita,
  deleteCita
};
