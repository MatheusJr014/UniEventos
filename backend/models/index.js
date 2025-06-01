const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'eventdb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || '1234',
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
const Compras = require('./compras')(sequelize); 
const Avaliacoes = require('./avaliacoes')(sequelize); 



// // Usuario -> Evento 
// Usuario.belongsToMany(Evento, { through: Ingresso });
// Evento.belongsToMany(Usuario, { through: Ingresso });
// Removido devido ao motivo que isso acima não criava a pk pro ingresso que era algo necessário 

Ingresso.belongsTo(Usuario);
Ingresso.belongsTo(Evento);
Usuario.hasMany(Ingresso);
Evento.hasMany(Ingresso);


Usuario.hasMany(Compras);
Compras.belongsTo(Ingresso);








module.exports = { sequelize, Usuario, Evento, Ingresso, Compras, Avaliacoes };
