const Factura = require('../models/factura');
const { Op } = require('sequelize');

exports.createFactura = async (req, res) => {
  try {
    const nuevaFactura = await Factura.create(req.body);
    res.status(201).json(nuevaFactura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.findAll();
    res.status(200).json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFacturaById = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (factura) {
      res.status(200).json(factura);
    } else {
      res.status(404).json({ error: 'Factura not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFactura = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (factura) {
      await factura.update(req.body);
      res.status(200).json(factura);
    } else {
      res.status(404).json({ error: 'Factura not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFactura = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (factura) {
      await factura.destroy();
      res.status(200).json({ message: 'Factura deleted' });
    } else {
      res.status(404).json({ error: 'Factura not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
