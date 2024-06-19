const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones'); // Ajusta la ruta según la configuración de tu proyecto

const Proveedor = sequelize.define('Proveedor', {
  idProveedor: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  sitioWeb: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  }
}, {
  tableName: 'Proveedor',
  timestamps: false
});

module.exports = Proveedor;



