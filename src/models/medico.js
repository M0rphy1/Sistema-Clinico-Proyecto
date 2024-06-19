const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Medico = sequelize.define('Medico', {
  idMedico: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Empleado',
      key: 'idEmpleado'
    }
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'Medico',
  timestamps: false
});

module.exports = Medico;


