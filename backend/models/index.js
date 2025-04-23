const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'eventdb',
  process.env.DB_USER || 'user',
  process.env.DB_PASS || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

const Usuario = require('./usuario')(sequelize);
const Evento = require('./evento')(sequelize);
const Ingresso = require('./ingresso')(sequelize);

Usuario.belongsToMany(Evento, { through: Ingresso });
Evento.belongsToMany(Usuario, { through: Ingresso });

Ingresso.belongsTo(Usuario);
Ingresso.belongsTo(Evento);
Usuario.hasMany(Ingresso);
Evento.hasMany(Ingresso);

module.exports = { sequelize, Usuario, Evento, Ingresso };
