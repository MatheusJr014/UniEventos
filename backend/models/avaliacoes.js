const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Avaliacoes', {
    //ID USUARIO FK 
    //ID EVENTO FK 
    nota: DataTypes.INTEGER,
    comentario: DataTypes.TEXT,
    dataavaliacao: DataTypes.DATE 
  })
}