const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const HorarioAtencion = sequelize.define('HorarioAtencion', {
  idHorarioAtencion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  horaInicio: {
       type: DataTypes.TIME,
       allowNull: false
  },
  horaFin: {
       type: DataTypes.TIME,
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
////
// const { DataTypes } = require('sequelize');
// const sequelize = require('../database/conexiones');

// const HorarioAtencion = sequelize.define('HorarioAtencion', {
//   idHorarioAtencion: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   horaInicio: {
//     type: DataTypes.TIME,
//     allowNull: false
//   },
//   horaFin: {
//     type: DataTypes.TIME,
//     allowNull: false
//   }
// }, {
//   tableName: 'HorarioAtencion',
//   timestamps: false
// });

// module.exports = HorarioAtencion;

