const express = require('express');
const router = express.Router();
const horaController = require('../controllers/horaController');

router.post('/', horaController.createHora);
router.get('/', horaController.getHoras); // Ruta para obtener todas las horas
router.get('/:id', horaController.getHoraById);
router.put('/:id', horaController.updateHora);
router.delete('/:id', horaController.deleteHora);

module.exports = router;
