// controllers/medicamentoController.js

const Medicamento = require('../models/medicamento');
const { Op } = require('sequelize');

exports.createMedicamento = async (req, res) => {
  try {
    const nuevoMedicamento = await Medicamento.create(req.body);
    res.status(201).json(nuevoMedicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll();
    res.status(200).json(medicamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicamentoById = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id);
    if (medicamento) {
      res.status(200).json(medicamento);
    } else {
      res.status(404).json({ error: 'Medicamento not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMedicamento = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id);
    if (medicamento) {
      await medicamento.update(req.body);
      res.status(200).json(medicamento);
    } else {
      res.status(404).json({ error: 'Medicamento not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMedicamento = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id);
    if (medicamento) {
      await medicamento.destroy();
      res.status(200).json({ message: 'Medicamento deleted' });
    } else {
      res.status(404).json({ error: 'Medicamento not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicamentoByNombre = async (req, res) => {
  try {
    const nombre = req.query.nombre;
    const medicamentos = await Medicamento.findAll({
      where: {
        nombreMedicamento: {
          [Op.like]: `%${nombre}%`
        }
      }
    });
    if (medicamentos.length > 0) {
      res.status(200).json(medicamentos);
    } else {
      res.status(404).json({ error: 'No se encontraron medicamentos con ese nombre' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para reponer stock de un medicamento por ID
exports.reponerStock = async (req, res, next) => {
  const idMedicamento = req.params.id;
  const cantidad = req.body.cantidad; // Cantidad a reponer, se espera en el cuerpo de la solicitud

  try {
    let medicamento = await Medicamento.findByPk(idMedicamento);
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }

    // Actualizar el stock del medicamento
    medicamento.stock += cantidad;
    await medicamento.save();

    res.status(200).json({ message: 'Stock reponido exitosamente', medicamento });
  } catch (error) {
    console.error('Error al reponer el stock del medicamento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
