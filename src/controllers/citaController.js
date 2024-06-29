const Cita = require('../models/cita');
// const Mascota = require('../models/mascota');
// const Usuario = require('../models/usuario');
// const Medicamento = require('../models/medicamento');
// const Suministro = require('../models/suministro');

// exports.createCita = async (req, res) => {
//   const { idMascota, nombreUsuario, horaCita, idCliente, idMedicamento, idSuministro, fechaCita, motivo } = req.body;

//   try {
//     // Verificar si existen los modelos relacionados
//     const mascota = await Mascota.findByPk(idMascota);
//     const usuario = await Usuario.findByPk(nombreUsuario);
//     const cliente = await Usuario.findByPk(idCliente); // Assumimos que el cliente es un usuario también
//     const medicamento = await Medicamento.findByPk(idMedicamento);
//     const suministro = await Suministro.findByPk(idSuministro);

//     if (!mascota || !usuario || !cliente || !medicamento || !suministro) {
//       return res.status(404).json({ message: 'Uno o más datos de la cita no son válidos.' });
//     }

//     // Verificar si hay suficiente cantidad en el inventario
//     if (medicamento.stock <= 0) {
//       return res.status(400).json({ message: 'No hay suficiente cantidad en el inventario de medicamento.' });
//     }
//     // Verificar si hay suficiente cantidad en el inventario
//     if (suministro.stock <= 0) {
//       return res.status(400).json({ message: 'No hay suficiente cantidad en el inventario de suministro.' });
//     }

//     // Crear la cita
//     const nuevaCita = await Cita.create({
//       idMascota,
//       idCliente,
//       nombreUsuario,
//       idMedicamento,
//       idSuministro,
//       fechaCita,
//       horaCita,
//       motivo
//     });

//     // Reducir la cantidad en el inventario de medicamento
//     medicamento.stock -= 1; // Reducir en 1 la cantidad disponible
//     await medicamento.save(); // Guardar el inventario actualizado

//      // Reducir la cantidad en el inventario de suministro
//      suministro.stock -= 1; // Reducir en 1 la cantidad disponible
//      await suministro.save(); // Guardar el inventario actualizado

//     res.status(201).json(nuevaCita);
//   } catch (error) {
//     console.error('Error al crear la cita:', error);
//     res.status(500).json({ error: 'Error al crear la cita' });
//   }
// };
exports.createCita = async (req, res) => {
  try {
    const nuevaCita = await Cita.create(req.body);
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ error: error.message });
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