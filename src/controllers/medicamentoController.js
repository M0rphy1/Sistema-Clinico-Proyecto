const Medicamento = require('../models/medicamento');

// Obtener todos los medicamentos
exports.obtenerMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll();
    res.status(200).json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    res.status(500).json({ error: 'Error al obtener medicamentos' });
  }
};

// Obtener un medicamento por ID
exports.obtenerMedicamentoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const medicamento = await Medicamento.findByPk(id);
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }
    res.status(200).json(medicamento);
  } catch (error) {
    console.error('Error al obtener medicamento por ID:', error);
    res.status(500).json({ error: 'Error al obtener medicamento por ID' });
  }
};

// Crear un nuevo medicamento
exports.crearMedicamento = async (req, res) => {
  const { nombre, descripcion, precio, stock, fecha_vencimiento, fabricante } = req.body;
  try {
    const nuevoMedicamento = await Medicamento.create({ nombre, descripcion, precio, stock, fecha_vencimiento, fabricante });
    res.status(201).json(nuevoMedicamento);
  } catch (error) {
    console.error('Error al crear medicamento:', error);
    res.status(500).json({ error: 'Error al crear medicamento' });
  }
};

// Actualizar un medicamento por ID
exports.actualizarMedicamento = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, fecha_vencimiento, fabricante } = req.body;
  try {
    const medicamento = await Medicamento.findByPk(id);
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }
    await medicamento.update({ nombre, descripcion, precio, stock, fecha_vencimiento, fabricante });
    res.status(200).json(medicamento);
  } catch (error) {
    console.error('Error al actualizar medicamento:', error);
    res.status(500).json({ error: 'Error al actualizar medicamento' });
  }
};

// Eliminar un medicamento por ID
exports.eliminarMedicamento = async (req, res) => {
  const { id } = req.params;
  try {
    const medicamento = await Medicamento.findByPk(id);
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }
    await medicamento.destroy();
    res.status(200).json({ mensaje: 'Medicamento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar medicamento:', error);
    res.status(500).json({ error: 'Error al eliminar medicamento' });
  }
};
