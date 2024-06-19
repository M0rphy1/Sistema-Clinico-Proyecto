const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

router.post('/', proveedorController.createProveedor);
router.get('/', proveedorController.getProveedores); // Ruta para obtener todos los proveedores
router.get('/:id', proveedorController.getProveedorById);
router.put('/:id', proveedorController.updateProveedor);
router.delete('/:id', proveedorController.deleteProveedor);

module.exports = router;
