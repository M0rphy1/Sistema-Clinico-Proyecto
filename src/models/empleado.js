const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Empleado = sequelize.define('Empleado', {
  idEmpleado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20)
  },
  direccion: {
    type: DataTypes.STRING(100)
  },
  correo: {
    type: DataTypes.STRING(100)
  },
  idRol: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Rol',
      key: 'idRol'
    }
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'Empleado',
  timestamps: false
});

module.exports = Empleado;

