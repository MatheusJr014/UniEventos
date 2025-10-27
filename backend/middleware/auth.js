const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.id, {
        attributes: { exclude: ['senha'] }
    });

    if (!usuario) {
        return res.status(401).json({ error: 'Usuário do token não encontrado.' });
    }

    req.user = usuario; 

    next(); 
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};