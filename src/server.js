const express = require('express');
const sequelize = require('./database/conexiones');  // Asegúrate de importar sequelize
const Usuario = require('./models/usuario');  // Importar el modelo Usuario
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

