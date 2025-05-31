const express = require('express'); 
const router = express.Router(); 
const ingressoController = require('../controllers/ingressosController'); 


router.get('/', ingressoController.getAllIngresso);
router.get('/:id', ingressoController.getIngressoById);
router.post('/', ingressoController.createIngresso);
router.delete('/:id', ingressoController.deleteIngresso);

module.exports = router;