const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const HistoriaClinica = sequelize.define('HistoriaClinica', {
  idHistorialClinico: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idMascota: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Mascota',
      key: 'idMascota'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'HistoriaClinica',
  timestamps: false
});

module.exports = HistoriaClinica;



