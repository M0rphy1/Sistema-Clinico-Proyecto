const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Suministro = sequelize.define('Suministro', {
  idSuministro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idProveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Proveedor',
      key: 'idProveedor'
    }
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fabricante: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  tableName: 'Suministro'
});

module.exports = Suministro;

