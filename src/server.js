// const express = require('express');
// const sequelize = require('./database/conexiones'); // asegúrate de tener la ruta correcta
// const Usuario = require('./models/usuario');
// const Rol = require('./models/rol');
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 4000;

// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }).catch(error => {
//   console.error('Unable to connect to the database:', error);
// });
////////////////////////////
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/conexiones'); // Asegúrate de tener la ruta correcta
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/index'); // Importar tus rutas principales

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas principales de la API
app.use('/api', apiRoutes);

// Conectar a la base de datos y sincronizar modelos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
    //return sequelize.sync(); // Sincronizar modelos
  })
  .then(() => {
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
///////////
// Configurar Express para usar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Definir una ruta de ejemplo y renderizar una vista EJS
app.get('/', (req, res) => {
  res.render('index', { title: 'Clínica Veterinaria', message: 'Bienvenido a nuestra clínica veterinaria!' });
});
////////////


module.exports = app;
