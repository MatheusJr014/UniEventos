# Telas do Frontend UniEventos

Esta documentação lista todas as telas expostas pelo frontend do projeto, com seus caminhos de rota, componentes principais e propósitos.

| Rota | Tela / Componente | Objetivo | Situação |
| --- | --- | --- | --- |
| `/` | `HomeView` (`src/views/Publico/HomeView.vue`) | Página inicial com destaque de eventos, cards promocionais e navegação principal. | Ativa |
| `/eventos/lista` | `EventosListView` (`src/views/Publico/EventosListView.vue`) | Catálogo de eventos com filtros (categoria, data, preço, formato), ordenação e paginação. | Ativa |
| `/eventos/:id` | `EventoView` (`src/views/Publico/EventoView.vue`) | Detalhes completos de um evento, incluindo descrição, horário, local, ingressos relacionados e CTA para compra. | Ativa |
| `/auth/login` | `LoginAndCadastroView` (`src/views/Publico/LoginAndCadastroView.vue`) | Fluxo unificado de autenticação: apresenta telas de login e cadastro e reutiliza cabeçalho/rodapé públicos. | Ativa |
| `/usuario/perfil` | `UsuarioView` → `PerfilUsuario` (`src/views/User/UsuarioView.vue`) | Área do usuário com dados pessoais, abas para preferências, segurança e progresso de perfil. Carrega dados via token JWT. | Ativa |
| `/usuario/ingressos` | `MeusIngressosComponent` (`src/components/User/MeusIngressosComponent.vue`) | Gerenciamento de ingressos adquiridos: filtros, QR Code, cancelamento e download. | Ativa |
| `/usuario/historico` | `HistoricoComponent` (`src/components/User/HistoricoComponent.vue`) | Página planejada para listar histórico de eventos/favoritos. | Em branco (não implementada) |
| `/admin` e `/admin/dashboard` | `AdminView` → `AdminComponent` (`src/views/Admin/AdminView.vue`) | Painel administrativo com métricas, CRUD de eventos, relatórios e configurações. Protegido por guarda `GuardAdmin.authAdmin`. | Ativa |
| `/manutencao`, `/404`, `/termos`, `/privacidade`, `/faq`, `/ajuda`, `/politica-cancelamento` | `MaintenancePage` (`src/components/Publico/common/404ErrorDev.vue`) | Tela genérica de manutenção/404 utilizada para páginas ainda não desenvolvidas, com links para home e recarregar. | Ativa |

## Observações gerais

- Todas as rotas públicas compartilham cabeçalho e rodapé em `NavBarComponents` e `FooterComponents`.
- Telas protegidas usam guardas definidos em `src/middleware/Auths.js` para validar tokens JWT.
- Componentes administrativos e de usuário fazem chamadas aos serviços da API definidos em `src/services/api.js`.
- A tela `HistoricoComponent.vue` está vazia e pode ser usada como ponto de partida para implementar histórico de interações do usuário.

