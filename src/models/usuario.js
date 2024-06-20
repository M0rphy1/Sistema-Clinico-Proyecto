const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Usuario = sequelize.define('Usuario', {
  idEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
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
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
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



