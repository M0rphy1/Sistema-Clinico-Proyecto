const Medicamento = require('../models/medicamento');
const Suministro = require('../models/suministro');

async function validarStock(req, res, next) {
  const { idMedicamento, idSuministro } = req.body;

  try {
    const medicamento = await Medicamento.findByPk(idMedicamento);
    const suministro = await Suministro.findByPk(idSuministro);

    if (!medicamento || medicamento.stock <= 0) {
      return res.status(400).json({ error: 'Stock de medicamento insuficiente' });
    }

    if (!suministro || suministro.stock <= 0) {
      return res.status(400).json({ error: 'Stock de suministro insuficiente' });
    }

    next();
  } catch (error) {
    console.error('Error al validar stock:', error);
    res.status(500).json({ error: 'Error en el servidor al validar stock' });
  }
}

module.exports = { validarStock };
