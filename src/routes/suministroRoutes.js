const express = require('express');
const router = express.Router();
const suministroController = require('../controllers/suministroController');

// Rutas para suministros
router.get('/', suministroController.obtenerSuministros);
router.get('/:id', suministroController.obtenerSuministroPorId);
router.post('/', suministroController.crearSuministro);
router.put('/:id', suministroController.actualizarSuministro);
router.delete('/:id', suministroController.eliminarSuministro);

module.exports = router;


