const express = require('express'); 
const router = express.Router(); 
const avalicoesController = require('../controllers/avaliacoesController');

router.get('/', avalicoesController.getAllAvaliacoes); 

module.exports = router; 
