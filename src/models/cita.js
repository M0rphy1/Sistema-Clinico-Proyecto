const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones'); // Asegúrate de tener la configuración correcta de Sequelize

const Cita = sequelize.define('Cita', {
  idCita: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cliente',
      key: 'idCliente'
    }
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'nombreUsuario'
    }
  },
  idMascota: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Mascota',
      key: 'idMascota'
    }
  },
  idMedicamento: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Medicamento',
      key: 'idMedicamento'
    }
  },
  idSuministro: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Suministro',
      key: 'idSuministro'
    }
  },
  fechaCita: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('confirmado', 'pendiente', 'cancelado', 'emergencia'),
    allowNull: false
  },
  horaInicio: {
    type: DataTypes.TIME,
    allowNull: true
  },
  horaFin: {
    type: DataTypes.TIME,
    allowNull: true
  },
  diaSemana: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']]
    }
  }
}, {
  tableName: 'Cita',
  timestamps: false
});

module.exports = Cita;


