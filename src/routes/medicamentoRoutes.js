// routes/medicamentoRoutes.js

const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');

router.post('/', medicamentoController.createMedicamento);
router.get('/', medicamentoController.getMedicamentos); // Ruta para obtener todos los medicamentos
router.get('/buscar', medicamentoController.getMedicamentoByNombre); // Ruta para buscar medicamento por nombre
router.get('/:id', medicamentoController.getMedicamentoById); // Ruta para obtener un medicamento por ID
router.put('/:id', medicamentoController.updateMedicamento);
router.delete('/:id', medicamentoController.deleteMedicamento);
// Nueva ruta para reponer stock de un medicamento por ID
router.put('/:id/reponer', medicamentoController.reponerStock);

module.exports = router;

