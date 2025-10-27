const { Usuario } = require('../models');

exports.getAllUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

exports.getUsuarioById = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(usuario);
};

exports.createUsuario = async (req, res) => {
  try {
    const { nome, sobrenome, email, cpf, senha } = req.body;

    const tipouser = false; 

    const novoUsuario = await Usuario.create({
      nome,
      sobrenome,
      email,
      cpf,
      senha,
      tipouser 
    });
    
    const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();
    res.status(201).json(usuarioSemSenha);

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email ou CPF já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};

exports.updateUsuario = async (req, res) => {
  const [updated] = await Usuario.update(req.body, { where: { id: req.params.id } });
  if (updated) {
    const usuarioAtualizado = await Usuario.findByPk(req.params.id);
    return res.json(usuarioAtualizado);
  }
  res.status(404).json({ error: 'Usuário não encontrado' });
};

exports.deleteUsuario = async (req, res) => {
  const deleted = await Usuario.destroy({ where: { id: req.params.id } });
  if (deleted) return res.json({ message: 'Usuário removido' });
  res.status(404).json({ error: 'Usuário não encontrado' });
};
