const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones'); // Ajusta la ruta según tu estructura

const Cita = sequelize.define('Cita', {
  idCita: {
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
  idEmpleado: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Empleado',
      key: 'idEmpleado'
    }
  },
  fechaHora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo: {
    type: DataTypes.TEXT
  },
  idInventario: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Inventario',
      key: 'idInventario'
    }
  }
}, {
  tableName: 'Cita',
  timestamps: false
});

module.exports = Cita;
/////
// const { DataTypes } = require('sequelize');
// const sequelize = require('../database/conexiones');

// const Cita = sequelize.define('Cita', {
//   idCita: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   idMascota: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'Mascota',
//       key: 'idMascota'
//     }
//   },
//   idEmpleado: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'Empleado',
//       key: 'idEmpleado'
//     }
//   },
//   idDiaSemana: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'DiaSemana',
//       key: 'idDiaSemana'
//     }
//   },
//   idHora: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'Hora',
//       key: 'idHora'
//     }
//   },
//   idHorarioAtencion: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'HorarioAtencion',
//       key: 'idHorarioAtencion'
//     }
//   },
//   fechaCita: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   motivo: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   }
// }, {
//   tableName: 'Cita',
//   timestamps: false
// });

// module.exports = Cita;


