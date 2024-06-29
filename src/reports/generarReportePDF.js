const PDFDocument = require('pdfkit');
const Cliente = require('../models/cliente');
const Mascota = require('../models/mascota');
const Medicamento = require('../models/medicamento');
const Suministro = require('../models/suministro');
const Proveedor = require('../models/Proveedor');

// Función para generar el reporte seleccionado
exports.generarReporte = async (req, res) => {
    const { tipo } = req.params;

    try {
        const doc = new PDFDocument();
        let filename = `${tipo}-reporte.pdf`;
        filename = encodeURIComponent(filename);

        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        // Pipe the PDF into the response
        doc.pipe(res);

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
            // case 'citas':
            //     await generarReporteCitas(doc);
            //     break;
            default:
                return res.status(400).json({ error: 'Tipo de reporte inválido' });
        }

        // Finalizar el documento PDF
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

        doc.fontSize(20).text('Reporte de Clientes', { align: 'center' });
        doc.moveDown();

        clientes.forEach(cliente => {
            doc.fontSize(12).text(`Nombre: ${cliente.nombreCliente}`);
            doc.text(`Apellido: ${cliente.apellido}`);
            doc.text(`Correo: ${cliente.correo}`);
            doc.text(`Teléfono: ${cliente.telefono}`);
            doc.text(`Dirección: ${cliente.direccion}`);
            doc.moveDown();
        });
    } catch (error) {
        console.error('Error al generar el reporte de clientes:', error);
    }
}


// Funciones de ejemplo para la generación de otros reportes
async function generarReporteMascotas(doc) {
    const mascotas = await Mascota.findAll();
    
    doc.fontSize(20).text('Reporte de Mascotas', { align: 'center' });
    doc.moveDown();
    
    mascotas.forEach(mascota => {
        doc.fontSize(12).text(`Nombre: ${mascota.nombreMascota}`);
        doc.text(`Especie: ${mascota.especie}`);
        doc.text(`Raza: ${mascota.raza}`);
        doc.moveDown();
    });
}

async function generarReporteMedicamentos(doc) {
    const medicamentos = await Medicamento.findAll();

    doc.fontSize(20).text('Reporte de Medicamentos', { align: 'center' });
    doc.moveDown();

    medicamentos.forEach(medicamento => {
        doc.fontSize(12).text(`Nombre: ${medicamento.nombreMedicamento}`);
        doc.text(`Precio: ${medicamento.precio}`);
        doc.text(`Stock: ${medicamento.stock}`);
        doc.text(`Fabricante: ${medicamento.fabricante}`);
        doc.moveDown();
    });
}

async function generarReporteSuministros(doc) {
    const suministros = await Suministro.findAll();

    doc.fontSize(20).text('Reporte de Suministros', { align: 'center' });
    doc.moveDown();

    suministros.forEach(suministro => {
        doc.fontSize(12).text(`Nombre: ${suministro.nombreSuministro}`);
        doc.text(`Descripción: ${suministro.descripcion}`);
        doc.text(`Precio: ${suministro.precio}`);
        doc.text(`Stock: ${suministro.stock}`);
        doc.text(`Fabricante: ${suministro.fabricante}`);
        doc.moveDown();
    });
}

async function generarReporteProveedores(doc) {
    const proveedores = await Proveedor.findAll();

    doc.fontSize(20).text('Reporte de Proveedores', { align: 'center' });
    doc.moveDown();

    proveedores.forEach(proveedor => {
        doc.fontSize(12).text(`Nombre: ${proveedor.nombre}`);
        doc.text(`Correo: ${proveedor.correo}`);
        doc.moveDown();
    });
}

// async function generarReporteCitas(doc) {
//     doc.fontSize(20).text('Reporte de Citas', { align: 'center' });
//     doc.moveDown();
// }
