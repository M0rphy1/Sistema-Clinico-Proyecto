const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Para el hash de contraseñas
const User = require('../models/usuario');


// Ruta para el registro (signup)
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si ya existe un usuario con ese nombre de usuario o correo electrónico
        let existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario o correo electrónico ya está en uso.' });
        }

        // Crear un nuevo usuario
        const newUser = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10) // Hashear la contraseña antes de guardarla
        });

        res.status(201).json({ message: 'Usuario creado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Ruta para el login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario por nombre de usuario
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta.' });
        }

        res.status(200).json({ message: 'Login exitoso.' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

module.exports = router;
