const express = require('express');
const router = express.Router();
const historiaClinicaController = require('../controllers/historiaClinicaController');

// Rutas para Historias Clínicas
router.post('/', historiaClinicaController.createHistoriaClinica);
router.get('/', historiaClinicaController.getHistoriasClinicas);
router.get('/:id', historiaClinicaController.getHistoriaClinicaById);
router.put('/:id', historiaClinicaController.updateHistoriaClinica);
router.delete('/:id', historiaClinicaController.deleteHistoriaClinica);

module.exports = router;
