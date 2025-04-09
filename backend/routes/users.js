import express from 'express';
import db from '../models/index.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const user = await db.User.create(req.body);
  res.json(user);
});

router.get('/', async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
});

export default router;
