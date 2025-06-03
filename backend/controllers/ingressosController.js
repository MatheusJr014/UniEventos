const { Ingresso, Evento, Usuario } = require("../models");

exports.getAllIngresso = async (req, res) => {
  try {
    const { EventoId } = req.query;

    const where = {};
    if (EventoId) {
      where.EventoId = EventoId;
    }

    const ingressos = await Ingresso.findAll({ where });
    res.json(ingressos);
  } catch (error) {
    console.error("Erro ao buscar ingressos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.getIngressoById = async (req, res) => {
  const ingresso = await Ingresso.findByPk(req.params.id);
  if (!ingresso)
    return res.status(404).json({ error: "Ingresso não encontrado" });
  res.json(ingresso);
};

exports.createIngresso = async (req, res) => {
  const {
    usuarioId,
    eventoId,
    tipoingresso,
    preco,
    quantidadeTotal,
    quantidadeDisponivel,
  } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);
    const evento = await Evento.findByPk(eventoId);

    if (!usuario || !evento) {
      return res
        .status(404)
        .json({ message: "Usuario ou evento não encontrado" });
    }

    const ingresso = await Ingresso.create({
      UsuarioId: usuarioId,
      EventoId: eventoId,
      tipoingresso: tipoingresso || null,
      preco: preco || null,
      quantidadeTotal: quantidadeTotal || null,
      quantidadeDisponivel: quantidadeDisponivel || null,
    });

    res.status(201).json(ingresso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar ingresso" });
  }
};

exports.deleteIngresso = async (req, res) => {
  const deleted = await Ingresso.destroy({ where: { id: req.params.id } });
  if (deleted) return res.json({ message: "Ingresso removido" });
  res.status(404).json({ error: "Ingresso não encontrado" });
};
