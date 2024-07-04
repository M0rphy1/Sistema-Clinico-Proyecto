const express = require('express');
const { createFactura, getFacturas, getFacturaById, updateFactura, deleteFactura } = require('../controllers/facturaController');

const router = express.Router();

router.post('/', createFactura);
router.get('/', getFacturas);
//router.get('/:id', getCitaById);
router.get('/:id', getFacturaById);
router.put('/:id', updateFactura);
router.delete('/:id', deleteFactura);

module.exports = router;
