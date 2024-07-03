// facturaRoutes.js

const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

// Rutas para CRUD de facturas
router.post('/', facturaController.createFactura);

module.exports = router;
