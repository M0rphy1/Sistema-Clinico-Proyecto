// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/login', authController.login);
// router.post('/register', authController.register);
// router.post('/forgot-password', authController.forgotPassword);
// router.put('/reset-password/:token', authController.resetPassword);

// Rutas para registro e inicio de sesión
// router.post('/registro', authController.registrarUsuario);
// router.post('/inicio-sesion', authController.iniciarSesion);


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/config'); // Ajusta la ruta según tu estructura de proyecto

const router = express.Router();

// Generar token JWT
const generateToken = (idUsuario) => {
  return jwt.sign({ idUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { idEmpleado, nombreUsuario, correo, contrasena } = req.body;

  try {
    // Verificar si el usuario ya existe
    console.log('Verificando si el usuario ya existe...');
    const userExist = await pool.query('SELECT * FROM "Usuario" WHERE "nombreUsuario" = $1 OR correo = $2', [nombreUsuario, correo]);

    if (userExist.rows.length > 0) {
      console.log('El usuario ya existe.');
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    console.log('Encriptando la contraseña...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Insertar el nuevo usuario en la base de datos
    console.log('Insertando el nuevo usuario en la base de datos...');
    const newUser = await pool.query(
      'INSERT INTO "Usuario" ("idEmpleado", "nombreUsuario", correo, contrasena, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [idEmpleado, nombreUsuario, correo, hashedPassword, true]
    );

    // Generar token JWT
    console.log('Generando token JWT...');
    const token = generateToken(newUser.rows[0].idUsuario);

    res.json({ token });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

module.exports = router;
