const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Compras', {
    //ID USUARIO FK 
    //ID INGRESSO FK 
    quantidadeadquirida: DataTypes.INTEGER,
    valortotal: DataTypes.DECIMAL, 
    formadepagamento: DataTypes.STRING,
    statuspagamento: DataTypes.STRING,
    datacompra: DataTypes.DATE 
  })
}
