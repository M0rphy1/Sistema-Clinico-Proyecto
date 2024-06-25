const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Inventario = sequelize.define('Inventario', {
  idInventario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idMedicamento: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Medicamento',
      key: 'idMedicamento'
    }
  },
  idSuministro: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Suministro',
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
  idProveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Proveedor',
      key: 'idProveedor'
    }
  },
  tipo: {
    type: DataTypes.STRING, // Ajusta el tipo de dato según corresponda (VARCHAR, TEXT, etc.)
    allowNull: true // Cambia a false si el tipo es obligatorio
  }
}, {
  tableName: 'Inventario',
  timestamps: false // Opcional: si no usas campos de timestamps
});

module.exports = Inventario;



