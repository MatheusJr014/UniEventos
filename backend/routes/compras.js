const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');
const authMiddleware = require('../middleware/auth');


router.get('/', comprasController.getAllCompras); 
router.get('/:id', comprasController.getComprasById); 
router.post('/', authMiddleware, comprasController.createCompras); 
router.delete('/:id', authMiddleware, comprasController.deleteCompra);
router.patch('/:id/status', comprasController.updateStatusPagamento);

module.exports = router;