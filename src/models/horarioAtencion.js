const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const HorarioAtencion = sequelize.define('HorarioAtencion', {
  idHorarioAtencion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idHoraInicio: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Hora',
      key: 'idHora'
    }
  },
  idHoraFin: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Hora',
      key: 'idHora'
    }
  },
  idMedico: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Medico',
      key: 'idMedico'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  idDiaSemana: {
    type: DataTypes.INTEGER,
    references: {
      model: 'DiaSemana',
      key: 'idDiaSemana'
    }
  }
}, {
  tableName: 'HorarioAtencion',
  timestamps: false
});

module.exports = HorarioAtencion;


