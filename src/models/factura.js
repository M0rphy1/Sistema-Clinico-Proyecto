const { DataTypes } = require("sequelize");
const sequelize = require("../database/conexiones");
const Cita = require("./cita");
const Medicamento = require("./medicamento");
const Suministro = require("./suministro");

const Factura = sequelize.define(
  "Factura",
  {
    numeroFactura: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fechaFactura: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nombreCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombreMascota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    idMedicamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medicamento,
        key: "idMedicamento",
      },
    },
    stockMedicamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idSuministro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Suministro,
        key: "idSuministro",
      },
    },
    stockSuministro: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Factura",
    timestamps: false,
  }
);

// Definir la relación con el modelo Cita
Factura.belongsTo(Cita, { foreignKey: 'idCita' });
Cita.hasMany(Factura, { foreignKey: 'idCita' });

module.exports = Factura;

