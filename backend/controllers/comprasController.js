const { Compras } = require('../models'); 

exports.getAllCompras = async(req,res) => {
    const compras = await Compras.findAll(); 
    res.json(compras); 
}