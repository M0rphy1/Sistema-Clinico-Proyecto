const Factura = require('../models/factura');
const Cita = require('../models/cita');
const Mascota = require('../models/mascota');
const Cliente = require('../models/cliente');
// const Medicamento = require('../models/medicamento');
// const Suministro = require('../models/suministro');

exports.createFactura = async (req, res) => {
  const { nombreCliente, nombreMascota, idMedicamento, stockMedicamento, idSuministro, stockSuministro, motivo } = req.body;

  try {
    // Buscar cliente y mascota por nombre
    const cliente = await Cliente.findOne({ where: { nombreCliente } });
    const mascota = await Mascota.findOne({ where: { nombreMascota } });

    if (!cliente || !mascota) {
      return res.status(400).json({ message: 'Cliente o Mascota no encontrados' });
    }

    // Buscar cita asociada a cliente y mascota
    const cita = await Cita.findOne({
      where: {
        idCliente: cliente.idCliente,
        idMascota: mascota.idMascota,
      },
    });

    if (!cita) {
      return res.status(400).json({ message: 'Cita no encontrada para este cliente y mascota' });
    }

    // Crear factura
    const factura = await Factura.create({
      fechaFactura: new Date(),
      nombreCliente: cliente.nombreCliente,
      nombreMascota: mascota.nombreMascota,
      idCita: cita.idCita,
      idMedicamento,
      stockMedicamento,
      idSuministro,
      stockSuministro,
      motivo,
    });

    res.status(201).json(factura);
  } catch (error) {
    console.error('Error al crear la factura:', error);
    res.status(500).json({ message: 'Error al crear la factura' });
  }
};
