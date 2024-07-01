const Cliente = require('../models/cliente');
const { Op } = require('sequelize');

// Ruta para verificar si el correo del cliente ya existe
exports.verificarCorreoCliente = async (req, res) => {
  const { correo } = req.query;

  try {
    const clienteExistente = await Cliente.findOne({ where: { correo } });
    if (clienteExistente) {
      res.status(400).json({ message: 'El correo electrónico ya está en uso. Por favor, intenta con otro.' });
    } else {
      res.status(200).json({ message: 'El correo electrónico está disponible.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createCliente = async (req, res) => {
  try {
    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      await cliente.update(req.body);
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      await cliente.destroy();
      res.status(200).json({ message: 'Cliente deleted' });
    } else {
      res.status(404).json({ error: 'Cliente not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Nuevo controlador para buscar cliente por nombre
exports.getClienteByNombre = async (req, res) => {
  try {
    const nombre = req.query.nombre;
    const clientes = await Cliente.findAll({
      where: {
        nombreCliente: {
          [Op.like]: `%${nombre}%`
        }
      }
    });
    if (clientes.length > 0) {
      res.status(200).json(clientes);
    } else {
      res.status(404).json({ error: 'No se encontraron clientes con ese nombre' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

