const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

router.post('/', empleadoController.crearEmpleado);
router.get('/', empleadoController.obtenerEmpleados);

module.exports = router;

// router.get('/:id', empleadoController.getEmpleadoById);
// router.put('/:id', empleadoController.updateEmpleado);
// router.delete('/:id', empleadoController.deleteEmpleado);

// module.exports = router;


