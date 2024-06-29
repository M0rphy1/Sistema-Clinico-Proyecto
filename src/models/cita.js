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
  idCliente: {
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
  },
  horaCita: {
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  tableName: 'Cita',
  timestamps: false
});

module.exports = Cita;