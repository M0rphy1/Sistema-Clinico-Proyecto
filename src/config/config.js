const dotenv = require('dotenv');

dotenv.config();
  module.exports = {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: false,
    },
  };

///MYSQL Y POSTGRESQL
// const dotenv = require('dotenv');

// dotenv.config();

// module.exports = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT, // 'postgres' o 'mysql'
//     logging: false,
//   },
// };