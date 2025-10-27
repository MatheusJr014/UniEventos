const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'AgendaTech',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'felipe',
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
const Relatorio = require('./relatorio')(sequelize);
Usuario.hasMany(Evento, { foreignKey: 'OrganizadorId' });
Evento.belongsTo(Usuario, { as: 'Organizador', foreignKey: 'OrganizadorId' });

Evento.hasMany(Ingresso, { foreignKey: 'EventoId' });
Ingresso.belongsTo(Evento, { foreignKey: 'EventoId' });


Ingresso.belongsTo(Usuario);
// Ingresso.belongsTo(Evento);
Usuario.hasMany(Ingresso);
// Evento.hasMany(Ingresso);


Usuario.hasMany(Compras);
Compras.belongsTo(Ingresso);








module.exports = { sequelize, Usuario, Evento, Ingresso, Compras, Avaliacoes };
