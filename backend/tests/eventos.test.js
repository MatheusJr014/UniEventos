const request = require('supertest');
const app = require('../app');
const { sequelize, Usuario } = require('../models');

let organizadorId;
let eventoId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const organizador = await Usuario.create({
    nome: 'Organizador',
    sobrenome: 'Teste',
    email: 'org@eventos.com',
    cpf: '11111111111',
    senha: '123',
    tipouser: true
  });
  organizadorId = organizador.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes de /eventos', () => {
  it('POST /eventos -> Deve criar um novo evento', async () => {
    const response = await request(app)
      .post('/eventos')
      .send({
        nomeevento: 'Palestra de Teste',
        descricao: 'Descrição do evento.',
        datainicio: '2025-12-01',
        datafim: '2025-12-01',
        horainicio: '19:00:00',
        horafim: '21:00:00',
        local: 'Online',
        categoria: 'Teste',
        status: 'Ativo',
        OrganizadorId: organizadorId
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.nomeevento).toBe('Palestra de Teste');
    expect(response.body.OrganizadorId).toBe(organizadorId);
    
    eventoId = response.body.id;
  });

  it('GET /eventos -> Deve listar todos os eventos', async () => {
    const response = await request(app).get('/eventos');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].nomeevento).toBe('Palestra de Teste');
  });

  it('GET /eventos/:id -> Deve buscar um evento pelo ID', async () => {
    const response = await request(app).get(`/eventos/${eventoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(eventoId);
  });

  it('GET /eventos?OrganizadorId=:id -> Deve filtrar eventos por Organizador', async () => {
    const response = await request(app).get(`/eventos?OrganizadorId=${organizadorId}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it('PUT /eventos/:id -> Deve atualizar um evento', async () => {
    const response = await request(app)
      .put(`/eventos/${eventoId}`)
      .send({
        local: 'Auditório Principal'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.local).toBe('Auditório Principal');
    expect(response.body.nomeevento).toBe('Palestra de Teste');
  });

  it('DELETE /eventos/:id -> Deve deletar um evento', async () => {
    const response = await request(app).delete(`/eventos/${eventoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Evento removido');
  });

  it('GET /eventos/:id -> Deve retornar 404 para evento deletado', async () => {
    const response = await request(app).get(`/eventos/${eventoId}`);
    expect(response.statusCode).toBe(404);
  });
});