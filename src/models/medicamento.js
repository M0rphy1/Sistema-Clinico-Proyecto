const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones'); // Importa la instancia de Sequelize

const Medicamento = sequelize.define('Medicamento', {
  idMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreMedicamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fecha_vencimiento: {
    type: DataTypes.DATEONLY,
  },
  fabricante: {
    type: DataTypes.STRING,
  },
  idProveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Proveedor',
      key: 'idProveedor'
    }
  }
},
{
  tableName: 'Medicamento',
  timestamps: false // Opcional: si no usas campos de timestamps
});

module.exports = Medicamento;



