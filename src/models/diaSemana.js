const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const DiaSemana = sequelize.define('DiaSemana', {
  idDiaSemana: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombreDiaSemana: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'DiaSemana',
  timestamps: false
});

module.exports = DiaSemana;


