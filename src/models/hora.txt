const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Hora = sequelize.define('Hora', {
  idHora: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'Hora',
  timestamps: false
});

module.exports = Hora;

