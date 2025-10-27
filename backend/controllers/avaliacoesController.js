const { Avaliacoes } = require('../models'); 

exports.getAllAvaliacoes = async (req,res) => {
    const avalicoes = await Avaliacoes.findAll(); 
    res.json(avalicoes); 
}; 

exports.getAvaliacaoById = async (req,res)=> { 
    const avaliacao = await Avaliacoes.findByPk(req.params.id); 
    if(!avaliacao) return res.status(404).json({ error: 'Avalição não encontrada'}); 
    res.json(avaliacao); 
};

exports.createAvaliacao = async (req, res) => { 
  try {
    const UsuarioId = req.user.id; 
    const { EventoId, nota, comentario } = req.body;

    const avaliacao = await Avaliacoes.create({
      UsuarioId,
      EventoId,
      nota,
      comentario,
      dataavaliacao: new Date()
    });
    res.status(201).json(avaliacao);
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};

exports.deleteAvaliacao = async (req,res) => {
    const deleted = await Avaliacoes.destroy({ where: {id: req.params.id}});
    if(deleted) return res.json({ message: 'Avaliação Removida' }); 
    res.status(404).json({ error: 'Avaliação não encontrada '}); 
};

exports.updateAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const UsuarioId = req.user.id;
    const { nota, comentario } = req.body;

    const avaliacao = await Avaliacoes.findByPk(id);

    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    if (avaliacao.UsuarioId !== UsuarioId) {
      return res.status(403).json({ error: 'Acesso negado. Você não pode editar esta avaliação.' });
    }

    avaliacao.nota = nota ?? avaliacao.nota;
    avaliacao.comentario = comentario ?? avaliacao.comentario;
    
    await avaliacao.save();
    
    res.json(avaliacao);

  } catch (error) {
    console.error("Erro ao atualizar avaliação:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};



