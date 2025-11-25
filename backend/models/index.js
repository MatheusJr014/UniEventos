const { Sequelize } = require('sequelize');
let sequelize;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize('sqlite::memory:', {
    logging: false
  });
} else {
  sequelize = new Sequelize(
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
}

const Usuario = require('./usuario')(sequelize);
const Evento = require('./evento')(sequelize);
const Ingresso = require('./ingresso')(sequelize);
const Compras = require('./compras')(sequelize); 
const Avaliacoes = require('./avaliacoes')(sequelize); 
const Relatorio = require('./relatorio')(sequelize);
const Pedido = require('./pedido')(sequelize);
Usuario.hasMany(Evento, { foreignKey: 'OrganizadorId' });
Evento.belongsTo(Usuario, { as: 'Organizador', foreignKey: 'OrganizadorId' });

Evento.hasMany(Ingresso, { foreignKey: 'EventoId' });
Ingresso.belongsTo(Evento, { foreignKey: 'EventoId', as: 'evento' });


// Ingresso não tem UsuarioId diretamente, apenas EventoId
// O relacionamento com Usuario é através do Evento


Usuario.hasMany(Compras);
Compras.belongsTo(Ingresso);

// Relacionamentos de Pedido
Usuario.hasMany(Pedido, { foreignKey: 'UsuarioId' });
Pedido.belongsTo(Usuario, { foreignKey: 'UsuarioId', as: 'usuario' });
Evento.hasMany(Pedido, { foreignKey: 'EventoId' });
Pedido.belongsTo(Evento, { foreignKey: 'EventoId', as: 'evento' });
Ingresso.hasMany(Pedido, { foreignKey: 'IngressoId' });
Pedido.belongsTo(Ingresso, { foreignKey: 'IngressoId', as: 'ingresso' });








module.exports = { sequelize, Usuario, Evento, Ingresso, Compras, Avaliacoes, Pedido };
