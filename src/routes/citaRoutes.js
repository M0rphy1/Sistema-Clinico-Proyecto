const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// Ruta para crear una nueva cita
router.post('/citas', citaController.createCita);

// Ruta para obtener todas las citas
router.get('/citas', citaController.getCitas);

// Ruta para obtener una cita por su ID
router.get('/citas/:id', citaController.getCitaById);

// Ruta para actualizar una cita por su ID
router.put('/citas/:id', citaController.updateCita);

// Ruta para eliminar una cita por su ID
router.delete('/citas/:id', citaController.deleteCita);

module.exports = router;

