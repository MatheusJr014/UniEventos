const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
  return sequelize.define('Ingresso', {
    //ID DO EVENTO (PK DO EVENTO)
    tipoingresso: DataTypes.STRING,
    preco: DataTypes.DECIMAL, 
    quantidadeTotal: DataTypes.INTEGER, 
    quantidadeDisponivel: DataTypes.INTEGER
  });
};
