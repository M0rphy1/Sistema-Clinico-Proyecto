const pool = require('../config/config');

const createUser = async (user) => {
  const { nombreUsuario, correo, contrasena } = user;
  const result = await pool.query(
    `INSERT INTO public."Usuario" ("nombreUsuario", correo, contrasena, estado)
     VALUES ($1, $2, $3, true) RETURNING *`,
    [nombreUsuario, correo, contrasena]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM public."Usuario" WHERE correo = $1`,
    [email]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
