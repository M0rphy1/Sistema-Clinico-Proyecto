const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Mascota = sequelize.define('Mascota', {
  idMascota: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idCliente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Cliente',
      key: 'idCliente'
    }
  },
  nombreMascota: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  especie: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  raza: {
    type: DataTypes.STRING(50)
  },
  fechaNacimiento: {
    type: DataTypes.DATE
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true // Aquí establece el valor por defecto que necesites
  }
}, {
  tableName: 'Mascota',
  timestamps: false
});

module.exports = Mascota;



