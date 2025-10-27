const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes de Autenticação (Usuario e Login)', () => {
  it('POST /usuarios -> Deve criar um novo usuário comum', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({
        nome: 'Usuario',
        sobrenome: 'Comum',
        email: 'comum@teste.com',
        cpf: '11122233300',
        senha: 'senha123'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe('comum@teste.com');
    expect(response.body.tipouser).toBe(false);
    expect(response.body.senha).toBeUndefined();
  });

  it('POST /usuarios -> Deve falhar ao criar usuário com email duplicado', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({
        nome: 'Usuario',
        sobrenome: 'Duplicado',
        email: 'comum@teste.com',
        cpf: '44455566600',
        senha: 'senha123'
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Email ou CPF já cadastrado.');
  });

  it('POST /login -> Deve falhar com senha incorreta', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'comum@teste.com',
        senha: 'senha_errada'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Credenciais inválidas.'); //
  });

  it('POST /login -> Deve logar com sucesso e retornar um token', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'comum@teste.com',
        senha: 'senha123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined(); //
  });
});