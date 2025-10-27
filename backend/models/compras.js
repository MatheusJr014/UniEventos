const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Compras', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // ID USUARIO FK
    UsuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    },
    // ID INGRESSO FK
    IngressoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ingressos',
        key: 'id'
      }
    },
    quantidadeadquirida: DataTypes.INTEGER,
    valortotal: DataTypes.DECIMAL, 
    formadepagamento: DataTypes.STRING,
    statuspagamento: DataTypes.STRING,
    datacompra: DataTypes.DATE 
  }, {
    timestamps: true
  });
}