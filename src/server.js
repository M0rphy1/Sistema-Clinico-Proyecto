const express = require('express');
const sequelize = require('./database/conexiones'); // asegúrate de tener la ruta correcta
const Usuario = require('./models/usuario');
const Rol = require('./models/rol');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
