const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa el archivo de rutas de autenticación
const path = require('path'); // Importar el módulo 'path'

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

// Middleware para manejar las rutas de usuarios
app.use('/api/usuarios', usuarioRoutes);

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar las rutas de autenticación
app.use('/auth', authRoutes); // Aquí asegúrate de tener '/auth' como prefijo para todas las rutas de autenticación

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

