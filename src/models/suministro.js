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
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Suministro'
});

module.exports = Suministro;

