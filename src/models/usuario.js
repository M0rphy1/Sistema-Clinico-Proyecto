// models/usuario.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Usuario = sequelize.define('Usuario', {
  nombreUsuario: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigoVerificacion: {
    type: DataTypes.STRING,
  },
  idRol: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'Usuario',
  timestamps: false,
});

module.exports = Usuario;




