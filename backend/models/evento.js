const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Evento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nomeevento: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    datainicio: DataTypes.DATEONLY,
    datafim: DataTypes.DATEONLY,
    horainicio: DataTypes.TIME,
    horafim: DataTypes.TIME,
    local: DataTypes.STRING,
    imagemevento: DataTypes.STRING, 
    categoria: DataTypes.STRING,
    quantidadeingresso: DataTypes.INTEGER,
    //OrganizadoID(UsuarioID PK ) definir no indexJS 
    status: DataTypes.STRING,
    OrganizadorId: DataTypes.INTEGER
  });
};
