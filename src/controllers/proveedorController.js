const Proveedor = require('../models/proveedor');

exports.createProveedor = async (req, res) => {
  try {
    const nuevoProveedor = await Proveedor.create(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (proveedor) {
      res.status(200).json(proveedor);
    } else {
      res.status(404).json({ error: 'Proveedor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (proveedor) {
      await proveedor.update(req.body);
      res.status(200).json(proveedor);
    } else {
      res.status(404).json({ error: 'Proveedor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (proveedor) {
      await proveedor.destroy();
      res.status(200).json({ message: 'Proveedor deleted' });
    } else {
      res.status(404).json({ error: 'Proveedor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
