require('dotenv').config(); // Carrega o .env

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '1234',
    database: process.env.DB_NAME || 'eventdb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '1234',
    database: process.env.DB_NAME_TEST || 'eventdb_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '1234',
    database: process.env.DB_NAME_PROD || 'eventdb_prod',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  }
};
