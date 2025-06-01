const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController'); 


router.get('/', comprasController.getAllCompras); 
router.get('/:id', comprasController.getComprasById); 
router.post('/', comprasController.createCompras); 
router.delete('/:id', comprasController.deleteCompra); 


module.exports = router;