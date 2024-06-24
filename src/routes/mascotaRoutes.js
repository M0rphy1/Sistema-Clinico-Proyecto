const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

router.post('/', mascotaController.createMascota);
router.get('/', mascotaController.getMascotas);
router.get('/:id', mascotaController.getMascotaById);
router.put('/:id', mascotaController.updateMascota);
router.delete('/:id', mascotaController.deleteMascota);

module.exports = router;



