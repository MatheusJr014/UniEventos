const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Ingresso', {
    //ID DO EVENTO (PK DO EVENTO)
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipoingresso: DataTypes.STRING,
    preco: DataTypes.DECIMAL, 
    quantidadeTotal: DataTypes.INTEGER, 
    quantidadeDisponivel: DataTypes.INTEGER,
    EventoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Eventos',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
    
  });
};
