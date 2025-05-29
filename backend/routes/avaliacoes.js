const express = require('express'); 
const router = express.Router(); 
const { Avaliacoes } = require('../models'); 


router.get('/', async (req, res)=> res.json(await Avaliacoes.FindALL())); 






module.exports = router; 
