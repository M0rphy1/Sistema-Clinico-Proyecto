const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

router.get('/:tipo', reporteController.generarReporte);

module.exports = router;

