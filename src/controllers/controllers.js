// controllers/index.js

const Cliente = require('../models/cliente');
const Cita = require('../models/cita');
const Empleado = require('../models/empleado');
const DiaSemana = require('../models/diaSemana');
const HistoriaClinica = require('../models/historiaClinica');
const Hora = require('../models/hora');
const HorarioAtencion = require('../models/horarioAtencion');
const Inventario = require('../models/inventario');
const Mascota = require('../models/mascota');
const Medicamento = require('../models/medicamento');
const Medico = require('../models/medico');
const Proveedor = require('../models/proveedor');
const Rol = require('../models/rol');
const Suministro = require('../models/suministro');
const Usuario = require('../models/usuario');

// CRUD Cliente
exports.createCliente = async (data) => await Cliente.create(data);
exports.getClientes = async () => await Cliente.findAll();
exports.updateCliente = async (id, data) => await Cliente.update(data, { where: { id_cliente: id } });
exports.deleteCliente = async (id) => await Cliente.destroy({ where: { id_cliente: id } });

// CRUD Cita
exports.createCita = async (data) => await Cita.create(data);
exports.getCitas = async () => await Cita.findAll();
exports.updateCita = async (id, data) => await Cita.update(data, { where: { id_cita: id } });
exports.deleteCita = async (id) => await Cita.destroy({ where: { id_cita: id } });

// CRUD Empleado
exports.createEmpleado = async (data) => await Empleado.create(data);
exports.getEmpleados = async () => await Empleado.findAll();
exports.updateEmpleado = async (id, data) => await Empleado.update(data, { where: { id_empleado: id } });
exports.deleteEmpleado = async (id) => await Empleado.destroy({ where: { id_empleado: id } });

// CRUD DiaSemana
exports.createDiaSemana = async (data) => await DiaSemana.create(data);
exports.getDiasSemana = async () => await DiaSemana.findAll();
exports.updateDiaSemana = async (id, data) => await DiaSemana.update(data, { where: { id_dia: id } });
exports.deleteDiaSemana = async (id) => await DiaSemana.destroy({ where: { id_dia: id } });

// CRUD HistoriaClinica
exports.createHistoriaClinica = async (data) => await HistoriaClinica.create(data);
exports.getHistoriasClinicas = async () => await HistoriaClinica.findAll();
exports.updateHistoriaClinica = async (id, data) => await HistoriaClinica.update(data, { where: { id_historia: id } });
exports.deleteHistoriaClinica = async (id) => await HistoriaClinica.destroy({ where: { id_historia: id } });

// CRUD Hora
exports.createHora = async (data) => await Hora.create(data);
exports.getHoras = async () => await Hora.findAll();
exports.updateHora = async (id, data) => await Hora.update(data, { where: { id_hora: id } });
exports.deleteHora = async (id) => await Hora.destroy({ where: { id_hora: id } });

// CRUD HorarioAtencion
exports.createHorarioAtencion = async (data) => await HorarioAtencion.create(data);
exports.getHorariosAtencion = async () => await HorarioAtencion.findAll();
exports.updateHorarioAtencion = async (id, data) => await HorarioAtencion.update(data, { where: { id_horario: id } });
exports.deleteHorarioAtencion = async (id) => await HorarioAtencion.destroy({ where: { id_horario: id } });

// CRUD Inventario
exports.createInventario = async (data) => await Inventario.create(data);
exports.getInventarios = async () => await Inventario.findAll();
exports.updateInventario = async (id, data) => await Inventario.update(data, { where: { id_inventario: id } });
exports.deleteInventario = async (id) => await Inventario.destroy({ where: { id_inventario: id } });

// CRUD Mascota
exports.createMascota = async (data) => await Mascota.create(data);
exports.getMascotas = async () => await Mascota.findAll();
exports.updateMascota = async (id, data) => await Mascota.update(data, { where: { id_mascota: id } });
exports.deleteMascota = async (id) => await Mascota.destroy({ where: { id_mascota: id } });

// CRUD Medicamento
exports.createMedicamento = async (data) => await Medicamento.create(data);
exports.getMedicamentos = async () => await Medicamento.findAll();
exports.updateMedicamento = async (id, data) => await Medicamento.update(data, { where: { id_medicamento: id } });
exports.deleteMedicamento = async (id) => await Medicamento.destroy({ where: { id_medicamento: id } });

// CRUD Medico
exports.createMedico = async (data) => await Medico.create(data);
exports.getMedicos = async () => await Medico.findAll();
exports.updateMedico = async (id, data) => await Medico.update(data, { where: { id_medico: id } });
exports.deleteMedico = async (id) => await Medico.destroy({ where: { id_medico: id } });

// CRUD Proveedor
exports.createProveedor = async (data) => await Proveedor.create(data);
exports.getProveedores = async () => await Proveedor.findAll();
exports.updateProveedor = async (id, data) => await Proveedor.update(data, { where: { id_proveedor: id } });
exports.deleteProveedor = async (id) => await Proveedor.destroy({ where: { id_proveedor: id } });

// CRUD Rol
exports.createRol = async (data) => await Rol.create(data);
exports.getRoles = async () => await Rol.findAll();
exports.updateRol = async (id, data) => await Rol.update(data, { where: { id_rol: id } });
exports.deleteRol = async (id) => await Rol.destroy({ where: { id_rol: id } });

// CRUD Suministro
exports.createSuministro = async (data) => await Suministro.create(data);
exports.getSuministros = async () => await Suministro.findAll();
exports.updateSuministro = async (id, data) => await Suministro.update(data, { where: { id_suministro: id } });
exports.deleteSuministro = async (id) => await Suministro.destroy({ where: { id_suministro: id } });

// CRUD Usuario
exports.createUsuario = async (data) => await Usuario.create(data);
exports.getUsuarios = async () => await Usuario.findAll();
exports.updateUsuario = async (id, data) => await Usuario.update(data, { where: { id_usuario: id } });
exports.deleteUsuario = async (id) => await Usuario.destroy({ where: { id_usuario: id } });

module.exports = exports;
