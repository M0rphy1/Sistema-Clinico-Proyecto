const express = require('express');
const router = express.Router();
const diaSemanaController = require('../controllers/diaSemanaController');

router.post('/', diaSemanaController.createDiaSemana);
router.get('/', diaSemanaController.getDiaSemanas); // Ruta para obtener todas las dias semanas
router.get('/:id', diaSemanaController.getDiaSemanaById);
router.put('/:id', diaSemanaController.updateDiaSemana);
router.delete('/:id', diaSemanaController.deleteDiaSemana);

module.exports = router;

