const sequelize = require('./database/conexiones');

async function createView() {
  try {
    await sequelize.query(`
      CREATE OR REPLACE VIEW vista_inventario AS
      SELECT
        i.idInventario,
        i.idMedicamento,
        i.idSuministro,
        i.cantidad,
        i.fecha,
        i.idProveedor,
        CASE
          WHEN i.idMedicamento IS NOT NULL THEN 'Medicamento'
          WHEN i.idSuministro IS NOT NULL THEN 'Suministro'
          ELSE 'Desconocido'
        END AS tipo
      FROM Inventario i
      LEFT JOIN Medicamento m ON i.idMedicamento = m.idMedicamento
      LEFT JOIN Suministro s ON i.idSuministro = s.idSuministro;
    `);
    console.log('Vista creada exitosamente');
  } catch (error) {
    console.error('Error al crear la vista:', error);
  } finally {
    await sequelize.close();
  }
}

createView();
