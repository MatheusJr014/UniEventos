const { sequelize, Usuario, Evento } = require('./models');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const usuarios = await Usuario.bulkCreate([
      { nome: 'Alice', email: 'alice@email.com' },
      { nome: 'Bob', email: 'bob@email.com' }
    ]);

    const eventos = await Evento.bulkCreate([
      { nome: 'Show do Coldplay', data: new Date('2025-05-10'), local: 'Estádio A' },
      { nome: 'Festa Tech', data: new Date('2025-06-20'), local: 'Clube B' }
    ]);

    await usuarios[0].addEvento(eventos[0]);
    await usuarios[1].addEvento(eventos[1]);

    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    await sequelize.close();
  }
}

seed();
