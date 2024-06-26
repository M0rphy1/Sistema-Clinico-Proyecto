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
const Inventario = require('./inventario');
const Proveedor = require('./proveedor');
const Medicamento = require('./medicamento');
const Suministro = require('./suministro');

// Definir relaciones entre modelos

Usuario.belongsTo(Rol, { foreignKey: 'idRol' });
Rol.hasMany(Usuario, { foreignKey: 'idRol' });

Cliente.hasMany(Mascota, { foreignKey: 'idCliente' });
Mascota.hasMany(HistoriaClinica, { foreignKey: 'idMascota' });

Cita.belongsTo(Mascota, { foreignKey: 'idMascota' });
Cita.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Cita.belongsTo(Hora, { foreignKey: 'idHora' });
Cita.belongsTo(HorarioAtencion, { foreignKey: 'idHorarioAtencion' });
Cita.belongsTo(DiaSemana, { foreignKey: 'idDiaSemana' });
Cita.belongsTo(Inventario, { foreignKey: 'idInventario' });

HorarioAtencion.belongsTo(DiaSemana, { foreignKey: 'idDiaSemana' });

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
  Inventario,
  Proveedor,
  Medicamento,
  Suministro
};

