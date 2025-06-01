const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING, 
    cpf: DataTypes.STRING, 
    senha: DataTypes.STRING, 
    tipouser: DataTypes.BOOLEAN, 
  });
};
