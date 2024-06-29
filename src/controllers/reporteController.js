const PDFDocument = require('pdfkit');
const Cliente = require('../models/cliente');
const Mascota = require('../models/mascota');
const Medicamento = require('../models/medicamento');
const Suministro = require('../models/suministro');
const Proveedor = require('../models/Proveedor');

// Función para generar el reporte seleccionado
exports.generarReporte = async (req, res) => {
    const { tipo } = req.params; // Tipo de reporte solicitado (clientes, mascotas, etc.)

    try {
        const doc = new PDFDocument();
        let filename = `${tipo}-reporte.pdf`;
        filename = encodeURIComponent(filename);

        // Configurar el encabezado de la respuesta HTTP
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        // Generar el contenido del PDF basado en el tipo de reporte
        switch (tipo) {
            case 'clientes':
                await generarReporteClientes(doc);
                break;
            case 'mascotas':
                await generarReporteMascotas(doc);
                break;
            case 'medicamentos':
                await generarReporteMedicamentos(doc);
                break;
            case 'suministros':
                await generarReporteSuministros(doc);
                break;
            case 'proveedores':
                await generarReporteProveedores(doc);
                break;
            default:
                return res.status(400).json({ error: 'Tipo de reporte inválido' });
        }

        // Finalizar y enviar el PDF
        doc.pipe(res);
        doc.end();

    } catch (error) {
        console.error('Error al generar el reporte:', error);
        res.status(500).json({ error: 'Error al generar el reporte' });
    }
};

// Función para generar el reporte de clientes
async function generarReporteClientes(doc) {
    try {
        const clientes = await Cliente.findAll(); // Obtener datos de clientes desde la base de datos
        console.log('Clientes:', clientes);

        doc.fontSize(20).text('Reporte de Clientes', { align: 'center' });
        doc.moveDown();

        if (clientes.length === 0) {
            doc.fontSize(12).text('No hay clientes para mostrar.');
        } else {
            clientes.forEach(cliente => {
                doc.fontSize(12).text(`Nombre: ${cliente.nombreCliente}`);
                doc.text(`Apellido: ${cliente.apellido}`);
                doc.text(`Correo: ${cliente.correo}`);
                doc.text(`Teléfono: ${cliente.telefono}`);
                doc.text(`Dirección: ${cliente.direccion}`);
                doc.moveDown();
            });
        }
    } catch (error) {
        console.error('Error al generar el reporte de clientes:', error);
    }
}

// Función para generar el reporte de mascotas
async function generarReporteMascotas(doc) {
    try {
        const mascotas = await Mascota.findAll(); // Obtener datos de mascotas desde la base de datos
        console.log('Mascotas:', mascotas);

        doc.fontSize(20).text('Reporte de Mascotas', { align: 'center' });
        doc.moveDown();

        if (mascotas.length === 0) {
            doc.fontSize(12).text('No hay mascotas para mostrar.');
        } else {
            mascotas.forEach(mascota => {
                doc.fontSize(12).text(`Nombre: ${mascota.nombreMascota}`);
                doc.text(`Especie: ${mascota.especie}`);
                doc.text(`Raza: ${mascota.raza}`);
                doc.text(`Fecha de Nacimiento: ${mascota.fechaNacimiento}`);
                doc.text(`Estado: ${mascota.estado ? 'Activo' : 'Inactivo'}`);
                doc.moveDown();
            });
        }
    } catch (error) {
        console.error('Error al generar el reporte de mascotas:', error);
    }
}

// Función para generar el reporte de medicamentos
async function generarReporteMedicamentos(doc) {
    try {
        const medicamentos = await Medicamento.findAll(); // Obtener datos de medicamentos desde la base de datos
        console.log('Medicamentos:', medicamentos);

        doc.fontSize(20).text('Reporte de Medicamentos', { align: 'center' });
        doc.moveDown();

        if (medicamentos.length === 0) {
            doc.fontSize(12).text('No hay medicamentos para mostrar.');
        } else {
            medicamentos.forEach(medicamento => {
                doc.fontSize(12).text(`Nombre: ${medicamento.nombreMedicamento}`);
                doc.text(`Descripción: ${medicamento.descripcion}`);
                doc.text(`Precio: ${medicamento.precio}`);
                doc.text(`Stock: ${medicamento.stock}`);
                doc.text(`Fecha de Vencimiento: ${medicamento.fecha_vencimiento}`);
                doc.text(`Fabricante: ${medicamento.fabricante}`);
                doc.moveDown();
            });
        }
    } catch (error) {
        console.error('Error al generar el reporte de medicamentos:', error);
    }
}

// Función para generar el reporte de suministros
async function generarReporteSuministros(doc) {
    try {
        const suministros = await Suministro.findAll(); // Obtener datos de suministros desde la base de datos
        console.log('Suministros:', suministros);

        doc.fontSize(20).text('Reporte de Suministros', { align: 'center' });
        doc.moveDown();

        if (suministros.length === 0) {
            doc.fontSize(12).text('No hay suministros para mostrar.');
        } else {
            suministros.forEach(suministro => {
                doc.fontSize(12).text(`Nombre: ${suministro.nombreSuministro}`);
                doc.text(`Descripción: ${suministro.descripcion}`);
                doc.text(`Precio: ${suministro.precio}`);
                doc.text(`Stock: ${suministro.stock}`);
                doc.text(`Fabricante: ${suministro.fabricante}`);
                doc.moveDown();
            });
        }
    } catch (error) {
        console.error('Error al generar el reporte de suministros:', error);
    }
}

// Función para generar el reporte de proveedores
async function generarReporteProveedores(doc) {
    try {
        const proveedores = await Proveedor.findAll(); // Obtener datos de proveedores desde la base de datos
        console.log('Proveedores:', proveedores);

        doc.fontSize(20).text('Reporte de Proveedores', { align: 'center' });
        doc.moveDown();

        if (proveedores.length === 0) {
            doc.fontSize(12).text('No hay proveedores para mostrar.');
        } else {
            proveedores.forEach(proveedor => {
                doc.fontSize(12).text(`Nombre: ${proveedor.nombreProveedor}`);
                doc.text(`Dirección: ${proveedor.direccion}`);
                doc.text(`Teléfono: ${proveedor.telefono}`);
                doc.text(`Correo: ${proveedor.email}`);
                doc.text(`Sitio Web: ${proveedor.sitioWeb}`);
                doc.moveDown();
            });
        }
    } catch (error) {
        console.error('Error al generar el reporte de proveedores:', error);
    }
}
