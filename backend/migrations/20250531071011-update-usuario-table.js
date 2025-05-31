'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'datacadastro');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'datacadastro', {
      type: Sequelize.TIME,
      allowNull: true, // Ajuste se necessário
    });
  }
};
