const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Cria um checkout e gera preferência de pagamento no Mercado Pago
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itens
 *               - eventoId
 *             properties:
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingressoId:
 *                       type: integer
 *                     quantidade:
 *                       type: integer
 *               eventoId:
 *                 type: integer
 *           example:
 *             itens:
 *               - ingressoId: 1
 *                 quantidade: 2
 *               - ingressoId: 2
 *                 quantidade: 1
 *             eventoId: 1
 *     responses:
 *       200:
 *         description: Checkout criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 redirectUrl:
 *                   type: string
 *                 preferenceId:
 *                   type: string
 *                 total:
 *                   type: number
 *                 pedidos:
 *                   type: array
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar checkout
 */
router.post('/', authMiddleware, checkoutController.criarCheckout);

/**
 * @swagger
 * /checkout/pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: UsuarioId
 *         schema:
 *           type: integer
 *         description: Filtrar por ID do usuário
 *       - in: query
 *         name: EventoId
 *         schema:
 *           type: integer
 *         description: Filtrar por ID do evento
 *       - in: query
 *         name: statusPagamento
 *         schema:
 *           type: string
 *           enum: [aguarde, confirmado, cancelado]
 *         description: Filtrar por status de pagamento
 *       - in: query
 *         name: OrganizadorId
 *         schema:
 *           type: integer
 *         description: Filtrar pedidos de eventos do organizador
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/pedidos', authMiddleware, checkoutController.listarPedidos);

/**
 * @swagger
 * /checkout/pedidos/{id}:
 *   get:
 *     summary: Obtém um pedido por ID
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/pedidos/:id', authMiddleware, checkoutController.getPedidoById);

/**
 * @swagger
 * /checkout/pedidos/{id}/status:
 *   patch:
 *     summary: Atualiza o status de um pedido
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusPagamento:
 *                 type: string
 *                 enum: [aguarde, confirmado, cancelado]
 *               paymentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       400:
 *         description: Status inválido
 *       404:
 *         description: Pedido não encontrado
 */
router.patch('/pedidos/:id/status', authMiddleware, checkoutController.atualizarStatusPedido);

module.exports = router;

