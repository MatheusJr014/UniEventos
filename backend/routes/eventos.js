const express = require('express');
const router = express.Router();
const { Evento } = require('../models');

router.get('/', async (req, res) => res.json(await Evento.findAll()));
router.get('/:id', async (req, res) => res.json(await Evento.findByPk(req.params.id)));
router.post('/', async (req, res) => res.json(await Evento.create(req.body)));
router.put('/:id', async (req, res) => {
  await Evento.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Atualizado' });
});
router.delete('/:id', async (req, res) => {
  await Evento.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Removido' });
});

module.exports = router;
