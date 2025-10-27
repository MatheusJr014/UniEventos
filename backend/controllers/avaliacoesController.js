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
  try {
    const { id } = req.params;
    const UsuarioId = req.user.id;

    const deleted = await Avaliacoes.destroy({ 
      where: {
        id: id,
        UsuarioId: UsuarioId
      }
    });

    if (deleted) {
      return res.status(200).json({ message: 'Avaliação Removida' }); 
    }
    
    const avaliacao = await Avaliacoes.findByPk(id);
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    } else {
      return res.status(403).json({ error: 'Acesso negado. Você não pode deletar esta avaliação.' });
    }

  } catch (error) {
    console.error("Erro ao deletar avaliação:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};

exports.updateAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const UsuarioId = req.user.id;
    const { nota, comentario } = req.body;

    const [updated] = await Avaliacoes.update(
      { nota, comentario },
      { 
        where: { 
          id: id, 
          UsuarioId: UsuarioId
        } 
      }
    );

    if (updated) {
      const avaliacaoAtualizada = await Avaliacoes.findByPk(id);
      return res.status(200).json(avaliacaoAtualizada);
    }

    const avaliacao = await Avaliacoes.findByPk(id);
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    } else {
      return res.status(403).json({ error: 'Acesso negado. Você não pode editar esta avaliação.' });
    }

  } catch (error) {
    console.error("Erro ao atualizar avaliação:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};



