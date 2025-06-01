const { Compras, Ingresso, Usuario } = require('../models');

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
    const { usuarioId, ingressoId, quantidadeadquirida, valortotal, formadepagamento, statuspagamento, datacompra } = req.body;
    const usuario = await Usuario.findByPk(usuarioId);
    const ingresso = await Ingresso.findByPk(ingressoId);

    if (usuario && ingresso) {
        await Compras.create({
            UsuarioId: usuario.id,
            IngressoId: ingresso.id,
            quantidadeadquirida: quantidadeadquirida || null,
            valortotal: valortotal || null,
            formadepagamento: formadepagamento || null,
            statuspagamento: statuspagamento || null,
            datacompra: datacompra || null,
        });
        res.json({ message: 'Compra Criada' });
    } else {
        res.status(404).json({ message: 'Usuario ou ingresso não encontrados' });
    }
};

exports.deleteCompra = async (req, res) => {
    const deleted = await Compras.destroy({ where: { id: req.params.id } });
    if (deleted) return res.json({ message: 'Compra removida' })
    res.status(404).json({ error: 'Compra não encontrada' });
}



// Falta o PUT
