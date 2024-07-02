const { Cita, Mascota, Usuario, Cliente, Medicamento, Suministro } = require('../models');

// Crear una nueva cita
const createCita = async (req, res) => {
  const {
    nombreCliente,
    nombreMascota,
    nombreUsuario,
    nombreMedicamento,
    nombreSuministro,
    fechaCita,
    motivo,
    horaCita
  } = req.body;

  try {
    // Buscar o crear el cliente
    let cliente = await Cliente.findOne({ where: { nombreCliente } });
    if (!cliente) {
      cliente = await Cliente.create({ nombreCliente });
    }

    // Buscar o crear la mascota
    let mascota = await Mascota.findOne({ where: { nombreMascota } });
    if (!mascota) {
      mascota = await Mascota.create({ nombreMascota, idCliente: cliente.idCliente });
    }

    // Buscar el usuario
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Buscar el medicamento
    const medicamento = await Medicamento.findOne({ where: { nombreMedicamento } });
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }

    // Buscar el suministro
    const suministro = await Suministro.findOne({ where: { nombreSuministro } });
    if (!suministro) {
      return res.status(404).json({ error: 'Suministro no encontrado' });
    }

    // Guardar la nueva cita en la base de datos
    const nuevaCita = await Cita.create({
      idMascota: mascota.idMascota,
      nombreUsuario,
      idCliente: cliente.idCliente,
      idMedicamento: medicamento.idMedicamento,
      idSuministro: suministro.idSuministro,
      fechaCita,
      motivo,
      horaCita
    });

    // Actualizar el stock de medicamento
    medicamento.stock -= 1; // O la cantidad que se desee reducir
    await medicamento.save();

    // Actualizar el stock de suministro
    suministro.stock -= 1; // O la cantidad que se desee reducir
    await suministro.save();

    // Responder con la cita registrada
    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error('Error al registrar la cita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todas las citas
const getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        { model: Mascota, attributes: ['idMascota', 'nombreMascota'] },
        { model: Usuario, attributes: ['nombreUsuario'] },
        { model: Cliente, attributes: ['idCliente', 'nombreCliente'] },
        { model: Medicamento, attributes: ['idMedicamento', 'nombreMedicamento'] },
        { model: Suministro, attributes: ['idSuministro', 'nombreSuministro'] }
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
    const {
      nombreCliente,
      nombreMascota,
      nombreUsuario,
      nombreMedicamento,
      nombreSuministro,
      fechaCita,
      motivo,
      horaCita
    } = req.body;

    const cita = await Cita.findByPk(id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    // Buscar o crear el cliente
    let cliente = await Cliente.findOne({ where: { nombreCliente } });
    if (!cliente) {
      cliente = await Cliente.create({ nombreCliente });
    }

    // Buscar o crear la mascota
    let mascota = await Mascota.findOne({ where: { nombreMascota } });
    if (!mascota) {
      mascota = await Mascota.create({ nombreMascota, idCliente: cliente.idCliente });
    }

    // Buscar el usuario
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Buscar el medicamento
    const medicamento = await Medicamento.findOne({ where: { nombreMedicamento } });
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }

    // Buscar el suministro
    const suministro = await Suministro.findOne({ where: { nombreSuministro } });
    if (!suministro) {
      return res.status(404).json({ error: 'Suministro no encontrado' });
    }

    // Actualizar la cita en la base de datos
    await cita.update({
      idMascota: mascota.idMascota,
      nombreUsuario,
      idCliente: cliente.idCliente,
      idMedicamento: medicamento.idMedicamento,
      idSuministro: suministro.idSuministro,
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

