'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Ingressos', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE "Ingressos" ADD PRIMARY KEY ("id");
    `);
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.sequelize.query(`
      ALTER TABLE "Ingressos" DROP CONSTRAINT "Ingressos_pkey";
    `);
    await queryInterface.removeColumn('Ingressos', 'id');
  }
};
