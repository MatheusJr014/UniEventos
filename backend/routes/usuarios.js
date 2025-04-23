const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');

router.get('/', async (req, res) => res.json(await Usuario.findAll()));
router.get('/:id', async (req, res) => res.json(await Usuario.findByPk(req.params.id)));
router.post('/', async (req, res) => res.json(await Usuario.create(req.body)));
router.put('/:id', async (req, res) => {
  await Usuario.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Atualizado' });
});
router.delete('/:id', async (req, res) => {
  await Usuario.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Removido' });
});

module.exports = router;
