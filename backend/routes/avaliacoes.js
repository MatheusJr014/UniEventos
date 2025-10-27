const express = require('express'); 
const router = express.Router(); 
const avaliacoesController = require('../controllers/avaliacoesController');
const authMiddleware = require('../middleware/auth');

router.get('/', avaliacoesController.getAllAvaliacoes); 
router.get('/:id', avaliacoesController.getAvaliacaoById);

router.post('/', authMiddleware, avaliacoesController.createAvaliacao); 
router.delete('/:id', authMiddleware, avaliacoesController.deleteAvaliacao);
router.put('/:id', authMiddleware, avaliacoesController.deleteAvaliacao);


module.exports = router; 
