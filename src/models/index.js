const sequelize = require('../database/conexiones');
const Cliente = require('./cliente');
const Usuario = require('./usuario');
const Rol = require('./rol');
const Mascota = require('./mascota');
const HistoriaClinica = require('./historiaClinica');
const Cita = require('./cita');
const Proveedor = require('./proveedor');
const Medicamento = require('./medicamento');
const Suministro = require('./suministro');
const Factura = require('./factura'); // Importar Factura

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
Mascota.hasMany(Cita, { foreignKey: 'idMascota' });

Cita.belongsTo(Usuario, { foreignKey: 'nombreUsuario' });
Usuario.hasMany(Cita, { foreignKey: 'nombreUsuario' });

Cita.belongsTo(Cliente, { foreignKey: 'idCliente' });
Cliente.hasMany(Cita, { foreignKey: 'idCliente' });

// Cita.belongsTo(Medicamento, { foreignKey: 'idMedicamento' });
// Medicamento.hasMany(Cita, { foreignKey: 'idMedicamento' });

// Cita.belongsTo(Suministro, { foreignKey: 'idSuministro' });
// Suministro.hasMany(Cita, { foreignKey: 'idSuministro' });

// Proveedor y Medicamento
Proveedor.hasMany(Medicamento, { foreignKey: 'idProveedor' });
Medicamento.belongsTo(Proveedor, { foreignKey: 'idProveedor' });

// Proveedor y Suministro
Proveedor.hasMany(Suministro, { foreignKey: 'idProveedor' });
Suministro.belongsTo(Proveedor, { foreignKey: 'idProveedor' });

// Factura y otras tablas
Factura.belongsTo(Medicamento, { foreignKey: 'idMedicamento' });
Medicamento.hasMany(Factura, { foreignKey: 'idMedicamento' });

Factura.belongsTo(Suministro, { foreignKey: 'idSuministro' });
Suministro.hasMany(Factura, { foreignKey: 'idSuministro' });

Factura.belongsTo(Cliente, { foreignKey: 'idCliente' });
Cliente.hasMany(Factura, { foreignKey: 'idCliente' });

Factura.belongsTo(Mascota, { foreignKey: 'idMascota' });
Mascota.hasMany(Factura, { foreignKey: 'idMascota' });

// Sincronización de modelos con la base de datos
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
  Rol,
  Mascota,
  HistoriaClinica,
  Cita,
  Proveedor,
  Medicamento,
  Suministro,
  Factura // Exportar Factura
};
