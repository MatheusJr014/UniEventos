const { Evento } = require('../models');

exports.getAllEventos = async (req, res)=> {
    const eventos = await Evento.findAll(); 
    res.json(eventos); 
}; 

exports.getEventoById = async (req,res)=> {
    const evento = await Evento.findByPk(req.params.id); 
    if(!evento) return res.status(404).json({ error: 'Evento não encontrado'})
    res.json(evento); 
}

exports.createEvento = async (req,res) => {
    const eventos = await Evento.create(req.body); 
    res.status(201).json(eventos); 
}

exports.updateEvento = async(req, res) => {
    const [updated] = await Evento.update(req.body, {where: {id: req.params.id}}); 
    if(updated){
        const eventoAtualizado = await Evento.findByPk(req.params.id); 
        return res.json(eventoAtualizado); 
    }
    res.status(404).json({error: 'Evento não encontrado'}); 
}



exports.deleteEvento = async(req,res) => {
    const deleted = await Evento.destroy({ where: {id: req.params.id}}); 
    if(deleted) return res.json({ message: 'Evento removido'});
    res.status(404).json({ error: 'Evento não encontrado'}); 
}


