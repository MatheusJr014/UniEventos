const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING, 
    cpf: DataTypes.INTEGER, 
    senha: DataTypes.STRING, 
    tipouser: DataTypes.BOOLEAN, 
    datacadastro: DataTypes.TIME,
  });
};
