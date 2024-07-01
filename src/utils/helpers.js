const { Op } = require('sequelize');
const Cliente = require('../models/cliente');
const Mascota = require('../models/mascota');
const Medicamento = require('../models/medicamento');
const Suministro = require('../models/suministro');

async function getIdClienteByName(nombreCliente) {
  const cliente = await Cliente.findOne({ where: { nombreCliente } });
  return cliente ? cliente.idCliente : null;
}

async function getIdMascotaByName(nombreMascota) {
  const mascota = await Mascota.findOne({ where: { nombreMascota } });
  return mascota ? mascota.idMascota : null;
}

async function getIdMedicamentoByName(nombreMedicamento) {
  const medicamento = await Medicamento.findOne({ where: { nombreMedicamento } });
  return medicamento ? medicamento.idMedicamento : null;
}

async function getIdSuministroByName(nombreSuministro) {
  const suministro = await Suministro.findOne({ where: { nombreSuministro } });
  return suministro ? suministro.idSuministro : null;
}

module.exports = {
  getIdClienteByName,
  getIdMascotaByName,
  getIdMedicamentoByName,
  getIdSuministroByName
};
