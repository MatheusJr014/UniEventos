const { Avaliacoes } = require('../models'); 

exports.getAllAvaliacoes = async (req,res) => {
    const avalicoes = await Avaliacoes.findAll(); 
    res.json(avalicoes); 
}; 


exports.getAvaliacaoById = async (req,res)=> { 
    const avaliacao = await Avaliacoes.findByPk(req.params.id); 
    if(!avaliacao) return res.status(404).json({ error: 'Avalição não encontrada'}); 
    res.json(avaliacao); 
}

exports.createAvaliacao = async (req, res) => { 
    const avaliacao = await Avaliacoes.create(req.body); 
    res.status(201).json(avaliacao); 
}; 

exports.deleteAvaliacao = async (req,res) => {
    const deleted = await Avaliacoes.destroy({ where: {id: req.params.id}});
    if(deleted) return res.json({ message: 'Avaliação Removida' }); 
    res.status(404).json({ error: 'Avaliação não encontrada '}); 
}


// Falta o put


