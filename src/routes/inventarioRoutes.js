const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// Rutas para operaciones CRUD de inventarios
router.post('/', inventarioController.createInventario);
router.get('/', inventarioController.getInventarios);
router.get('/:id', inventarioController.getInventarioById);
router.put('/:id', inventarioController.updateInventario);
router.delete('/:id', inventarioController.deleteInventario);

module.exports = router;

