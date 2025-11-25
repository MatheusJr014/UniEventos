const { Usuario } = require('../models');

exports.getAllUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

exports.getUsuarioById = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id, {
    attributes: { exclude: ['senha'] }
  });
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
  try {
    // Campos permitidos para atualização (excluindo senha e campos sensíveis)
    const allowedFields = [
      'nome', 'sobrenome', 'email', 'cpf', 'telefone', 
      'datanascimento', 'genero', 'cidade', 'estado', 'cep', 'endereco'
    ];
    
    // Filtrar apenas campos permitidos
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });
    
    // Não permitir atualizar senha diretamente (deve ter endpoint específico)
    if (req.body.senha) {
      return res.status(400).json({ error: 'Use o endpoint de alteração de senha para atualizar a senha.' });
    }
    
    const [updated] = await Usuario.update(updateData, { 
      where: { id: req.params.id }
    });
    
    if (updated) {
      const usuarioAtualizado = await Usuario.findByPk(req.params.id, {
        attributes: { exclude: ['senha'] }
      });
      return res.json(usuarioAtualizado);
    }
    res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email ou CPF já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

exports.deleteUsuario = async (req, res) => {
  const deleted = await Usuario.destroy({ where: { id: req.params.id } });
  if (deleted) return res.json({ message: 'Usuário removido' });
  res.status(404).json({ error: 'Usuário não encontrado' });
};
