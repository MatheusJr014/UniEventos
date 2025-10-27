const { Relatorio, Usuario, Evento, Compras, Ingresso, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.createRelatorio = async (req, res) => {
    try {
        const UsuarioId = req.user.id; 
        const { nomeRelatorio, tipoRelatorio, dataInicio, dataFim, EventoId } = req.body;

        if (!nomeRelatorio || !tipoRelatorio) {
            return res.status(400).json({ error: 'Nome e Tipo do relatório são obrigatórios.' });
        }

        let dadosSumario = {};
        let status = 'CONCLUIDO';

        if (tipoRelatorio === 'FINANCEIRO_EVENTO') {
            if (!EventoId || !dataInicio || !dataFim) {
                return res.status(400).json({ error: 'Para este tipo, EventoId, dataInicio e dataFim são obrigatórios.' });
            }
            
            const compras = await Compras.findAll({
                where: {
                    statuspagamento: 'Concluído',
                    datacompra: {
                        [Op.between]: [new Date(dataInicio), new Date(dataFim)]
                    }
                },
                include: {
                    model: Ingresso,
                    required: true,
                    attributes: [],
                    where: { EventoId: EventoId }
                }
            });

            const totalArrecadado = compras.reduce((acc, compra) => acc + parseFloat(compra.valortotal), 0);
            const ingressosVendidos = compras.reduce((acc, compra) => acc + compra.quantidadeadquirida, 0);

            dadosSumario = {
                totalArrecadado,
                ingressosVendidos,
                totalTransacoes: compras.length,
                periodo: `${dataInicio} a ${dataFim}`,
                EventoId: EventoId
            };
        }

        else {
            return res.status(400).json({ error: 'Tipo de relatório desconhecido.' });
        }

        const relatorio = await Relatorio.create({
            nomeRelatorio,
            tipoRelatorio,
            status,
            dataInicio,
            dataFim,
            dadosSumario,
            caminhoArquivo: null,
            UsuarioId,
            EventoId: EventoId || null
        });

        res.status(201).json(relatorio);

    } catch (error) {
        console.error("Erro ao gerar relatório:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

exports.getAllRelatorios = async (req, res) => {
    try {
        
        const relatorios = await Relatorio.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                { 
                    model: Usuario, 
                    attributes: ['id', 'nome', 'email']
                },
                { 
                    model: Evento, 
                    attributes: ['id', 'nomeevento'] 
                }
            ]
        });
        res.json(relatorios);
    } catch (error) {
        console.error("Erro ao listar relatórios:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

exports.getRelatorioById = async (req, res) => {
    try {
        const { id } = req.params;
        const relatorio = await Relatorio.findByPk(id, {
            include: [
                { model: Usuario, attributes: ['id', 'nome', 'email'] },
                { model: Evento, attributes: ['id', 'nomeevento'] }
            ]
        });

        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }

        res.json(relatorio);
    } catch (error) {
        console.error("Erro ao buscar relatório:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

exports.deleteRelatorio = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Relatorio.destroy({ where: { id: id } });
        
        if (deleted) {
            return res.json({ message: 'Relatório removido' });
        }
        return res.status(404).json({ error: 'Relatório não encontrado' });
    } catch (error) {
        console.error("Erro ao deletar relatório:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};