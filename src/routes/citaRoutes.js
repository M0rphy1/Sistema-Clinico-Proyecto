// citaRoutes.js

const express = require('express');
const citaController = require('../controllers/citaController');

const router = express.Router();

router.post('/api/citas', citaController.crearCita);
router.post('/api/citas', citaController.createCita);
router.get('/api/citas', citaController.obtenerTodasLasCitas);
router.get('/api/citas/:id', citaController.obtenerCitaPorId);
router.put('/api/citas/:id', citaController.actualizarCita);
router.delete('/api/citas/:id', citaController.eliminarCita);

module.exports = router;

