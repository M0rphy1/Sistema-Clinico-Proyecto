const Suministro = require('../models/suministro');

// Obtener todos los suministros
exports.obtenerSuministros = async (req, res) => {
  try {
    const suministros = await Suministro.findAll();
    res.status(200).json(suministros);
  } catch (error) {
    console.error('Error al obtener suministros:', error);
    res.status(500).json({ error: 'Error al obtener suministros' });
  }
};

// Obtener un suministro por ID
exports.obtenerSuministroPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const suministro = await Suministro.findByPk(id);
    if (!suministro) {
      return res.status(404).json({ error: 'Suministro no encontrado' });
    }
    res.status(200).json(suministro);
  } catch (error) {
    console.error('Error al obtener suministro por ID:', error);
    res.status(500).json({ error: 'Error al obtener suministro por ID' });
  }
};

// Crear un nuevo suministro
exports.crearSuministro = async (req, res) => {
  const { idProveedor, nombreSuministro, descripcion, precio, stock, fabricante } = req.body;
  try {
    const nuevoSuministro = await Suministro.create({ idProveedor, nombreSuministro, descripcion, precio, stock, fabricante });
    res.status(201).json(nuevoSuministro);
  } catch (error) {
    console.error('Error al crear suministro:', error);
    res.status(500).json({ error: 'Error al crear suministro' });
  }
};

// Actualizar un suministro por ID
exports.actualizarSuministro = async (req, res) => {
  const { id } = req.params;
  const { idProveedor, nombreSuministro, descripcion, precio, stock, fabricante } = req.body;
  try {
    const suministro = await Suministro.findByPk(id);
    if (!suministro) {
      return res.status(404).json({ error: 'Suministro no encontrado' });
    }
    await suministro.update({ idProveedor, nombreSuministro, descripcion, precio, stock, fabricante });
    res.status(200).json(suministro);
  } catch (error) {
    console.error('Error al actualizar suministro:', error);
    res.status(500).json({ error: 'Error al actualizar suministro' });
  }
};

// Eliminar un suministro por ID
exports.eliminarSuministro = async (req, res) => {
  const { id } = req.params;
  try {
    const suministro = await Suministro.findByPk(id);
    if (!suministro) {
      return res.status(404).json({ error: 'Suministro no encontrado' });
    }
    await suministro.destroy();
    res.status(200).json({ mensaje: 'Suministro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar suministro:', error);
    res.status(500).json({ error: 'Error al eliminar suministro' });
  }
};
