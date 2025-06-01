const express = require('express'); 
const router = express.Router(); 
const avalicoesController = require('../controllers/avaliacoesController');

router.get('/', avalicoesController.getAllAvaliacoes); 
router.get('/:id', avalicoesController.getAvaliacaoById); 
router.post('/', avalicoesController.createAvaliacao); 
router.delete('/:id', avalicoesController.deleteAvaliacao); 


module.exports = router; 
