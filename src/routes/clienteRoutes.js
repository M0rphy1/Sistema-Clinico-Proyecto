const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/', clienteController.createCliente);
router.get('/', clienteController.getClientes); // Ruta para obtener todos los clientes
router.get('/buscar', clienteController.getClienteByNombre); // Ruta para buscar cliente por nombre
router.get('/:id', clienteController.getClienteById); // Ruta para obtener un cliente por ID
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
