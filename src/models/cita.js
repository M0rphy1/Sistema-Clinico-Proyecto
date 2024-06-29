const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones'); // Asegúrate de tener la configuración correcta de Sequelize

const Cita = sequelize.define('Cita', {
  idCita: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idMascota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Mascota',
      key: 'idMascota'
    }
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'idUsuario'
    }
  },
  idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cliente',
      key: 'idCliente'
    }
  },
  idMedicamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Medicamento',
      key: 'idMedicamento'
    }
  },
  idSuministro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Suministro',
      key: 'idSuministro'
    }
  },
  fechaCita: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  horaCita: {
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  tableName: 'Cita',
  timestamps: false
});

module.exports = Cita;
