const express = require('express');
const router = express.Router();
const suministroController = require('../controllers/suministroController');

router.post('/', suministroController.createSuministro);
router.get('/', suministroController.getSuministros);
router.get('/:id', suministroController.getSuministroById);
router.put('/:id', suministroController.updateSuministro);
router.delete('/:id', suministroController.deleteSuministro);

module.exports = router;
