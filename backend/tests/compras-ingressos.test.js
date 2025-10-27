// tests/compras-ingressos.test.js
const request = require('supertest');
const app = require('../app');
const { sequelize, Usuario, Evento, Ingresso } = require('../models');

let tokenComum;
let organizadorId;
let eventoId;
let ingressoId;
let compraId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const organizador = await Usuario.create({
    nome: 'Org Compras', sobrenome: 'Teste', email: 'org@compras.com',
    cpf: '22222222222', senha: '123', tipouser: true
  });
  organizadorId = organizador.id;
  
  const evento = await Evento.create({
    nomeevento: 'Evento P/ Compras', OrganizadorId: organizadorId
  });
  eventoId = evento.id;

  await request(app)
    .post('/usuarios')
    .send({
      nome: 'User', sobrenome: 'Comprador', email: 'comprador@teste.com',
      cpf: '33333333333', senha: '123'
    });
  
  const loginRes = await request(app)
    .post('/login')
    .send({ email: 'comprador@teste.com', senha: '123' });
  
  tokenComum = loginRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Fluxo de Ingressos e Compras', () => {
  it('POST /ingressos -> Deve criar um tipo de ingresso', async () => {
    const response = await request(app)
      .post('/ingressos')
      .send({
        usuarioId: organizadorId,
        eventoId: eventoId,
        tipoingresso: 'Pista',
        preco: 50.00,
        quantidadeTotal: 10,
        quantidadeDisponivel: 10
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.tipoingresso).toBe('Pista');
    expect(response.body.EventoId).toBe(eventoId);

    ingressoId = response.body.id;
  });

  it('POST /compras -> Deve criar uma compra (Estoque OK)', async () => {
    
    const response = await request(app)
      .post('/compras')
      .set('Authorization', `Bearer ${tokenComum}`)
      .send({
        ingressoId: ingressoId,
        quantidadeadquirida: 3,
        formadepagamento: 'PIX'
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.IngressoId).toBe(ingressoId);
    expect(response.body.quantidadeadquirida).toBe(3);
    expect(response.body.valortotal).toBe(150);
    expect(response.body.statuspagamento).toBe('Pendente');

    compraId = response.body.id;
    const ingresso = await Ingresso.findByPk(ingressoId);
    expect(ingresso.quantidadeDisponivel).toBe(7);
  });

  it('POST /compras -> Deve falhar (Estoque Insuficiente)', async () => {
    
    const response = await request(app)
      .post('/compras')
      .set('Authorization', `Bearer ${tokenComum}`)
      .send({
        ingressoId: ingressoId,
        quantidadeadquirida: 8,
        formadepagamento: 'PIX'
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Estoque insuficiente');

    const ingresso = await Ingresso.findByPk(ingressoId);
    expect(ingresso.quantidadeDisponivel).toBe(7);
  });

  it('PATCH /compras/:id/status -> Deve atualizar o status de pagamento', async () => {
    const response = await request(app)
      .patch(`/compras/${compraId}/status`)
      .send({
        statuspagamento: 'Concluído'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.statuspagamento).toBe('Concluído');
  });
});