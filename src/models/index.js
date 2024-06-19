const sequelize = require('../database/conexiones');

const Cliente = require('./cliente');
const Usuario = require('./usuario');
const Empleado = require('./empleado');
const Rol = require('./rol');
const Mascota = require('./mascota');
const HistoriaClinica = require('./historiaClinica');
const Cita = require('./cita');
const Medico = require('./medico');
const HorarioAtencion = require('./horarioAtencion');
const DiaSemana = require('./diaSemana');
const Hora = require('./hora');
const Inventario = require('./inventario');
const Proveedor = require('./proveedor');
const Medicamento = require('./medicamento');
const Suministro = require('./suministro');

// Definir relaciones entre modelos
Usuario.belongsTo(Empleado, { foreignKey: 'idEmpleado' });
Empleado.belongsTo(Rol, { foreignKey: 'idRol' });
Cliente.hasMany(Mascota, { foreignKey: 'idCliente' });
Mascota.hasMany(HistoriaClinica, { foreignKey: 'idMascota' });
Cita.belongsTo(Mascota, { foreignKey: 'idMascota' });
Cita.belongsTo(Empleado, { foreignKey: 'idEmpleado' });
Cita.belongsTo(Inventario, { foreignKey: 'idInventario' });
Medico.belongsTo(Empleado, { foreignKey: 'idEmpleado' });

HorarioAtencion.belongsTo(Medico, { foreignKey: 'idMedico' });
HorarioAtencion.belongsTo(Hora, { as: 'HoraInicio', foreignKey: 'idHoraInicio' });
HorarioAtencion.belongsTo(Hora, { as: 'HoraFin', foreignKey: 'idHoraFin' });
HorarioAtencion.belongsTo(DiaSemana, { foreignKey: 'idDiaSemana' });
Inventario.belongsTo(Medicamento, { foreignKey: 'idMedicamento' });
Inventario.belongsTo(Suministro, { foreignKey: 'idSuministro' });
Inventario.belongsTo(Proveedor, { foreignKey: 'idProveedor' });
Suministro.belongsTo(Proveedor, { foreignKey: 'idProveedor', onDelete: 'CASCADE' }); // Relación añadida

// Sincronizar todos los modelos con la base de datos
sequelize.sync({ force: false }) // force: true eliminará las tablas existentes y las volverá a crear
  .then(() => {
    console.log('Tablas sincronizadas correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

module.exports = {
  Cliente,
  Usuario,
  Empleado,
  Rol,
  Mascota,
  HistoriaClinica,
  Cita,
  Medico,
  HorarioAtencion,
  DiaSemana,
  Hora,
  Inventario,
  Proveedor,
  Medicamento,
  Suministro
};
