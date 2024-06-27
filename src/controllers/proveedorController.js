const { Op } = require('sequelize');
const Proveedor = require('../models/Proveedor');

exports.getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProveedor = async (req, res) => {
  try {
    const { nombreProveedor, direccion, telefono, correo } = req.body;
    const nuevoProveedor = await Proveedor.create({
      nombreProveedor,
      direccion,
      telefono,
      correo
    });
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProveedorById = async (req, res) => {
  const idProveedor = req.params.id;
  try {
    const proveedor = await Proveedor.findByPk(idProveedor);
    if (proveedor) {
      res.status(200).json(proveedor);
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProveedor = async (req, res) => {
  const idProveedor = req.params.id;
  try {
    const { nombreProveedor, direccion, telefono, correo } = req.body;
    const [updated] = await Proveedor.update({
      nombreProveedor,
      direccion,
      telefono,
      correo
    }, {
      where: { idProveedor }
    });
    if (updated) {
      const updatedProveedor = await Proveedor.findByPk(idProveedor);
      res.status(200).json(updatedProveedor);
    } else {
      throw new Error('Proveedor no encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProveedor = async (req, res) => {
  const idProveedor = req.params.id;
  try {
    const deleted = await Proveedor.destroy({
      where: { idProveedor }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Proveedor no encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProveedorByNombre = async (req, res) => {
  try {
    const nombre = req.query.nombre;
    const proveedores = await Proveedor.findAll({
      where: {
        nombreProveedor: {
          [Op.like]: `%${nombre}%`
        }
      }
    });
    if (proveedores.length > 0) {
      res.status(200).json(proveedores);
    } else {
      res.status(404).json({ error: 'No se encontraron proveedores con ese nombre' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
