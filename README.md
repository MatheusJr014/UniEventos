# Backend API - UniEventos

API RESTful desenvolvida em Node.js e Express para a plataforma UniEventos, um sistema de gerenciamento e venda de ingressos para eventos.

## Principais Funcionalidades

Este backend é construído com foco em escalabilidade e segurança, seguindo uma arquitetura MVC (Model-View-Controller).

  * **Autenticação e Usuários:** Gerenciamento completo de usuários (CRUD) com autenticação baseada em JSON Web Tokens (JWT) e hashing de senhas usando `bcryptjs`.
  * **Gerenciamento de Eventos:** Sistema completo (CRUD) para criação, visualização, atualização e remoção de eventos.
  * **Gerenciamento de Ingressos:** Criação de diferentes tipos de ingressos (ex: Pista, VIP) associados a eventos específicos.
  * **Fluxo de Compra Transacional:** Um endpoint de compra (`POST /compras`) que utiliza **transações ACID** do Sequelize para garantir que a atualização de estoque e a criação da compra ocorram de forma atômica, prevenindo inconsistências.
  * **Sistema de Avaliações:** Usuários autenticados podem criar, atualizar e deletar suas próprias avaliações para os eventos.
  * **Geração de Relatórios:** Um endpoint (`POST /relatorios`) que processa dados de compras e gera um sumário financeiro para um evento específico.

## Tecnologias Utilizadas

  * **Node.js**
  * **Express.js:** Framework principal da aplicação.
  * **Sequelize:** ORM para interação com o banco de dados.
  * **PostgreSQL:** Dialeto SQL principal (utilizando `sqlite` em ambiente de teste).
  * **JWT (JSON Web Tokens):** Para gerenciamento de sessões e autenticação.
  * **bcryptjs:** Para hashing e verificação de senhas.
  * **Jest & Supertest:** Para a suíte de testes de integração automatizados.
  * **CORS:** Habilitado para permitir requisições do frontend.

## Configuração e Instalação

1.  Clone o repositório.
2.  Navegue até a pasta `backend` e instale as dependências:
    ```bash
    cd backend
    npm install
    ```
3.  Crie um arquivo `.env` na raiz da pasta `backend` com as seguintes variáveis:
    ```env
    # Configuração do Banco (PostgreSQL)
    DB_NAME=AgendaTech
    DB_USER=SEU_USUARIO
    DB_PASS=SUA_SENHA
    DB_HOST=localhost
    DB_PORT=5432

    # Chave secreta para assinar os tokens JWT
    JWT_SECRET=sua_chave_secreta_aqui
    ```
4.  Inicie o servidor (em modo de desenvolvimento):
    ```bash
    npm start
    ```

## Executando os Testes

Para garantir a integridade de todos os endpoints, uma suíte de testes de integração foi criada. Para executá-la:

```bash
npm test
```

## 🗺️ Estrutura do Projeto

```
/backend
|
|-- /controllers       # Contém a lógica de negócio (ex: usuarioController.js)
|   |-- avaliacoesController.js
|   |-- comprasController.js
|   |-- eventosController.js
|   |-- ingressosController.js
|   |-- loginController.js
|   |-- relatorioController.js
|   |-- usuarioController.js
|
|-- /middleware        # Middlewares (ex: auth.js para verificar JWT)
|
|-- /models            # Definições de tabelas (Schemas) do Sequelize
|   |-- avaliacoes.js
|   |-- compras.js
|   |-- evento.js
|   |-- ingresso.js
|   |-- relatorio.js
|   |-- usuario.js
|   |-- index.js         # Carrega modelos e define associações
|
|-- /routes            # Define os endpoints da API
|   |-- avaliacoes.js
|   |-- compras(router).js
|   |-- eventos.js
|   |-- ...
|
|-- /tests             # Testes de integração (Jest + Supertest)
|
|-- app.js             # Configuração principal do Express
|-- server.js          # Ponto de entrada que inicia o servidor
|-- package.json
```

  * `POST /relatorios`: **(Rota Autenticada)** Gera um novo relatório. O controlador busca dados das compras (`FINANCEIRO_EVENTO`) e salva um sumário.
  * `GET /relatorios`: **(Rota Autenticada)** Lista todos os relatórios gerados.
