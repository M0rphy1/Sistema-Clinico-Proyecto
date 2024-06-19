const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

router.post('/', citaController.createCita);
router.get('/', citaController.getCitas);
router.get('/:id', citaController.getCitaById);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);

module.exports = router;
