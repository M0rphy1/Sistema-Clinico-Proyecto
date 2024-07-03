const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController'); // Ajusta la ruta según tu estructura de proyecto

router.post('/', facturaController.createFactura);
router.get('/', facturaController.getFacturas);
router.get('/:id', facturaController.getFacturaById);
router.put('/:id', facturaController.updateFactura);
router.delete('/:id', facturaController.deleteFactura);

module.exports = router;
