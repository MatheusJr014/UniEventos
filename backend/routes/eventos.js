const express = require('express'); 
const router = express.Router(); 
const eventoController = require('../controllers/eventosController'); 

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Lista todos os eventos
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: OrganizadorId
 *         schema:
 *           type: integer
 *         description: Filtrar eventos por ID do organizador
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *           example:
 *             nomeevento: "Festival de Música"
 *             descricao: "Um festival incrível de música"
 *             datainicio: "2025-12-01"
 *             datafim: "2025-12-03"
 *             horainicio: "18:00:00"
 *             horafim: "23:00:00"
 *             local: "Parque Central"
 *             imagemevento: "https://example.com/imagem.jpg"
 *             categoria: "Música"
 *             quantidadeingresso: 1000
 *             status: "Ativo"
 *             OrganizadorId: 1
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 */
router.get('/', eventoController.getAllEventos); 
router.post('/', eventoController.createEvento); 

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Obtém um evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Atualiza um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Remove um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento removido"
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', eventoController.getEventoById); 
router.put('/:id', eventoController.updateEvento); 
router.delete('/:id', eventoController.deleteEvento); 

module.exports = router;