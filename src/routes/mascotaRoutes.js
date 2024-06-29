const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

router.post('/', mascotaController.createMascota);
router.get('/', mascotaController.getMascotas); // Ruta para obtener todas las mascotas
router.get('/buscar', mascotaController.getMascotaByNombre); // Ruta para buscar mascota por nombre
router.get('/:id', mascotaController.getMascotaById); // Ruta para obtener una mascota por ID
router.put('/:id', mascotaController.updateMascota);
router.delete('/:id', mascotaController.deleteMascota);

module.exports = router;
