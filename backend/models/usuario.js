const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }, 
    cpf: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true
    }, 
    senha: DataTypes.STRING, 
    tipouser: DataTypes.BOOLEAN, 
  }, {
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.senha) {
          const salt = await bcrypt.genSalt(10);
          usuario.senha = await bcrypt.hash(usuario.senha, salt);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('senha')) {
          const salt = await bcrypt.genSalt(10);
          usuario.senha = await bcrypt.hash(usuario.senha, salt);
        }
      }
    }
  });

  Usuario.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.senha);
  };

  return Usuario;
};