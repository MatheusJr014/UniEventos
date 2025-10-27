const request = require('supertest');
const app = require('../app');
const { sequelize, Usuario, Evento } = require('../models');

let tokenUsuarioComum;
let eventoId;
let avaliacaoId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const organizador = await Usuario.create({
    nome: 'Org', sobrenome: 'Teste', email: 'org@teste.com',
    cpf: '123456000', senha: '123', tipouser: true
  });
  const evento = await Evento.create({
    nomeevento: 'Evento Teste', OrganizadorId: organizador.id
  });
  eventoId = evento.id;

  await request(app)
    .post('/usuarios')
    .send({
      nome: 'User', sobrenome: 'Comum', email: 'user@teste.com',
      cpf: '789123000', senha: '123'
    });
  
  const loginRes = await request(app)
    .post('/login')
    .send({ email: 'user@teste.com', senha: '123' });
  
  tokenUsuarioComum = loginRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes de /avaliacoes', () => {

  it('POST /avaliacoes -> Deve falhar se não enviar token', async () => {
    const response = await request(app)
      .post('/avaliacoes')
      .send({ EventoId: eventoId, nota: 5, comentario: 'Teste' });
    expect(response.statusCode).toBe(401); 
  });

  it('POST /avaliacoes -> Deve criar uma avaliação com token', async () => {
    const response = await request(app)
      .post('/avaliacoes')
      .set('Authorization', `Bearer ${tokenUsuarioComum}`)
      .send({
        EventoId: eventoId,
        nota: 5,
        comentario: 'Muito bom!'
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.nota).toBe(5);
    expect(response.body.comentario).toBe('Muito bom!');
    avaliacaoId = response.body.id;
  });

  it('PUT /avaliacoes/:id -> Deve atualizar a própria avaliação', async () => {
    const response = await request(app)
      .put(`/avaliacoes/${avaliacaoId}`)
      .set('Authorization', `Bearer ${tokenUsuarioComum}`)
      .send({
        nota: 4,
        comentario: 'Atualizado.'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.nota).toBe(4);
    expect(response.body.comentario).toBe('Atualizado.');
  });

  it('DELETE /avaliacoes/:id -> Deve deletar a avaliação', async () => {
    const response = await request(app)
      .delete(`/avaliacoes/${avaliacaoId}`)
      .set('Authorization', `Bearer ${tokenUsuarioComum}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Avaliação Removida');
  });

  it('GET /avaliacoes/:id -> Deve falhar ao buscar avaliação deletada', async () => {
    const response = await request(app).get(`/avaliacoes/${avaliacaoId}`);
    expect(response.statusCode).toBe(404); //
  });
});