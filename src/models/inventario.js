const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Medicamento = require('./medicamento'); // Asegúrate de importar el modelo Medicamento correctamente

const Inventario = sequelize.define('Inventario', {
  idInventario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idMedicamento: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Medicamento', // Nombre del modelo
      key: 'idMedicamento'
    }
  },
  idSuministro: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Suministro', // Nombre del modelo Suministro, ajusta según tu estructura
      key: 'idSuministro'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  idProveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Proveedor', // Nombre del modelo Proveedor, ajusta según tu estructura
      key: 'idProveedor'
    }
  }
}, {
  tableName: 'Inventario',
  timestamps: false // Opcional: si no usas campos de timestamps
});

module.exports = Inventario;


