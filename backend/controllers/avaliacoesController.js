const { Avaliacoes } = require('../models'); 

exports.getAllAvaliacoes = async (req,res) => {
    const avalicoes = await Avaliacoes.findAll(); 
    res.json(avalicoes); 
}; 


