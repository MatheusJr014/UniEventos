import express from 'express';
import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await db.User.create({ name, email, password });
    res.json({ message: 'Usuário criado com sucesso', user });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao registrar', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Senha incorreta' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});

export default router;
