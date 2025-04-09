import express from 'express';
import db from '../models/index.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const registration = await db.Registration.create(req.body);
  res.json(registration);
});

router.get('/', async (req, res) => {
  const registrations = await db.Registration.findAll({
    include: [db.User, db.Event]
  });
  res.json(registrations);
});

export default router;
