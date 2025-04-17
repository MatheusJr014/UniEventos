const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Evento', {
    nome: DataTypes.STRING,
    data: DataTypes.DATE,
    local: DataTypes.STRING
  });
};
