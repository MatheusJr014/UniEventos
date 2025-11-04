const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UniEventos API',
      version: '1.0.0',
      description: 'API para gerenciamento de eventos e ingressos',
      contact: {
        name: 'UniEventos',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID do usuário',
            },
            nome: {
              type: 'string',
              description: 'Nome do usuário',
            },
            sobrenome: {
              type: 'string',
              description: 'Sobrenome do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            cpf: {
              type: 'string',
              description: 'CPF do usuário',
            },
            tipouser: {
              type: 'boolean',
              description: 'Tipo de usuário (true = admin, false = usuário comum)',
            },
          },
        },
        Evento: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID do evento',
            },
            nomeevento: {
              type: 'string',
              description: 'Nome do evento',
            },
            descricao: {
              type: 'string',
              description: 'Descrição do evento',
            },
            datainicio: {
              type: 'string',
              format: 'date',
              description: 'Data de início do evento',
            },
            datafim: {
              type: 'string',
              format: 'date',
              description: 'Data de fim do evento',
            },
            horainicio: {
              type: 'string',
              format: 'time',
              description: 'Hora de início do evento',
            },
            horafim: {
              type: 'string',
              format: 'time',
              description: 'Hora de fim do evento',
            },
            local: {
              type: 'string',
              description: 'Local do evento',
            },
            imagemevento: {
              type: 'string',
              description: 'URL da imagem do evento',
            },
            categoria: {
              type: 'string',
              description: 'Categoria do evento',
            },
            quantidadeingresso: {
              type: 'integer',
              description: 'Quantidade total de ingressos',
            },
            status: {
              type: 'string',
              description: 'Status do evento',
            },
            OrganizadorId: {
              type: 'integer',
              description: 'ID do organizador do evento',
            },
          },
        },
        Ingresso: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID do ingresso',
            },
            tipoingresso: {
              type: 'string',
              description: 'Tipo do ingresso',
            },
            preco: {
              type: 'number',
              format: 'decimal',
              description: 'Preço do ingresso',
            },
            quantidadeTotal: {
              type: 'integer',
              description: 'Quantidade total de ingressos',
            },
            quantidadeDisponivel: {
              type: 'integer',
              description: 'Quantidade disponível de ingressos',
            },
            EventoId: {
              type: 'integer',
              description: 'ID do evento associado',
            },
          },
        },
        Compra: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID da compra',
            },
            UsuarioId: {
              type: 'integer',
              description: 'ID do usuário que realizou a compra',
            },
            IngressoId: {
              type: 'integer',
              description: 'ID do ingresso comprado',
            },
            quantidadeadquirida: {
              type: 'integer',
              description: 'Quantidade de ingressos adquiridos',
            },
            valortotal: {
              type: 'number',
              format: 'decimal',
              description: 'Valor total da compra',
            },
            formadepagamento: {
              type: 'string',
              description: 'Forma de pagamento',
            },
            statuspagamento: {
              type: 'string',
              description: 'Status do pagamento',
            },
            datacompra: {
              type: 'string',
              format: 'date-time',
              description: 'Data da compra',
            },
          },
        },
        Avaliacao: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID da avaliação',
            },
            UsuarioId: {
              type: 'integer',
              description: 'ID do usuário que fez a avaliação',
            },
            EventoId: {
              type: 'integer',
              description: 'ID do evento avaliado',
            },
            nota: {
              type: 'integer',
              description: 'Nota da avaliação',
            },
            comentario: {
              type: 'string',
              description: 'Comentário da avaliação',
            },
            dataavaliacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data da avaliação',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            senha: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT de autenticação',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

