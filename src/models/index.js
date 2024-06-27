const sequelize = require('../database/conexiones');
const Cliente = require('./cliente');
const Usuario = require('./usuario');
const Rol = require('./rol');
const Mascota = require('./mascota');
const HistoriaClinica = require('./historiaClinica');
const Cita = require('./cita');
const HorarioAtencion = require('./horarioAtencion');
const DiaSemana = require('./diaSemana');
const Hora = require('./hora');
const Proveedor = require('./proveedor');
const Medicamento = require('./medicamento');
const Suministro = require('./suministro');

// Definir relaciones entre modelos

// Usuario y Rol
Usuario.belongsTo(Rol, { foreignKey: 'idRol' });
Rol.hasMany(Usuario, { foreignKey: 'idRol' });

// Cliente y Mascota
Cliente.hasMany(Mascota, { foreignKey: 'idCliente' });
Mascota.belongsTo(Cliente, { foreignKey: 'idCliente' });

// Mascota y HistoriaClinica
Mascota.hasMany(HistoriaClinica, { foreignKey: 'idMascota' });
HistoriaClinica.belongsTo(Mascota, { foreignKey: 'idMascota' });

// Cita y otras tablas
Cita.belongsTo(Mascota, { foreignKey: 'idMascota' });
Cita.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Cita.belongsTo(Hora, { foreignKey: 'idHora' });
Cita.belongsTo(HorarioAtencion, { foreignKey: 'idHorarioAtencion' });
Cita.belongsTo(DiaSemana, { foreignKey: 'idDiaSemana' });
Cita.belongsTo(Medicamento, { foreignKey: 'idMedicamento' }); // Relación con Medicamento
Cita.belongsTo(Suministro, { foreignKey: 'idSuministro' }); // Relación con Suministro

// HorarioAtencion y DiaSemana
HorarioAtencion.belongsTo(DiaSemana, { foreignKey: 'idDiaSemana' });

// Proveedor y Medicamento
Proveedor.hasMany(Medicamento, { foreignKey: 'idProveedor' });
Medicamento.belongsTo(Proveedor, { foreignKey: 'idProveedor' });

// Proveedor y Suministro
Proveedor.hasMany(Suministro, { foreignKey: 'idProveedor' });
Suministro.belongsTo(Proveedor, { foreignKey: 'idProveedor' });

// Sincronización de modelos con la base de datos
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
  Rol,
  Mascota,
  HistoriaClinica,
  Cita,
  HorarioAtencion,
  DiaSemana,
  Hora,
  Proveedor,
  Medicamento,
  Suministro
};

