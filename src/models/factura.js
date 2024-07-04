// Definición del modelo Factura en Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Factura = sequelize.define('Factura', {
  idFactura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Si deseas que sea autoincremental, de lo contrario, quita esto
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
  idCliente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Cliente',
      key: 'idCliente'
    }
  },
  idMascota: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Mascota',
      key: 'idMascota'
    }
  },
  fechaFactura: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Descripcion: {
    type: DataTypes.STRING
  }
});

module.exports = Factura;
