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
  const novoUsuario = await Usuario.create(req.body);
  res.status(201).json(novoUsuario);
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
