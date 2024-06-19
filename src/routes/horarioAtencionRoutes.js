const express = require('express');
const router = express.Router();
const horarioAtencionController = require('../controllers/horarioAtencionController');

router.post('/', horarioAtencionController.createHorarioAtencion);
router.get('/', horarioAtencionController.getHorariosAtencion); // Ruta para obtener todos los horarios de atención
router.get('/:id', horarioAtencionController.getHorarioAtencionById);
router.put('/:id', horarioAtencionController.updateHorarioAtencion);
router.delete('/:id', horarioAtencionController.deleteHorarioAtencion);

module.exports = router;

