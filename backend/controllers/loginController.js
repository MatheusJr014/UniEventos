// Arquivo: loginController.js
const { Usuario } = require('../models'); 
const bcrypt = require('bcryptjs'); // Você vai precisar dele aqui
const jwt = require('jsonwebtoken'); 
const JWT_SECRET = process.env.JWT_SECRET;

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

    const isMatch = await usuario.validPassword(senha);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipouser, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
};