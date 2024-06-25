const { Proveedor, Medicamento, Suministro, Inventario } = require('./models');

(async () => {
  try {
    const proveedorA = await Proveedor.create({ nombre: 'Proveedor A' });
    const proveedorB = await Proveedor.create({ nombre: 'Proveedor B' });

    const paracetamol = await Medicamento.create({ nombre: 'Paracetamol', precio: 1.50, stock: 100 });
    const guantes = await Suministro.create({ nombre: 'Guantes', idProveedor: proveedorB.idProveedor });

    await Inventario.create({ idMedicamento: paracetamol.idMedicamento, cantidad: 50, fecha: new Date(), idProveedor: proveedorA.idProveedor, tipo: 'Medicamento' });
    await Inventario.create({ idSuministro: guantes.idSuministro, cantidad: 100, fecha: new Date(), idProveedor: proveedorB.idProveedor, tipo: 'Suministro' });

    console.log('Datos de ejemplo insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar datos de ejemplo:', error);
  }
})();
