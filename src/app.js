const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

// Middleware para manejar las rutas de usuarios
app.use('/api/usuarios', usuarioRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

