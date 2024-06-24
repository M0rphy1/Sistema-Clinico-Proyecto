const Inventario = require('../models/inventario');

// Controlador para crear un nuevo inventario
exports.createInventario = async (req, res) => {
  try {
    const nuevoInventario = await Inventario.create(req.body);
    res.status(201).json(nuevoInventario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los inventarios
exports.getInventarios = async (req, res) => {
  try {
    const inventarios = await Inventario.findAll();
    res.status(200).json(inventarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un inventario por su ID
exports.getInventarioById = async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id);
    if (inventario) {
      res.status(200).json(inventario);
    } else {
      res.status(404).json({ error: 'Inventario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar un inventario
exports.updateInventario = async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id);
    if (inventario) {
      await inventario.update(req.body);
      res.status(200).json(inventario);
    } else {
      res.status(404).json({ error: 'Inventario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un inventario
exports.deleteInventario = async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id);
    if (inventario) {
      await inventario.destroy();
      res.status(200).json({ message: 'Inventario deleted' });
    } else {
      res.status(404).json({ error: 'Inventario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

