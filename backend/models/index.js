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

Usuario.hasMany(Evento, { foreignKey: 'OrganizadorId' });
Evento.belongsTo(Usuario, { as: 'Organizador', foreignKey: 'OrganizadorId' });

Evento.hasMany(Ingresso, { foreignKey: 'EventoId' });
Ingresso.belongsTo(Evento, { foreignKey: 'EventoId' });

Usuario.hasMany(Compras, { foreignKey: 'UsuarioId' });
Compras.belongsTo(Usuario, { foreignKey: 'UsuarioId' });

Ingresso.hasMany(Compras, { foreignKey: 'IngressoId' });
Compras.belongsTo(Ingresso, { foreignKey: 'IngressoId' });

Usuario.hasMany(Avaliacoes, { foreignKey: 'UsuarioId' });
Avaliacoes.belongsTo(Usuario, { foreignKey: 'UsuarioId' });

Evento.hasMany(Avaliacoes, { foreignKey: 'EventoId' });
Avaliacoes.belongsTo(Evento, { foreignKey: 'EventoId' });

module.exports = { sequelize, Usuario, Evento, Ingresso, Compras, Avaliacoes };