// historiaClinica.routes.js

const express = require('express');
const router = express.Router();
const historiaClinicaController = require('../controllers/historiaClinicaController');

// Rutas para Historia Clínica
router.post('/', historiaClinicaController.createHistoriaClinica);
router.get('/', historiaClinicaController.getHistoriasClinicas); // Ruta para obtener todas las historias clínicas
router.get('/:id', historiaClinicaController.getHistoriaClinicaById); // Ruta para obtener una historia clínica por ID
router.put('/:id', historiaClinicaController.updateHistoriaClinica);
router.delete('/:id', historiaClinicaController.deleteHistoriaClinica);

module.exports = router;
