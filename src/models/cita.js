// En el archivo de modelo Cita (cita.js o similar)

const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones'); // Asegúrate de tener la configuración correcta de Sequelize

const Cita = sequelize.define('Cita', {
  idCita: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idMascota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombreUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idDiaSemana: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idHora: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idHorarioAtencion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idMedicamento: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idSuministro: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fechaCita: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Cita',
  timestamps: false
});

module.exports = Cita;
