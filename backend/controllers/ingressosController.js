const { Ingresso, Evento, Usuario } = require('../models'); 

exports.getAllIngresso = async (req, res)=> {
    const ingressos = await Ingresso.findAll(); 
    res.json(ingressos); 
}; 

exports.getIngressoById = async (req, res)=> {
    const ingresso = await Ingresso.findByPk(req.params.id); 
    if (!ingresso) return res.status(404).json({ error: 'Ingresso não encontrado' }); 
    res.json(ingresso); 
}

exports.createIngresso = async (req, res)=> {
    const { usuarioId, eventoId} = req.body; 
    const usuario = await Usuario.findByPk(usuarioId); 
    const evento = await Evento.findByPk(eventoId);
    if (usuario && evento ){
        await usuario.addEvento(evento); 
        res.json({ message: 'Ingresso criado' }); 

    }else {
        res.status(404).json({ message: 'Usuario ou evento não encontrado'}); 
    }
}; 

exports.deleteIngresso = async (req,res)=> {
    const deleted = await Ingresso.destroy({ where: {id: req.params.id }}); 
    if (deleted) return res.json({ message: 'Ingresso removido'})
    res.status(404).json({ error: 'Ingresso não encontrado'});        
}