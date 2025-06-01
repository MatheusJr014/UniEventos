const { Usuario } = require('../models'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const JWT_SECRET = '8d92dd75721cb55058295ea76be00b53b2c9100b79332e39706facb0d796f0c8'

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    if (senha !== usuario.senha) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipouser, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });

  } catch (error) {
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
};
