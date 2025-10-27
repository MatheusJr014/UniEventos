const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Avaliacoes', {
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
    // ID EVENTO FK
    EventoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Eventos',
        key: 'id'
      }
    },
    nota: DataTypes.INTEGER,
    comentario: DataTypes.TEXT,
    dataavaliacao: DataTypes.DATE 
  }, {
    timestamps: true
  });
}