const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING
  });
};
