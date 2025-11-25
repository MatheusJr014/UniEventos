'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'telefone', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Usuarios', 'datanascimento', {
      type: Sequelize.DATE,
      allowNull: true
    });
    
    await queryInterface.addColumn('Usuarios', 'genero', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Usuarios', 'cidade', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Usuarios', 'estado', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Usuarios', 'cep', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Usuarios', 'endereco', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'telefone');
    await queryInterface.removeColumn('Usuarios', 'datanascimento');
    await queryInterface.removeColumn('Usuarios', 'genero');
    await queryInterface.removeColumn('Usuarios', 'cidade');
    await queryInterface.removeColumn('Usuarios', 'estado');
    await queryInterface.removeColumn('Usuarios', 'cep');
    await queryInterface.removeColumn('Usuarios', 'endereco');
  }
};

