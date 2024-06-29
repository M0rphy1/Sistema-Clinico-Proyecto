const express = require('express');
const router = express.Router();

// Importar y usar las rutas de cada entidad
const citaRoutes = require('./citaRoutes');
const clienteRoutes = require('./clienteRoutes');
const historiaClinicaRoutes = require('./historiaClinicaRoutes');
const mascotaRoutes = require('./mascotaRoutes');
const medicamentoRoutes = require('./medicamentoRoutes');
const proveedorRoutes = require('./proveedorRoutes');
const rolRoutes = require('./rolRoutes');
const suministroRoutes = require('./suministroRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const authRoutes = require('./authRoutes');

router.use('/citas', citaRoutes);
router.use('/clientes', clienteRoutes);
router.use('/historiasClinicas', historiaClinicaRoutes);
router.use('/mascotas', mascotaRoutes);
router.use('/medicamentos', medicamentoRoutes);
router.use('/proveedores', proveedorRoutes);
router.use('/roles', rolRoutes);
router.use('/suministros', suministroRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/auth', authRoutes);

module.exports = router;