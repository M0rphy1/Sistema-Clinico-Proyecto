const sequelize = require('../database/conexiones');
const Cliente = require('./cliente');
const Usuario = require('./usuario');
const Empleado = require('./empleado');
const Rol = require('./rol');
const Mascota = require('./mascota');
const HistoriaClinica = require('./historiaClinica');
const Cita = require('./cita');
const HorarioAtencion = require('./horarioAtencion');
const DiaSemana = require('./diaSemana');
const Hora = require('./hora');
const Inventario = require('./inventario');
const Proveedor = require('./proveedor');
const Medicamento = require('./medicamento');
const Suministro = require('./suministro');

// Definir relaciones entre modelos

Empleado.belongsTo(Rol, { foreignKey: 'idRol' });

Rol.hasMany(Usuario, { foreignKey: 'idRol' });
Usuario.belongsTo(Rol, { foreignKey: 'idRol' });

Cliente.hasMany(Mascota, { foreignKey: 'idCliente' });
Mascota.hasMany(HistoriaClinica, { foreignKey: 'idMascota' });

Cita.belongsTo(Mascota, { foreignKey: 'idMascota' });
Cita.belongsTo(Empleado, { foreignKey: 'idEmpleado' });
Cita.belongsTo(Hora, { foreignKey: 'idHora' }); // Relación de Cita con Hora
Cita.belongsTo(HorarioAtencion, { foreignKey: 'idHorarioAtencion' });
Cita.belongsTo(DiaSemana, { foreignKey: 'idDiaSemana' });
Cita.belongsTo(Inventario, { foreignKey: 'idInventario' });

// Relación HorarioAtencion con DiaSemana
HorarioAtencion.belongsTo(DiaSemana, { foreignKey: 'idDiaSemana' });

// Definir relaciones entre modelos
Proveedor.hasMany(Suministro, { foreignKey: 'idProveedor' });
Suministro.belongsTo(Proveedor, { foreignKey: 'idProveedor' });

Proveedor.hasMany(Inventario, { foreignKey: 'idProveedor' });
Inventario.belongsTo(Proveedor, { foreignKey: 'idProveedor' });

Inventario.belongsTo(Medicamento, { foreignKey: 'idMedicamento' });
Medicamento.hasMany(Inventario, { foreignKey: 'idMedicamento' });

Inventario.belongsTo(Suministro, { foreignKey: 'idSuministro' });
Suministro.hasMany(Inventario, { foreignKey: 'idSuministro' });

// Sincronizar todos los modelos con la base de datos
sequelize.sync({ force: true }) // force: true eliminará las tablas existentes y las volverá a crear
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
  HorarioAtencion,
  DiaSemana,
  Hora,
  Inventario,
  Proveedor,
  Medicamento,
  Suministro
};
