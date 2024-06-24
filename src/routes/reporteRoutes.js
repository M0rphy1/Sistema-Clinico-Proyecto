// reporteRoutes.js

const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

// Ruta para generar un reporte específico según el tipo seleccionado
router.get('/:tipo', reporteController.generarReporte);

module.exports = router;
