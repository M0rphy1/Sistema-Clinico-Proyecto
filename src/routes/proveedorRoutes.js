const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

router.post('/', proveedorController.createProveedor);
router.get('/', proveedorController.getProveedores); // Ruta para obtener todos los proveedores
router.get('/buscar', proveedorController.getProveedorByNombre); // Ruta para buscar proveedor por nombre
router.get('/:id', proveedorController.getProveedorById); // Ruta para obtener un proveedor por ID
router.put('/:id', proveedorController.updateProveedor);
router.delete('/:id', proveedorController.deleteProveedor);

module.exports = router;

