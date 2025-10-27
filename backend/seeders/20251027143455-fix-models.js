'use strict';
const bcrypt = require('bcryptjs'); 

module.exports = {
  async up (queryInterface, Sequelize) {
    const senhaHashOrg = await bcrypt.hash('senha123', 10);
    const senhaHashUser = await bcrypt.hash('senha123', 10);

    await queryInterface.bulkInsert('Usuarios', [
      {
        id: 1,
        nome: 'Ana',
        sobrenome: 'Organizadora',
        email: 'organizador@unievents.com',
        cpf: '111.111.111-11',
        senha: senhaHashOrg,
        tipouser: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nome: 'Bruno',
        sobrenome: 'Comprador',
        email: 'comprador@email.com',
        cpf: '222.222.222-22',
        senha: senhaHashUser,
        tipouser: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Eventos', [
      {
        id: 10,
        nomeevento: 'Palestra de IA',
        descricao: 'O futuro da Inteligência Artificial.',
        datainicio: '2025-11-20',
        datafim: '2025-11-20',
        horainicio: '19:00:00',
        horafim: '22:00:00',
        local: 'Auditório Principal',
        categoria: 'Tecnologia',
        status: 'Ativo',
        OrganizadorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        nomeevento: 'Show de Rock',
        descricao: 'Show da banda local "Os Devs".',
        datainicio: '2025-12-05',
        datafim: '2025-12-05',
        horainicio: '21:00:00',
        horafim: '23:30:00',
        local: 'Estádio Municipal',
        categoria: 'Música',
        status: 'Ativo',
        OrganizadorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Ingressos', [
      {
        id: 100,
        tipoingresso: 'Pista',
        preco: 50.00,
        quantidadeTotal: 200,
        quantidadeDisponivel: 200,
        EventoId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 101,
        tipoingresso: 'VIP',
        preco: 150.00,
        quantidadeTotal: 50,
        quantidadeDisponivel: 50,
        EventoId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 102,
        tipoingresso: 'Pista',
        preco: 80.00,
        quantidadeTotal: 1000,
        quantidadeDisponivel: 1000,
        EventoId: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Compras', [
      {
        id: 1000,
        UsuarioId: 2,
        IngressoId: 100,
        quantidadeadquirida: 2,
        valortotal: 100.00,
        formadepagamento: 'PIX',
        statuspagamento: 'Concluído',
        datacompra: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1001,
        UsuarioId: 2,
        IngressoId: 102,
        quantidadeadquirida: 1,
        valortotal: 80.00,
        formadepagamento: 'Cartão de Crédito',
        statuspagamento: 'Concluído',
        datacompra: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Compras', null, {});
    await queryInterface.bulkDelete('Ingressos', null, {});
    await queryInterface.bulkDelete('Eventos', null, {});
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};