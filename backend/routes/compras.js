const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /compras:
 *   get:
 *     summary: Lista todas as compras
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Lista de compras retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compra'
 *   post:
 *     summary: Cria uma nova compra
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ingressoId
 *               - quantidadeadquirida
 *             properties:
 *               ingressoId:
 *                 type: integer
 *                 description: ID do ingresso a ser comprado
 *               quantidadeadquirida:
 *                 type: integer
 *                 description: Quantidade de ingressos a adquirir
 *               formadepagamento:
 *                 type: string
 *                 description: Forma de pagamento
 *           example:
 *             ingressoId: 1
 *             quantidadeadquirida: 2
 *             formadepagamento: "Cartão de Crédito"
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       400:
 *         description: Estoque insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estoque insuficiente"
 *       404:
 *         description: Ingresso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ingresso não encontrado"
 *       500:
 *         description: Erro ao processar a compra
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', comprasController.getAllCompras); 
router.post('/', authMiddleware, comprasController.createCompras); 

/**
 * @swagger
 * /compras/{id}:
 *   get:
 *     summary: Obtém uma compra por ID
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da compra
 *     responses:
 *       200:
 *         description: Compra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       404:
 *         description: Compra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Remove uma compra
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da compra
 *     responses:
 *       200:
 *         description: Compra removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Compra removida"
 *       404:
 *         description: Compra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', comprasController.getComprasById); 
router.delete('/:id', authMiddleware, comprasController.deleteCompra);

/**
 * @swagger
 * /compras/{id}/status:
 *   patch:
 *     summary: Atualiza o status de pagamento de uma compra
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - statuspagamento
 *             properties:
 *               statuspagamento:
 *                 type: string
 *                 description: Novo status do pagamento
 *                 example: "Pago"
 *     responses:
 *       200:
 *         description: Status de pagamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       400:
 *         description: Campo statuspagamento é obrigatório
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Compra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id/status', comprasController.updateStatusPagamento);

module.exports = router;