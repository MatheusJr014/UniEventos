import express from 'express';
import db from '../models/index.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const { title, description, date } = req.body;
  const event = await db.Event.create({ title, description, date, UserId: req.user.id });
  res.json(event);
});

router.get('/', async (req, res) => {
  const events = await db.Event.findAll({ include: db.User });
  res.json(events);
});

export default router;
