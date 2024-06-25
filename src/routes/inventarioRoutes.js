const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// Rutas para suministros
router.get('/', inventarioController.obtenerInventarios);
router.get('/:id', inventarioController.obtenerInventarioPorId);
router.post('/', inventarioController.crearInventario);
router.put('/:id', inventarioController.actualizarInventario);
router.delete('/:id', inventarioController.eliminarInventario);

module.exports = router;

