// controllers/inventarioController.js
const Inventario = require('../models/inventario');

// Obtener todos los inventarios
exports.obtenerInventarios = async (req, res) => {
  try {
    const inventarios = await Inventario.findAll();
    res.status(200).json(inventarios);
  } catch (error) {
    console.error('Error al obtener inventarios:', error);
    res.status(500).json({ error: 'Error al obtener inventarios' });
  }
};

// Obtener un inventario por ID
exports.obtenerInventarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const inventario = await Inventario.findByPk(id);
    if (!inventario) {
      return res.status(404).json({ error: 'Inventario no encontrado' });
    }
    res.status(200).json(inventario);
  } catch (error) {
    console.error('Error al obtener inventario por ID:', error);
    res.status(500).json({ error: 'Error al obtener inventario por ID' });
  }
};

// Crear un nuevo inventario
exports.crearInventario = async (req, res) => {
  const { idMedicamento, idSuministro, cantidad, fecha, idProveedor } = req.body;
  try {
    const nuevoInventario = await Inventario.create({ idMedicamento, idSuministro, cantidad, fecha, idProveedor });
    res.status(201).json(nuevoInventario);
  } catch (error) {
    console.error('Error al crear inventario:', error);
    res.status(500).json({ error: 'Error al crear inventario' });
  }
};

// Actualizar un inventario por ID
exports.actualizarInventario = async (req, res) => {
  const { id } = req.params;
  const { idMedicamento, idSuministro, cantidad, fecha, idProveedor } = req.body;
  try {
    const inventario = await Inventario.findByPk(id);
    if (!inventario) {
      return res.status(404).json({ error: 'Inventario no encontrado' });
    }
    await inventario.update({ idMedicamento, idSuministro, cantidad, fecha, idProveedor });
    res.status(200).json(inventario);
  } catch (error) {
    console.error('Error al actualizar inventario:', error);
    res.status(500).json({ error: 'Error al actualizar inventario' });
  }
};

// Eliminar un inventario por ID
exports.eliminarInventario = async (req, res) => {
  const { id } = req.params;
  try {
    const inventario = await Inventario.findByPk(id);
    if (!inventario) {
      return res.status(404).json({ error: 'Inventario no encontrado' });
    }
    await inventario.destroy();
    res.status(200).json({ mensaje: 'Inventario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar inventario:', error);
    res.status(500).json({ error: 'Error al eliminar inventario' });
  }
};

