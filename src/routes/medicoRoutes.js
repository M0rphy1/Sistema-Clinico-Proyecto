// medico.routes.js

const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

// Rutas para Médicos
router.post('/', medicoController.createMedico);
router.get('/', medicoController.getMedicos); // Ruta para obtener todos los médicos
router.get('/:id', medicoController.getMedicoById); // Ruta para obtener un médico por ID
router.put('/:id', medicoController.updateMedico);
router.delete('/:id', medicoController.deleteMedico);

module.exports = router;

