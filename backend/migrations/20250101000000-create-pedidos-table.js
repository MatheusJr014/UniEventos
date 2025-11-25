'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UsuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      EventoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Eventos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      IngressoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ingressos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      preferenceId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      paymentId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      valorTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      statusPagamento: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'aguarde'
      },
      checkoutUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dadosPagamento: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pedidos');
  }
};

