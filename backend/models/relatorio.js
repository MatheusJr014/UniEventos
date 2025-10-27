// models/relatorio.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Relatorio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nomeRelatorio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipoRelatorio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDENTE'
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dataFim: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    caminhoArquivo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dadosSumario: {
      type: DataTypes.JSON, 
      allowNull: true
    },
    
    UsuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    },

    EventoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Eventos',
        key: 'id'
      },
      onDelete: 'SET NULL'
    }
  }, {
    timestamps: true
  });
};