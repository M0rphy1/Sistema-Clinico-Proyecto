const express = require('express');
const router = express.Router();

// Importar y usar las rutas de cada entidad
const citaRoutes = require('./citaRoutes');
const clienteRoutes = require('./clienteRoutes');
const diaSemanaRoutes = require('./diaSemanaRoutes');
const empleadoRoutes = require('./empleadoRoutes');
const historiaClinicaRoutes = require('./historiaClinicaRoutes');
const horarioAtencionRoutes = require('./horarioAtencionRoutes');
const horaRoutes = require('./horaRoutes');
const inventarioRoutes = require('./inventarioRoutes');
const mascotaRoutes = require('./mascotaRoutes');
const medicamentoRoutes = require('./medicamentoRoutes');
const medicoRoutes = require('./medicoRoutes');
const proveedorRoutes = require('./proveedorRoutes');
const rolRoutes = require('./rolRoutes');
const suministroRoutes = require('./suministroRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const authRoutes = require('./authRoutes');

router.use('/citas', citaRoutes);
router.use('/clientes', clienteRoutes);
router.use('/diasSemana', diaSemanaRoutes);
router.use('/empleados', empleadoRoutes);
router.use('/historiasClinicas', historiaClinicaRoutes);
router.use('/horariosAtencion', horarioAtencionRoutes);
router.use('/horas', horaRoutes);
router.use('/inventarios', inventarioRoutes);
router.use('/mascotas', mascotaRoutes);
router.use('/medicamentos', medicamentoRoutes);
router.use('/medicos', medicoRoutes);
router.use('/proveedores', proveedorRoutes);
router.use('/roles', rolRoutes);
router.use('/suministros', suministroRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/auth', authRoutes);

module.exports = router;