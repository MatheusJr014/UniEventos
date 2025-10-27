const { Compras, Ingresso, Usuario, sequelize } = require('../models');

exports.getAllCompras = async (req, res) => {
    const compras = await Compras.findAll();
    res.json(compras);
}

exports.getComprasById = async (req, res) => {
    const compras = await Compras.findByPk(req.params.id);
    if (!compras) return res.status(404).json({ error: 'Compra não encontrada' });
    res.json(compras)
}

exports.createCompras = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { ingressoId, quantidadeadquirida } = req.body;
        const usuarioId = req.user.id;

        const ingresso = await Ingresso.findByPk(ingressoId, { transaction: t, lock: t.LOCK.UPDATE });

        if (!ingresso) {
            await t.rollback();
            return res.status(404).json({ message: 'Ingresso não encontrado' });
        }

        if (ingresso.quantidadeDisponivel < quantidadeadquirida) {
            await t.rollback();
            return res.status(400).json({ message: 'Estoque insuficiente' });
        }

        const valortotal = ingresso.preco * quantidadeadquirida;
        const novaQuantidade = ingresso.quantidadeDisponivel - quantidadeadquirida;

        await ingresso.update({
            quantidadeDisponivel: novaQuantidade
        }, { transaction: t });

        const { formadepagamento } = req.body;
        const compra = await Compras.create({
            UsuarioId: usuarioId,
            IngressoId: ingressoId,
            quantidadeadquirida: quantidadeadquirida,
            valortotal: valortotal,
            formadepagamento: formadepagamento || 'Não Definido',
            statuspagamento: 'Pendente',
            datacompra: new Date(),
        }, { transaction: t });

        await t.commit();
        res.status(201).json(compra);

    } catch (error) {
        await t.rollback();
        console.error("Erro ao criar compra:", error);
        res.status(500).json({ message: 'Erro ao processar a compra' });
    }
};

exports.deleteCompra = async (req, res) => {
    const deleted = await Compras.destroy({ where: { id: req.params.id } });
    if (deleted) return res.json({ message: 'Compra removida' })
    res.status(404).json({ error: 'Compra não encontrada' });
}

exports.updateStatusPagamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { statuspagamento } = req.body;

    if (!statuspagamento) {
      return res.status(400).json({ error: 'O campo statuspagamento é obrigatório.' });
    }
    
    const [updated] = await Compras.update({ statuspagamento }, {
      where: { id: id }
    });

    if (updated) {
      const compraAtualizada = await Compras.findByPk(id);
      return res.json(compraAtualizada);
    }

    res.status(404).json({ error: 'Compra não encontrada' });

  } catch (error) {
    console.error("Erro ao atualizar status da compra:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};
