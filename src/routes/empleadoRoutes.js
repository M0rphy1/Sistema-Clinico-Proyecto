// empleadoRoutes.js

const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Rutas para CRUD de empleados
router.post('/crear', empleadoController.crearEmpleado);
router.get('/', empleadoController.obtenerEmpleados);
// Rutas adicionales como obtener empleado por ID, actualizar, eliminar, etc.

module.exports = router;


// router.get('/:id', empleadoController.getEmpleadoById);
// router.put('/:id', empleadoController.updateEmpleado);
// router.delete('/:id', empleadoController.deleteEmpleado);

// module.exports = router;


