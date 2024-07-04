const { Factura, Mascota, Cliente, Medicamento, Suministro } = require('../models');
const { getIdClienteByName, getIdMascotaByName, getIdMedicamentoByName, getIdSuministroByName } = require('../utils/helpers');

// Crear una nueva cita
const createFactura = async (req, res) => {
  // Obtener datos de la cita desde el cuerpo de la solicitud
  const { nombreMascota, nombreCliente, nombreMedicamento, nombreSuministro, fechaFactura, Descripcion } = req.body;

  try {
    // Obtener IDs basados en los nombres proporcionados
    const idMascota = await getIdMascotaByName(nombreMascota);
    const idCliente = await getIdClienteByName(nombreCliente);
    const idMedicamento = await getIdMedicamentoByName(nombreMedicamento);
    const idSuministro = await getIdSuministroByName(nombreSuministro);

    if (!idMascota || !idCliente || !idMedicamento || !idSuministro || !fechaFactura ) {
      return res.status(400).json({ message: 'Uno o más nombres no fueron encontrados.' });
    }

    // Guardar la nueva factura en la base de datos
    const nuevaFactura = await Factura.create({
      idMascota,
      idCliente,
      idMedicamento,
      idSuministro,
      fechaFactura,
      Descripcion
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
    res.status(201).json(nuevaFactura);
  } catch (error) {
    console.error('Error al registrar la factura:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Obtener todas las facturas
const getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.findAll({
      include: [
        { model: Mascota },
        { model: Cliente },
        { model: Medicamento },
        { model: Suministro }
      ]
    });
    res.status(200).json(facturas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las facturas', error });
  }
};

// Obtener una cita por ID
const getFacturaById = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findByPk(id, {
      include: [
        { model: Mascota, attributes: ['idMascota', 'nombreMascota'] },
        { model: Cliente, attributes: ['idCliente', 'nombreCliente'] },
        { model: Medicamento, attributes: ['idMedicamento', 'nombreMedicamento'] },
        { model: Suministro, attributes: ['idSuministro', 'nombreSuministro'] }
      ]
    });
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.status(200).json(factura);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la factura', error });
  }
};

// Actualizar una cita
const updateFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const { idMascota, idCliente, idMedicamento, idSuministro, fechaFactura, Descripcion } = req.body;
    const factura = await Factura.findByPk(id);
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    await factura.update({
      idMascota,
      idCliente,
      idMedicamento,
      idSuministro,
      fechaFactura,
      Descripcion
    });
    res.status(200).json(factura);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la factura', error });
  }
};

// Eliminar una cita
// Eliminar una factura
const deleteFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Cita.findByPk(id);
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    await factura.destroy();
    res.status(204).json({ message: 'Factura eliminada exitosamente' }); // Agregamos un mensaje aquí
  } catch (error) {
    console.error('Error al eliminar la factura:', error);
    res.status(500).json({ message: 'Error al eliminar la factura', error });
  }
};



module.exports = {
  createFactura,
  getFacturas,
  getFacturaById,
  updateFactura,
  deleteFactura
};
