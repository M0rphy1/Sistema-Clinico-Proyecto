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
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
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


