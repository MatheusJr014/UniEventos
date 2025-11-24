const { Ingresso, Evento, Usuario } = require("../models");

exports.getAllIngresso = async (req, res) => {
  try {
    const { EventoId, OrganizadorId } = req.query;

    const where = {};
    const include = [];

    // Se OrganizadorId for fornecido, filtrar ingressos dos eventos desse organizador
    if (OrganizadorId) {
      include.push({
        model: Evento,
        as: 'evento',
        where: { OrganizadorId: OrganizadorId },
        attributes: ['id', 'nomeevento', 'OrganizadorId']
      });
    }

    // Se EventoId for fornecido, filtrar por evento específico
    if (EventoId) {
      where.EventoId = EventoId;
    }

    const options = { where };
    if (include.length > 0) {
      options.include = include;
    }

    const ingressos = await Ingresso.findAll(options);
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

    // Validar que o evento pertence ao organizador
    if (evento.OrganizadorId !== parseInt(usuarioId)) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para criar ingressos para este evento" });
    }

    const ingresso = await Ingresso.create({
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
  try {
    const ingresso = await Ingresso.findByPk(req.params.id, {
      include: [{
        model: Evento,
        as: 'evento',
        attributes: ['id', 'OrganizadorId']
      }]
    });

    if (!ingresso) {
      return res.status(404).json({ error: "Ingresso não encontrado" });
    }

    // Se OrganizadorId for fornecido na query, validar permissão
    const { OrganizadorId } = req.query;
    if (OrganizadorId && ingresso.evento && ingresso.evento.OrganizadorId !== parseInt(OrganizadorId)) {
      return res.status(403).json({ message: "Você não tem permissão para excluir este ingresso" });
    }

    await ingresso.destroy();
    res.json({ message: "Ingresso removido" });
  } catch (error) {
    console.error("Erro ao excluir ingresso:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
