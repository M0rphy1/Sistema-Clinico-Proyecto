///////////
const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./database/conexiones'); // Asegúrate de tener correctamente configurada la conexión a Sequelize

const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const historiaClinicaRoutes = require('./routes/historiaClinicaRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const suministroRoutes = require('./routes/suministroRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

// Configuración de la sesión
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Asegúrate de que `secure` esté configurado correctamente según tu entorno
}));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar las rutas de autenticación
app.use('/auth', authRoutes);

// Middleware para manejar las rutas de usuarios
app.use('/api/usuarios', usuarioRoutes);

// Middleware para manejar las rutas de mascotas
app.use('/api/mascotas', mascotaRoutes);

// Middleware para manejar las rutas de clientes
app.use('/api/clientes', clienteRoutes);

// Middleware para manejar las rutas de historia clínica
app.use('/api/historiasClinicas', historiaClinicaRoutes);

// Middleware para manejar las rutas de proveedores
app.use('/api/proveedores', proveedorRoutes);

// Middleware para manejar las rutas de suministros
app.use('/api/suministros', suministroRoutes);

// Middleware para manejar las rutas de medicamentos
app.use('/api/medicamentos', medicamentoRoutes);

// Middleware para manejar las rutas de inventarios
app.use('/api/inventarios', inventarioRoutes);

// Middleware para manejar las rutas de reportes
app.use('/api/reportes', reporteRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Sincronización de la base de datos y inicio del servidor
sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
