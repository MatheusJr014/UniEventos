const express = require('express');
const router = express.Router();
const { Usuario, Evento, Ingresso } = require('../models');

router.get('/', async (req, res) => {
  const ingressos = await Ingresso.findAll({
    include: [Usuario, Evento]
  });
  res.json(ingressos);
});

router.post('/', async (req, res) => {
  const { usuarioId, eventoId } = req.body;
  const usuario = await Usuario.findByPk(usuarioId);
  const evento = await Evento.findByPk(eventoId);
  if (usuario && evento) {
    await usuario.addEvento(evento);
    res.json({ message: 'Ingresso criado' });
  } else {
    res.status(404).json({ message: 'Usuário ou evento não encontrado' });
  }
});

router.delete('/', async (req, res) => {
  const { usuarioId, eventoId } = req.body;
  await Ingresso.destroy({ where: { UsuarioId: usuarioId, EventoId: eventoId } });
  res.json({ message: 'Ingresso removido' });
});

module.exports = router;
