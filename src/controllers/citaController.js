const { Cita, Mascota, Usuario, Cliente, Medicamento, Suministro } = require('../models');
const { getIdClienteByName, getIdMascotaByName, getIdMedicamentoByName, getIdSuministroByName } = require('../utils/helpers');

// Crear una nueva cita
const createCita = async (req, res) => {
  // Obtener datos de la cita desde el cuerpo de la solicitud
  const { nombreMascota, nombreUsuario, nombreCliente, nombreMedicamento, nombreSuministro, fechaCita, motivo, horaCita } = req.body;

  try {
    // Obtener IDs basados en los nombres proporcionados
    const idMascota = await getIdMascotaByName(nombreMascota);
    const idCliente = await getIdClienteByName(nombreCliente);
    const idMedicamento = await getIdMedicamentoByName(nombreMedicamento);
    const idSuministro = await getIdSuministroByName(nombreSuministro);

    if (!idMascota || !idCliente || !idMedicamento || !idSuministro) {
      return res.status(400).json({ message: 'Uno o más nombres no fueron encontrados.' });
    }

    // Verificar si ya existe una cita para la misma fecha y hora
    const existingCita = await Cita.findOne({ where: { fechaCita, horaCita } });
    if (existingCita) {
      return res.status(400).json({ message: 'Ya hay una cita programada para esa fecha y hora.' });
    }

    // Guardar la nueva cita en la base de datos
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

    // Actualizar el stock de medicamento
    const medicamento = await Medicamento.findByPk(idMedicamento);
    if (medicamento) {
      medicamento.stock -= 1; // O la cantidad que se desee reducir
      await medicamento.save();
    }

    // Actualizar el stock de suministro
    const suministro = await Suministro.findByPk(idSuministro);
    if (suministro) {
      suministro.stock -= 1; // O la cantidad que se desee reducir
      await suministro.save();
    }

    // Aquí puedes enviar una respuesta con la cita registrada, si es necesario
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
// Eliminar una cita
const deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await Cita.findByPk(id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    await cita.destroy();
    res.status(204).json({ message: 'Cita eliminada exitosamente' }); // Agregamos un mensaje aquí
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
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