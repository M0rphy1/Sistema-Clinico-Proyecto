const PDFDocument = require("pdfkit");
const Cliente = require("../models/cliente");
const Mascota = require("../models/mascota");
const Medicamento = require("../models/medicamento");
const Suministro = require("../models/suministro");
const Proveedor = require("../models/Proveedor");
const { Usuario, Cita } = require("../models");

// Función para generar el reporte seleccionado
exports.generarReporte = async (req, res) => {
  const { tipo } = req.params; // Tipo de reporte solicitado (clientes, mascotas, etc.)

  try {
    const doc = new PDFDocument();
    let filename = `${tipo}-reporte.pdf`;
    filename = encodeURIComponent(filename);

    // Configurar el encabezado de la respuesta HTTP
    res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-type", "application/pdf");

    // Generar el contenido del PDF basado en el tipo de reporte
    switch (tipo) {
      case "clientes":
        await generarReporteClientes(doc);
        break;
      case "usuarios":
        await generarReporteUsuarios(doc);
      case "mascotas":
        await generarReporteMascotas(doc);
        break;
      case "medicamentos":
        await generarReporteMedicamentos(doc);
        break;
      case "suministros":
        await generarReporteSuministros(doc);
        break;
      case "proveedores":
        await generarReporteProveedores(doc);
        break;
      case "citas":
        await generarReporteCitas(doc);
        break;
      default:
        return res.status(400).json({ error: "Tipo de reporte inválido" });
    }

    // Finalizar y enviar el PDF
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    res.status(500).json({ error: "Error al generar el reporte" });
  }
};

// Función para generar el reporte de clientes
async function generarReporteClientes(doc) {
  try {
    const clientes = await Cliente.findAll(); // Obtener datos de clientes desde la base de datos
    console.log("Clientes:", clientes);

    doc.fontSize(20).text("Reporte de Clientes", { align: "center" });
    doc.moveDown();

    if (clientes.length === 0) {
      doc.fontSize(12).text("No hay clientes para mostrar.");
    } else {
      clientes.forEach((cliente) => {
        doc.fontSize(12).text(`Nombre: ${cliente.nombreCliente}`);
        doc.text(`Apellido: ${cliente.apellido}`);
        doc.text(`Correo: ${cliente.correo}`);
        doc.text(`Teléfono: ${cliente.telefono}`);
        doc.text(`Dirección: ${cliente.direccion}`);
        doc.moveDown();
      });
    }
  } catch (error) {
    console.error("Error al generar el reporte de clientes:", error);
  }
}

async function generarReporteUsuarios(doc) {
  try {
    const usuarios = await Usuario.findAll(); // Obtener datos de usuarios desde la base de datos
    console.log("usuarios:", usuarios);

    doc.fontSize(20).text("Reporte de usuarios", { align: "center" });
    doc.moveDown();

    if (usuarios.length === 0) {
      doc.fontSize(12).text("No hay usuarios para mostrar.");
    } else {
      usuarios.forEach((usuario) => {
        doc.fontSize(12).text(`Nombre: ${usuario.nombreusuario}`);
        doc.text(`Apellido: ${usuario.apellido}`);
        doc.text(`Apellido: ${usuario.nombre}`);
        doc.text(`Correo: ${usuario.correo}`);
        doc.text(`Teléfono: ${usuario.telefono}`);
        doc.text(`Dirección: ${usuario.direccion}`);
        doc.moveDown();
      });
    }
  } catch (error) {
    console.error("Error al generar el reporte de usuarios:", error);
  }
}

async function generarReporteCitas(doc) {
    try {
      const citas = await Cita.findAll({ 
        include: ['Mascotum', 'Usuario', 'Cliente', 'Medicamento', 'Suministro'] 
      }); // Obtener datos de citas desde la base de datos con las relaciones incluidas
      console.log("citas:", citas);
  
      doc.fontSize(20).text("Reporte de citas", { align: "center" });
      doc.moveDown();
  
      if (citas.length === 0) {
        doc.fontSize(12).text("No hay citas para mostrar.");
      } else {
        citas.forEach((cita) => {
          doc.fontSize(14).text(`Cita ID: ${cita.idCita}`, { underline: true });
          doc.moveDown();
  
          doc.fontSize(12).text(`Fecha de la cita: ${new Date(cita.fechaCita).toLocaleDateString()}`);
          doc.text(`Hora de la cita: ${cita.horaCita}`);
          doc.text(`Motivo: ${cita.motivo}`);
          doc.moveDown();
  
          doc.fontSize(12).text("Información de la mascota:", { underline: true });
          doc.text(`Nombre: ${cita.Mascotum.nombreMascota}`);
          doc.text(`Especie: ${cita.Mascotum.especie}`);
          doc.text(`Raza: ${cita.Mascotum.raza}`);
          doc.moveDown();
  
          doc.fontSize(12).text("Información del usuario:", { underline: true });
          doc.text(`Nombre: ${cita.Usuario.nombre}`);
          doc.text(`Apellido: ${cita.Usuario.apellido}`);
          doc.text(`Correo: ${cita.Usuario.correo}`);
          doc.text(`Teléfono: ${cita.Usuario.telefono}`);
          doc.text(`Dirección: ${cita.Usuario.direccion}`);
          doc.moveDown();
  
          doc.fontSize(12).text("Información del cliente:", { underline: true });
          doc.text(`Nombre: ${cita.Cliente.nombreCliente}`);
          doc.text(`Apellido: ${cita.Cliente.apellido}`);
          doc.text(`Teléfono: ${cita.Cliente.telefono}`);
          doc.text(`Dirección: ${cita.Cliente.direccion}`);
          doc.text(`Correo: ${cita.Cliente.correo}`);
          doc.moveDown();
  
          doc.fontSize(12).text("Información del medicamento:", { underline: true });
          doc.text(`Nombre: ${cita.Medicamento.nombreMedicamento}`);
          doc.text(`Descripción: ${cita.Medicamento.descripcion}`);
          doc.text(`Precio: ${cita.Medicamento.precio}`);
          doc.text(`Fabricante: ${cita.Medicamento.fabricante}`);
          doc.moveDown();
  
          doc.fontSize(12).text("Información del suministro:", { underline: true });
          doc.text(`Nombre: ${cita.Suministro.nombreSuministro}`);
          doc.text(`Descripción: ${cita.Suministro.descripcion}`);
          doc.text(`Precio: ${cita.Suministro.precio}`);
          doc.text(`Fabricante: ${cita.Suministro.fabricante}`);
          doc.moveDown();
  
          doc.addPage(); // Añade una nueva página para la siguiente cita
        });
      }
    } catch (error) {
      console.error("Error al generar el reporte de citas:", error);
    }
  }

// Función para generar el reporte de mascotas
async function generarReporteMascotas(doc) {
  try {
    const mascotas = await Mascota.findAll(); // Obtener datos de mascotas desde la base de datos
    console.log("Mascotas:", mascotas);

    doc.fontSize(20).text("Reporte de Mascotas", { align: "center" });
    doc.moveDown();

    if (mascotas.length === 0) {
      doc.fontSize(12).text("No hay mascotas para mostrar.");
    } else {
      mascotas.forEach((mascota) => {
        doc.fontSize(12).text(`Nombre: ${mascota.nombreMascota}`);
        doc.text(`Especie: ${mascota.especie}`);
        doc.text(`Raza: ${mascota.raza}`);
        doc.text(`Fecha de Nacimiento: ${mascota.fechaNacimiento}`);
        doc.text(`Estado: ${mascota.estado ? "Activo" : "Inactivo"}`);
        doc.moveDown();
      });
    }
  } catch (error) {
    console.error("Error al generar el reporte de mascotas:", error);
  }
}

// Función para generar el reporte de medicamentos
async function generarReporteMedicamentos(doc) {
  try {
    const medicamentos = await Medicamento.findAll(); // Obtener datos de medicamentos desde la base de datos
    console.log("Medicamentos:", medicamentos);

    doc.fontSize(20).text("Reporte de Medicamentos", { align: "center" });
    doc.moveDown();

    if (medicamentos.length === 0) {
      doc.fontSize(12).text("No hay medicamentos para mostrar.");
    } else {
      medicamentos.forEach((medicamento) => {
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
    console.error("Error al generar el reporte de medicamentos:", error);
  }
}

// Función para generar el reporte de suministros
async function generarReporteSuministros(doc) {
  try {
    const suministros = await Suministro.findAll(); // Obtener datos de suministros desde la base de datos
    console.log("Suministros:", suministros);

    doc.fontSize(20).text("Reporte de Suministros", { align: "center" });
    doc.moveDown();

    if (suministros.length === 0) {
      doc.fontSize(12).text("No hay suministros para mostrar.");
    } else {
      suministros.forEach((suministro) => {
        doc.fontSize(12).text(`Nombre: ${suministro.nombreSuministro}`);
        doc.text(`Descripción: ${suministro.descripcion}`);
        doc.text(`Precio: ${suministro.precio}`);
        doc.text(`Stock: ${suministro.stock}`);
        doc.text(`Fabricante: ${suministro.fabricante}`);
        doc.moveDown();
      });
    }
  } catch (error) {
    console.error("Error al generar el reporte de suministros:", error);
  }
}

// Función para generar el reporte de proveedores
async function generarReporteProveedores(doc) {
  try {
    const proveedores = await Proveedor.findAll(); // Obtener datos de proveedores desde la base de datos
    console.log("Proveedores:", proveedores);

    doc.fontSize(20).text("Reporte de Proveedores", { align: "center" });
    doc.moveDown();

    if (proveedores.length === 0) {
      doc.fontSize(12).text("No hay proveedores para mostrar.");
    } else {
      proveedores.forEach((proveedor) => {
        doc.fontSize(12).text(`Nombre: ${proveedor.nombreProveedor}`);
        doc.text(`Dirección: ${proveedor.direccion}`);
        doc.text(`Teléfono: ${proveedor.telefono}`);
        doc.text(`Correo: ${proveedor.email}`);
        doc.text(`Sitio Web: ${proveedor.sitioWeb}`);
        doc.moveDown();
      });
    }
  } catch (error) {
    console.error("Error al generar el reporte de proveedores:", error);
  }
}
