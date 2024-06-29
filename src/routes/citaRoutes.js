const express = require('express');
const { createCita, getCitas, getCitaById, updateCita, deleteCita } = require('../controllers/citaController');

const router = express.Router();

router.post('/', createCita);
router.get('/', getCitas);
//router.get('/:id', getCitaById);
router.get('/:id', getCitaById);
router.put('/:id', updateCita);
router.delete('/:id', deleteCita);

module.exports = router;

