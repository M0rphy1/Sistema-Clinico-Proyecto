const Empleado = require('../models/empleado');

exports.crearEmpleado = async (req, res) => {
  const { nombre, apellido, telefono, direccion, correo, idRol } = req.body;
  try {
    const nuevoEmpleado = await Empleado.create({
      nombre,
      apellido,
      telefono,
      direccion,
      correo,
      idRol
    });
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

exports.obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};


// // Obtener un empleado por ID
// exports.getEmpleadoById = async (req, res) => {
//   try {
//     const empleado = await Empleado.findByPk(req.params.id);
//     if (empleado) {
//       res.status(200).json(empleado);
//     } else {
//       res.status(404).json({ message: 'Empleado no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Actualizar un empleado por ID
// exports.updateEmpleado = async (req, res) => {
//   try {
//     const [updated] = await Empleado.update(req.body, {
//       where: { idEmpleado: req.params.id } // Asegúrate de usar 'idEmpleado' correctamente
//     });
//     if (updated) {
//       const updatedEmpleado = await Empleado.findByPk(req.params.id);
//       res.status(200).json(updatedEmpleado);
//     } else {
//       res.status(404).json({ message: 'Empleado no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Eliminar un empleado por ID
// exports.deleteEmpleado = async (req, res) => {
//   try {
//     const deleted = await Empleado.destroy({
//       where: { idEmpleado: req.params.id } // Asegúrate de usar 'idEmpleado' correctamente
//     });
//     if (deleted) {
//       res.status(204).json({ message: 'Empleado eliminado' });
//     } else {
//       res.status(404).json({ message: 'Empleado no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
