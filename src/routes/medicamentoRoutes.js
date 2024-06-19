const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');

router.post('/', medicamentoController.createMedicamento);
router.get('/', medicamentoController.getMedicamentos); // Ruta para obtener todos los medicamentos
router.get('/:id', medicamentoController.getMedicamentoById);
router.put('/:id', medicamentoController.updateMedicamento);
router.delete('/:id', medicamentoController.deleteMedicamento);

module.exports = router;
