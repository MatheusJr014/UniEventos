const express = require('express'); 
const router = express.Router(); 
const avaliacoesController = require('../controllers/avaliacoesController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /avaliacoes:
 *   get:
 *     summary: Lista todas as avaliações
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Lista de avaliações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avaliacao'
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - EventoId
 *               - nota
 *             properties:
 *               EventoId:
 *                 type: integer
 *                 description: ID do evento avaliado
 *               nota:
 *                 type: integer
 *                 description: Nota da avaliação
 *                 minimum: 1
 *                 maximum: 5
 *               comentario:
 *                 type: string
 *                 description: Comentário da avaliação
 *           example:
 *             EventoId: 1
 *             nota: 5
 *             comentario: "Evento incrível! Recomendo muito."
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', avaliacoesController.getAllAvaliacoes); 
router.post('/', authMiddleware, avaliacoesController.createAvaliacao); 

/**
 * @swagger
 * /avaliacoes/{id}:
 *   get:
 *     summary: Obtém uma avaliação por ID
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Avaliação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Atualiza uma avaliação
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 description: Nova nota da avaliação
 *                 minimum: 1
 *                 maximum: 5
 *               comentario:
 *                 type: string
 *                 description: Novo comentário da avaliação
 *           example:
 *             nota: 4
 *             comentario: "Bom evento, mas poderia melhorar alguns aspectos."
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       403:
 *         description: Acesso negado. Você não pode editar esta avaliação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Avaliação não encontrada
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
 *   delete:
 *     summary: Remove uma avaliação
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Avaliação Removida"
 *       403:
 *         description: Acesso negado. Você não pode deletar esta avaliação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Avaliação não encontrada
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
router.get('/:id', avaliacoesController.getAvaliacaoById);
router.put('/:id', authMiddleware, avaliacoesController.updateAvaliacao);
router.delete('/:id', authMiddleware, avaliacoesController.deleteAvaliacao);

module.exports = router; 
