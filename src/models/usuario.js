const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Usuario = sequelize.define('Usuario', {
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  },
  codigoVerificacion: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});

module.exports = Usuario;



