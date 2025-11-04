const express = require('express'); 
const router = express.Router(); 
const ingressoController = require('../controllers/ingressosController'); 

/**
 * @swagger
 * /ingressos:
 *   get:
 *     summary: Lista todos os ingressos
 *     tags: [Ingressos]
 *     parameters:
 *       - in: query
 *         name: EventoId
 *         schema:
 *           type: integer
 *         description: Filtrar ingressos por ID do evento
 *     responses:
 *       200:
 *         description: Lista de ingressos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingresso'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Cria um novo ingresso
 *     tags: [Ingressos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - eventoId
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 description: ID do usuário organizador
 *               eventoId:
 *                 type: integer
 *                 description: ID do evento
 *               tipoingresso:
 *                 type: string
 *                 description: Tipo do ingresso
 *               preco:
 *                 type: number
 *                 format: decimal
 *                 description: Preço do ingresso
 *               quantidadeTotal:
 *                 type: integer
 *                 description: Quantidade total de ingressos
 *               quantidadeDisponivel:
 *                 type: integer
 *                 description: Quantidade disponível de ingressos
 *           example:
 *             usuarioId: 1
 *             eventoId: 1
 *             tipoingresso: "VIP"
 *             preco: 150.00
 *             quantidadeTotal: 100
 *             quantidadeDisponivel: 100
 *     responses:
 *       201:
 *         description: Ingresso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingresso'
 *       404:
 *         description: Usuário ou evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario ou evento não encontrado"
 *       500:
 *         description: Erro ao criar ingresso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', ingressoController.getAllIngresso);
router.post('/', ingressoController.createIngresso);

/**
 * @swagger
 * /ingressos/{id}:
 *   get:
 *     summary: Obtém um ingresso por ID
 *     tags: [Ingressos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ingresso
 *     responses:
 *       200:
 *         description: Ingresso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingresso'
 *       404:
 *         description: Ingresso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Remove um ingresso
 *     tags: [Ingressos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ingresso
 *     responses:
 *       200:
 *         description: Ingresso removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ingresso removido"
 *       404:
 *         description: Ingresso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', ingressoController.getIngressoById);
router.delete('/:id', ingressoController.deleteIngresso);

module.exports = router;