const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Cliente = sequelize.define('Cliente', {
  idCliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreCliente: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING(100)
  },
  correo: {
    type: DataTypes.STRING(100)
  }
}, {
  timestamps: false,
  tableName: 'Cliente'
});

module.exports = Cliente;

