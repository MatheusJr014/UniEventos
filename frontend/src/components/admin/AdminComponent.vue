<template>
    <div class="admin-dashboard">
      <!-- Sidebar -->
      <div class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <div class="sidebar-header">
          <div class="logo-container">
            <router-link to="/">
              <img v-if="!sidebarCollapsed" src="../../assets/logo.svg" alt="Conecta Eventos Logo" height="100" class="logo">
              <img v-else>
            </router-link>
          </div>
          <button class="btn btn-sm btn-link text-primary sidebar-toggle" @click="toggleSidebar">
            <i class="bi" :class="sidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
          </button>
        </div>
        <div class="sidebar-menu">
          <ul class="nav flex-column">
            <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
              <a 
                class="nav-link" 
                :class="{ active: activeMenuItem === item.id }" 
                href="#" 
                @click.prevent="setActiveMenuItem(item.id)"
              >
                <i :class="`bi ${item.icon}`"></i>
                <span v-if="!sidebarCollapsed">{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="sidebar-footer">
          <div class="user-info" v-if="!sidebarCollapsed">
            <div class="user-avatar">
              <img :src="userImage" alt="Organizador" class="img-fluid rounded-circle">
            </div>
            <div class="user-details">
              <div class="user-name">{{ userName }}</div>
              <div class="user-role text-muted">Organizador</div>
            </div>
          </div>
          <div class="user-actions">
            <a href="#" class="btn btn-sm btn-link text-primary" title="Sair" @click.prevent="logout">
              <i class="bi bi-box-arrow-right"></i>
              <span v-if="!sidebarCollapsed">Sair</span>
            </a>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="main-content" :class="{ 'main-content-expanded': sidebarCollapsed }">
        <!-- Header -->
        <header class="header">
          <div class="d-flex align-items-center">
            <div class="page-title">{{ currentPageTitle }}</div>
          </div>
          <div class="header-actions">
            <div class="dropdown me-3">
              <button class="btn btn-sm btn-light position-relative" type="button" data-bs-toggle="dropdown">
                <i class="bi bi-bell"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><h6 class="dropdown-header">Notificações</h6></li>
                <li><a class="dropdown-item" href="#">Novo evento cadastrado</a></li>
                <li><a class="dropdown-item" href="#">5 novos usuários hoje</a></li>
                <li><a class="dropdown-item" href="#">Relatório mensal disponível</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Ver todas notificações</a></li>
              </ul>
            </div>
            <div class="dropdown">
              <button class="btn btn-sm btn-light" type="button" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Meu Perfil</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click.prevent="logout">Sair</a></li>
              </ul>
            </div>
          </div>
        </header>
  
        <!-- Dashboard Content -->
        <div class="dashboard-content">
          <!-- Dashboard Overview -->
          <div v-if="activeMenuItem === 'dashboard'">
            <div class="row g-4 mb-4">
              <div class="col-md-6 col-lg-3">
                <div class="card border-0 shadow-sm">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 class="card-subtitle text-muted">Total de Eventos</h6>
                        <h2 class="card-title mb-0">{{ totalEventos }}</h2>
                      </div>
                      <div class="icon-box bg-primary bg-opacity-10 text-primary">
                        <i class="bi bi-calendar-event"></i>
                      </div>
                    </div>
                    <div class="mt-3 small text-success">
                      <i class="bi bi-arrow-up"></i> 12% desde o mês passado
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="card border-0 shadow-sm">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 class="card-subtitle text-muted">Ingressos Vendidos</h6>
                        <h2 class="card-title mb-0">{{ formatNumber(totalIngressosVendidos) }}</h2>
                      </div>
                      <div class="icon-box bg-secondary bg-opacity-10 text-secondary">
                        <i class="bi bi-ticket-perforated"></i>
                      </div>
                    </div>
                    <div class="mt-3 small text-success" v-if="totalIngressosVendidos > 0">
                      <i class="bi bi-check-circle"></i> Vendas confirmadas
                    </div>
                    <div class="mt-3 small text-muted" v-else>
                      <i class="bi bi-info-circle"></i> Nenhuma venda ainda
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="card border-0 shadow-sm">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 class="card-subtitle text-muted">Usuários Ativos</h6>
                        <h2 class="card-title mb-0">{{ formatNumber(totalUsuariosAtivos) }}</h2>
                      </div>
                      <div class="icon-box bg-primary bg-opacity-10 text-primary">
                        <i class="bi bi-people"></i>
                      </div>
                    </div>
                    <div class="mt-3 small text-success" v-if="totalUsuariosAtivos > 0">
                      <i class="bi bi-check-circle"></i> Usuários com compras confirmadas
                    </div>
                    <div class="mt-3 small text-muted" v-else>
                      <i class="bi bi-info-circle"></i> Nenhum usuário ativo ainda
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="card border-0 shadow-sm">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 class="card-subtitle text-muted">Receita Total</h6>
                        <h2 class="card-title mb-0">{{ formatCurrency(totalReceita) }}</h2>
                      </div>
                      <div class="icon-box bg-secondary bg-opacity-10 text-secondary">
                        <i class="bi bi-currency-dollar"></i>
                      </div>
                    </div>
                    <div class="mt-3 small text-success" v-if="totalReceita > 0">
                      <i class="bi bi-check-circle"></i> Receita de vendas confirmadas
                    </div>
                    <div class="mt-3 small text-muted" v-else>
                      <i class="bi bi-info-circle"></i> Nenhuma receita ainda
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="row g-4 mb-4">
              <div class="col-lg-8">
                <div class="card border-0 shadow-sm">
                  <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Vendas de Ingressos</h5>
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary active">Semana</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Mês</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Ano</button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="chart-container" style="height: 300px;">
                      <!-- Placeholder for chart -->
                      <div class="chart-placeholder d-flex align-items-center justify-content-center h-100 bg-light rounded">
                        <div class="text-center text-muted">
                          <i class="bi bi-bar-chart-line fs-1"></i>
                          <p>Gráfico de Vendas de Ingressos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card border-0 shadow-sm">
                  <div class="card-header bg-white">
                    <h5 class="card-title mb-0">Categorias Populares</h5>
                  </div>
                  <div class="card-body">
                    <div class="chart-container" style="height: 300px;">
                      <!-- Placeholder for chart -->
                      <div class="chart-placeholder d-flex align-items-center justify-content-center h-100 bg-light rounded">
                        <div class="text-center text-muted">
                          <i class="bi bi-pie-chart fs-1"></i>
                          <p>Gráfico de Categorias</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="row g-4">
              <div class="col-lg-6">
                <div class="card border-0 shadow-sm">
                  <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Eventos Recentes</h5>
                    <a href="#" class="btn btn-sm btn-link">Ver Todos</a>
                  </div>
                  <div class="card-body p-0">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead class="table-light">
                          <tr>
                            <th scope="col">Nome do Evento</th>
                            <th scope="col">Data</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(event, index) in filteredEvents" :key="index">
                            <td>{{ event.nomeevento }}</td>
                            <td>{{ event.datainicio }}</td>
                            <td>
                              <span class="badge" :class="getStatusBadgeClass(event.status)">
                                {{ event.status }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card border-0 shadow-sm">
                  <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Últimos Usuários</h5>
                    <a href="#" class="btn btn-sm btn-link">Ver Todos</a>
                  </div>
                  <div class="card-body p-0">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead class="table-light">
                          <tr>
                            <th scope="col">Usuário</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Data de Cadastro</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Events Management -->
          <div v-if="activeMenuItem === 'events'">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h4 class="mb-0">Gerenciamento de Eventos</h4>
              <button class="btn btn-primary" @click="openAddEventModal">
                <i class="bi bi-plus-circle me-2"></i>Adicionar Evento
              </button>
            </div>
  
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <div class="row g-3 mb-4">
                  <div class="col-md-4">
                    <div class="input-group">
                      <span class="input-group-text bg-white">
                        <i class="bi bi-search"></i>
                      </span>
                      <input type="text" class="form-control" placeholder="Buscar eventos..." v-model="searchQuery">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <select class="form-select" v-model="filterCategory">
                      <option value="">Todas as Categorias</option>
                      <option value="Festival">Festival</option>
                      <option value="Show">Show</option>
                      <option value="Conferência">Conferência</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Teatro">Teatro</option>
                      <option value="Esporte">Esporte</option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <select class="form-select" v-model="filterStatus">
                      <option value="">Todos os Status</option>
                      <option value="Publicado">Publicado</option>
                      <option value="Rascunho">Rascunho</option>
                      <option value="Cancelado">Cancelado</option>
                      <option value="Concluído">Concluído</option>
                    </select>
                  </div>
                  <div class="col-md-2">
                    <button class="btn btn-outline-secondary w-100" @click="resetFilters">
                      <i class="bi bi-x-circle me-2"></i>Limpar
                    </button>
                  </div>
                </div>
  
                <div class="table-responsive">
                  <table class="table table-hover align-middle">
                    <thead class="table-light">
                      <tr>
                        <th scope="col">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="selectAll" @change="toggleSelectAll">
                          </div>
                        </th>
                        <th scope="col">Evento</th>
                        <th scope="col">Data</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Ingressos</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(event, index) in filteredEvents" :key="index">
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="event.selected">
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="event-image me-3">
                              <img :src="
                              event.imagemevento ||
                              'https://placehold.co/600x400'
                            "
                            :alt="event.nomeevento" class="rounded" width="60" height="40">
                             
                            </div>
                            <div>
                              <div class="fw-bold">{{ event.nomeevento }}</div>
                              <div class="small text-muted">ID: {{ event.id }}</div>
                            </div>
                          </div>
                        </td>
                        <td>{{ event.datainicio }}</td>
                        <td>
                          <span class="badge bg-primary">{{ event.categoria }}</span>
                        </td>
                        <td>{{ event.quantidadeingresso }}</td>
                        <td>
                          <span class="badge" :class="getStatusBadgeClass(event.status)">
                            {{ event.status }}
                          </span>
                        </td>
                        <td>
                          <div class="btn-group">
                            <button class="btn btn-sm btn-outline-secondary" @click="editEvent(event)">
                              <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-secondary" @click="viewEvent(event)">
                              <i class="bi bi-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" @click="openDeleteModal(event)">
                              <i class="bi bi-trash"></i>
                            </button>
                          
                          </div>
                        </td>
                      </tr>
                      <tr v-if="filteredEvents.length === 0">
                        <td colspan="8" class="text-center py-4">
                          <div class="text-muted">
                            <i class="bi bi-search fs-4 d-block mb-2"></i>
                            Nenhum evento encontrado com os filtros selecionados.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
  
                <div class="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <span class="text-muted">Mostrando {{ filteredEvents.length }} de {{ events.length }} eventos</span>
                  </div>
                  <nav>
                    <ul class="pagination mb-0">
                      <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
                      </li>
                      <li class="page-item active"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item">
                        <a class="page-link" href="#">Próximo</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Ingressos Management -->
          <div v-if="activeMenuItem === 'ingressos'">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h4 class="mb-0">Gerenciamento de Ingressos</h4>
              <button class="btn btn-primary" @click="openAddIngressoModal">
                <i class="bi bi-plus-circle me-2"></i>Adicionar Ingresso
              </button>
            </div>
  
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover align-middle">
                    <thead class="table-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Evento</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Total</th>
                        <th scope="col">Disponível</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ingresso in ingressos" :key="ingresso.id">
                        <td>{{ ingresso.id }}</td>
                        <td>
                          {{ getEventoNome(ingresso.EventoId) }}
                        </td>
                        <td>
                          <span class="badge bg-primary">{{ ingresso.tipoingresso || 'N/A' }}</span>
                        </td>
                        <td>
                          {{ parseFloat(ingresso.preco || 0) === 0 ? 'Grátis' : `R$ ${parseFloat(ingresso.preco).toFixed(2).replace('.', ',')}` }}
                        </td>
                        <td>{{ ingresso.quantidadeTotal || 0 }}</td>
                        <td>
                          <span :class="ingresso.quantidadeDisponivel > 0 ? 'text-success' : 'text-danger'">
                            {{ ingresso.quantidadeDisponivel || 0 }}
                          </span>
                        </td>
                        <td>
                          <div class="btn-group">
                            <button class="btn btn-sm btn-outline-secondary" @click="editIngresso(ingresso)">
                              <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" @click="openDeleteIngressoModal(ingresso)">
                              <i class="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="ingressos.length === 0">
                        <td colspan="7" class="text-center py-4">
                          <div class="text-muted">
                            <i class="bi bi-ticket-perforated fs-4 d-block mb-2"></i>
                            Nenhum ingresso cadastrado.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Pedidos Management -->
          <div v-if="activeMenuItem === 'pedidos'">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h4 class="mb-0">Gerenciamento de Pedidos</h4>
            </div>
  
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <div class="row g-3 mb-4">
                  <div class="col-md-4">
                    <label class="form-label">Filtrar por Status</label>
                    <select class="form-select" v-model="filterStatusPedido" @change="fetchPedidos">
                      <option value="">Todos os Status</option>
                      <option value="aguarde">Aguardando</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                  <div class="col-md-4 d-flex align-items-end">
                    <button class="btn btn-outline-secondary" @click="resetFilterPedidos">
                      <i class="bi bi-x-circle me-2"></i>Limpar Filtro
                    </button>
                  </div>
                </div>
  
                <div class="table-responsive">
                  <table class="table table-hover align-middle">
                    <thead class="table-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Evento</th>
                        <th scope="col">Ingresso</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Data</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="pedido in filteredPedidos" :key="pedido.id">
                        <td>{{ pedido.id }}</td>
                        <td>
                          <div>
                            <div class="fw-bold">{{ pedido.usuario?.nome || 'N/A' }}</div>
                            <small class="text-muted">{{ pedido.usuario?.email || '' }}</small>
                          </div>
                        </td>
                        <td>{{ pedido.evento?.nomeevento || 'N/A' }}</td>
                        <td>
                          <span class="badge bg-primary">
                            {{ pedido.ingresso?.tipoingresso || 'N/A' }}
                          </span>
                        </td>
                        <td>{{ pedido.quantidade }}</td>
                        <td>R$ {{ parseFloat(pedido.valorTotal || 0).toFixed(2).replace('.', ',') }}</td>
                        <td>
                          <span class="badge" :class="getStatusPedidoBadgeClass(pedido.statusPagamento)">
                            {{ getStatusPedidoLabel(pedido.statusPagamento) }}
                          </span>
                        </td>
                        <td>{{ formatDate(pedido.createdAt) }}</td>
                        <td>
                          <div class="btn-group">
                            <button 
                              class="btn btn-sm btn-outline-success" 
                              v-if="pedido.statusPagamento === 'aguarde'"
                              @click="atualizarStatusPedido(pedido, 'confirmado')"
                              title="Confirmar Pagamento"
                            >
                              <i class="bi bi-check-circle"></i>
                            </button>
                            <button 
                              class="btn btn-sm btn-outline-danger" 
                              v-if="pedido.statusPagamento === 'aguarde'"
                              @click="atualizarStatusPedido(pedido, 'cancelado')"
                              title="Cancelar Pedido"
                            >
                              <i class="bi bi-x-circle"></i>
                            </button>
                            <button 
                              class="btn btn-sm btn-outline-info" 
                              @click="viewPedidoDetails(pedido)"
                              title="Ver Detalhes"
                            >
                              <i class="bi bi-eye"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="filteredPedidos.length === 0">
                        <td colspan="9" class="text-center py-4">
                          <div class="text-muted">
                            <i class="bi bi-cart-x fs-4 d-block mb-2"></i>
                            Nenhum pedido encontrado.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Reports -->
          <div v-if="activeMenuItem === 'reports'">
            <h4 class="mb-4">Relatórios</h4>
            
            <div class="row g-4">
              <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                  <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Relatório de Vendas</h5>
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-download me-1"></i> PDF
                      </button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-download me-1"></i> Excel
                      </button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="chart-container" style="height: 250px;">
                      <!-- Placeholder for chart -->
                      <div class="chart-placeholder d-flex align-items-center justify-content-center h-100 bg-light rounded">
                        <div class="text-center text-muted">
                          <i class="bi bi-bar-chart-line fs-1"></i>
                          <p>Gráfico de Vendas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                  <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Relatório de Usuários</h5>
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-download me-1"></i> PDF
                      </button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-download me-1"></i> Excel
                      </button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="chart-container" style="height: 250px;">
                      <!-- Placeholder for chart -->
                      <div class="chart-placeholder d-flex align-items-center justify-content-center h-100 bg-light rounded">
                        <div class="text-center text-muted">
                          <i class="bi bi-graph-up fs-1"></i>
                          <p>Gráfico de Usuários</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="card border-0 shadow-sm">
                  <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Relatório Financeiro</h5>
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-download me-1"></i> PDF
                      </button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-download me-1"></i> Excel
                      </button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead class="table-light">
                          <tr>
                            <th scope="col">Mês</th>
                            <th scope="col">Receita Bruta</th>
                            <th scope="col">Taxas</th>
                            <th scope="col">Receita Líquida</th>
                            <th scope="col">Crescimento</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Janeiro</td>
                            <td>R$ 45.320,00</td>
                            <td>R$ 4.532,00</td>
                            <td>R$ 40.788,00</td>
                            <td class="text-success">+12%</td>
                          </tr>
                          <tr>
                            <td>Fevereiro</td>
                            <td>R$ 52.150,00</td>
                            <td>R$ 5.215,00</td>
                            <td>R$ 46.935,00</td>
                            <td>  5.215,00</td>
                            <td>R$ 46.935,00</td>
                            <td class="text-success">+15%</td>
                          </tr>
                          <tr>
                            <td>Março</td>
                            <td>R$ 48.730,00</td>
                            <td>R$ 4.873,00</td>
                            <td>R$ 43.857,00</td>
                            <td class="text-danger">-6%</td>
                          </tr>
                          <tr>
                            <td>Abril</td>
                            <td>R$ 56.420,00</td>
                            <td>R$ 5.642,00</td>
                            <td>R$ 50.778,00</td>
                            <td class="text-success">+16%</td>
                          </tr>
                          <tr>
                            <td>Maio</td>
                            <td>R$ 62.180,00</td>
                            <td>R$ 6.218,00</td>
                            <td>R$ 55.962,00</td>
                            <td class="text-success">+10%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Settings -->
          <div v-if="activeMenuItem === 'settings'">
            <h4 class="mb-4">Configurações</h4>
            
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <ul class="nav nav-tabs" id="settingsTabs" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="notifications-tab" data-bs-toggle="tab" data-bs-target="#notifications" type="button" role="tab" aria-controls="notifications" aria-selected="false">Notificações</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment" type="button" role="tab" aria-controls="payment" aria-selected="false">Pagamentos</button>
                  </li>
                </ul>
                <div class="tab-content p-3" id="settingsTabsContent">
                  <div class="tab-pane fade" id="notifications" role="tabpanel" aria-labelledby="notifications-tab">
                    <h5 class="mb-4">Configurações de Notificações</h5>
                    <form>
                      <div class="mb-3">
                        <label class="form-label">Notificações por Email</label>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="emailNewEvent">
                          <label class="form-check-label" for="emailNewEvent">Atualizações de vendas</label>
                        </div>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="emailSales" checked>
                          <label class="form-check-label" for="emailSales">Relatórios de vendas</label>
                        </div>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="emailSystem" >
                          <label class="form-check-label" for="emailSystem">Alertas do sistema</label>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Notificações no Sistema</label>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="emailSales" checked>
                          <label class="form-check-label" for="emailSales">Relatórios de vendas</label>
                        </div>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="emailSystem" checked>
                          <label class="form-check-label" for="emailSystem">Alertas do sistema</label>
                        </div>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="systemSales" checked>
                          <label class="form-check-label" for="systemSales">Atualizações de vendas</label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="payment-tab">
                    <h5 class="mb-4">Configurações de Pagamento</h5>
                    <form>
                      <div class="mb-3">
                        <label for="paymentGateway" class="form-label">Gateway de Pagamento</label>
                        <select class="form-select" id="paymentGateway">
                          <option value="stripe" selected>Stripe</option>
                          <option value="paypal">PayPal</option>
                          <option value="mercadopago">Mercado Pago</option>
                          <option value="pagseguro">PagSeguro</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="apiKey" class="form-label">Chave de API</label>
                        <input type="text" class="form-control" id="apiKey" value="sk_test_51HZ3kDJK8zT5Plk2A3XVs">
                      </div>
                      <div class="mb-3">
                        <label for="secretKey" class="form-label">Chave Secreta</label>
                        <input type="password" class="form-control" id="secretKey" value="••••••••••••••••••••••••">
                      </div>
                      <div class="mb-3">
                        <label for="serviceFee" class="form-label">Taxa de Serviço (%)</label>
                        <input type="number" class="form-control" id="serviceFee" value="10">
                      </div>
                      <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Add Event Modal -->
      <div class="modal fade" id="addEventModal" tabindex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addEventModalLabel">{{ isEditing ? 'Editar Evento' : 'Adicionar Novo Evento' }}</h5>
                <button type="button" class="btn-close" @click="closeAddEventModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addEvent">
                <div class="row g-3">
                  <div class="col-md-12">
                    <label for="nomeevento" class="form-label">Nome do Evento*</label>
                    <input type="text" class="form-control" id="nomeevento" 
                      v-model="newEvent.nomeevento" required
                      placeholder="Digite o nome do evento">
                  </div>
                  
                  <div class="col-md-6">
                    <label for="categoria" class="form-label">Categoria*</label>
                    <select class="form-select" id="categoria" v-model="newEvent.categoria" required>
                      <option value="">Selecione uma categoria</option>
                      <option value="Música">Música</option>
                      <option value="Esporte">Esporte</option>
                      <option value="Arte">Arte</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Gastronomia">Gastronomia</option>
                    </select>
                  </div>
                  
                  <div class="col-md-4">
                    <label for="datainicio" class="form-label">Data de Início*</label>
                    <input type="date" class="form-control" id="datainicio"
                      v-model="newEvent.datainicio" required>
                  </div>
                  
                  <div class="col-md-4">
                    <label for="horainicio" class="form-label">Hora de Início</label>
                    <input type="time" class="form-control" id="horainicio"
                      v-model="newEvent.horainicio" step="3600">
                  </div>
                  
                  <div class="col-md-4">
                    <label for="datafim" class="form-label">Data de Término</label>
                    <input type="date" class="form-control" id="datafim"
                      v-model="newEvent.datafim">
                  </div>
                  
                  <div class="col-md-4">
                    <label for="horafim" class="form-label">Hora de Término</label>
                    <input type="time" class="form-control" id="horafim"
                      v-model="newEvent.horafim" step="3600">
                  </div>
                  
                  <div class="col-md-4">
                    <label for="quantidadeingresso" class="form-label">Quant. Ingressos</label>
                    <input type="number" class="form-control" id="quantidadeingresso"
                      v-model.number="newEvent.quantidadeingresso" min="0">
                  </div>
                  
                  <div class="col-md-4">
                    <label for="status" class="form-label">Status</label>
                    <select class="form-select" id="status" v-model="newEvent.status">
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                    </select>
                  </div>
                  
                  <div class="col-md-12">
                    <label for="local" class="form-label">Local*</label>
                    <input type="text" class="form-control" id="local"
                      v-model="newEvent.local" required
                      placeholder="Digite o local do evento">
                  </div>
                  
                  <div class="col-md-12">
                    <label for="descricao" class="form-label">Descrição*</label>
                    <textarea class="form-control" id="descricao" rows="4"
                      v-model="newEvent.descricao" required
                      placeholder="Digite a descrição do evento"></textarea>
                  </div>
                  
                  <div class="col-md-12">
                    <label for="imagem" class="form-label">Imagem</label>
                    <input type="text" class="form-control" id="imagem"
                      v-model="newEvent.imagemevento"
                      placeholder="URL da Imagem do Evento">
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeAddEventModal">Cancelar</button>
              <button type="button" class="btn btn-primary" @click="addEvent">{{ isEditing ? 'Atualizar Evento' : 'Salvar Evento' }}</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Add/Edit Ingresso Modal -->
      <div class="modal fade" id="ingressoModal" tabindex="-1" aria-labelledby="ingressoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ingressoModalLabel">{{ isEditingIngresso ? 'Editar Ingresso' : 'Adicionar Novo Ingresso' }}</h5>
              <button type="button" class="btn-close" @click="closeIngressoModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="saveIngresso">
                <div class="row g-3">
                  <div class="col-md-12">
                    <label for="ingressoEvento" class="form-label">Evento*</label>
                    <select class="form-select" id="ingressoEvento" v-model="newIngresso.eventoId" @change="onEventoSelected" required>
                      <option value="">Selecione um evento</option>
                      <option v-for="evento in events" :key="evento.id" :value="evento.id">
                        {{ evento.nomeevento }} {{ evento.quantidadeingresso ? `(${evento.quantidadeingresso} ingressos)` : '' }}
                      </option>
                    </select>
                  </div>
                  
                  <div class="col-md-6">
                    <label for="tipoIngresso" class="form-label">Tipo de Ingresso</label>
                    <input type="text" class="form-control" id="tipoIngresso" 
                      v-model="newIngresso.tipoingresso"
                      placeholder="Ex: VIP, Pista, Camarote">
                  </div>
                  
                  <div class="col-md-6">
                    <label for="precoIngresso" class="form-label">Preço (R$)*</label>
                    <input type="number" class="form-control" id="precoIngresso"
                      v-model.number="newIngresso.preco" step="0.01" min="0"
                      placeholder="0.00 para gratuito" required>
                    <div class="form-text">Digite 0 para ingressos gratuitos</div>
                  </div>
                  
                  <div class="col-md-6">
                    <label for="quantidadeTotal" class="form-label">Quantidade Total*</label>
                    <input type="number" class="form-control" id="quantidadeTotal"
                      v-model.number="newIngresso.quantidadeTotal" min="1"
                      :max="getEventoQuantidadeIngressos(newIngresso.eventoId)"
                      placeholder="0" required>
                    <div class="form-text" v-if="newIngresso.eventoId">
                      Máximo baseado no evento: {{ getEventoQuantidadeIngressos(newIngresso.eventoId) || 'N/A' }}
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <label for="quantidadeDisponivel" class="form-label">Quantidade Disponível*</label>
                    <input type="number" class="form-control" id="quantidadeDisponivel"
                      v-model.number="newIngresso.quantidadeDisponivel" min="0"
                      :max="newIngresso.quantidadeTotal || getEventoQuantidadeIngressos(newIngresso.eventoId)"
                      placeholder="0" required>
                    <div class="form-text">
                      Máximo: {{ newIngresso.quantidadeTotal || getEventoQuantidadeIngressos(newIngresso.eventoId) || 0 }}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeIngressoModal">Cancelar</button>
              <button type="button" class="btn btn-primary" @click="saveIngresso">{{ isEditingIngresso ? 'Atualizar Ingresso' : 'Salvar Ingresso' }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Ingresso Confirmation Modal -->
      <div class="modal fade" id="deleteIngressoModal" tabindex="-1" aria-labelledby="deleteIngressoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteIngressoModalLabel">Confirmar Exclusão</h5>
              <button type="button" class="btn-close" @click="closeDeleteIngressoModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Tem certeza que deseja excluir este ingresso?</p>
              <p class="text-danger">Esta ação não pode ser desfeita.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeDeleteIngressoModal">Cancelar</button>
              <button type="button" class="btn btn-danger" @click="deleteIngresso">Excluir</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Event Confirmation Modal -->
      <div class="modal fade" id="deleteEventModal" tabindex="-1" aria-labelledby="deleteEventModalLabel" aria-hidden="true">

        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteEventModalLabel">Confirmar Exclusão</h5>
              <button type="button" class="btn-close" @click="closeDeleteModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Tem certeza que deseja excluir o evento <strong>{{ eventToDelete?.nomeevento }}</strong>?</p>
              <p class="text-danger">Esta ação não pode ser desfeita.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancelar</button>
              <button type="button" class="btn btn-danger" @click="deleteEvent">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
  import { criarEvento, atualizarEvento, deletarEvento, getEventosPorOrganizador, getIngressosPorEvento, getUsuarioById, criarIngresso, atualizarIngresso, deletarIngresso, listarPedidos, atualizarStatusPedido } from '@/services/api';
  import { jwtDecode } from 'jwt-decode';
  import Swal from 'sweetalert2';

  export default {
    name: 'AdminPainel',
    data() {
      return {
        sidebarCollapsed: false,
        activeMenuItem: 'dashboard',
        showAddEventModal: false,
        isEditing: false,
        editingEventId: null,
        newEvent: {
          nomeevento: '',
          descricao: '',
          datainicio: '',
          datafim: '',
          horainicio: '00:00:00',
          horafim: '00:00:00',
          local: '',
          imagemevento: '',
          categoria: '',
          quantidadeingresso: 0,
          status: 'ativo',
          organizadorId: null
        },
        showDeleteEventModal: false,
        eventToDelete: null,
        searchQuery: '',
        filterCategory: '',
        filterStatus: '',
        selectAll: false,
        menuItems: [
          { id: 'dashboard', name: 'Dashboard', icon: 'bi-speedometer2' },
          { id: 'events', name: 'Eventos', icon: 'bi-calendar-event' },
          { id: 'ingressos', name: 'Ingressos', icon: 'bi-ticket-perforated' },
          { id: 'pedidos', name: 'Pedidos', icon: 'bi-cart-check' },
          { id: 'reports', name: 'Relatórios', icon: 'bi-bar-chart' },
          { id: 'settings', name: 'Configurações', icon: 'bi-gear' }
        ],
        events: [],
        organizadorId: null,
        userName: 'Organizador',
        userImage: null, // Será definido no fetchUserData
        // Ingressos
        ingressos: [],
        showIngressoModal: false,
        isEditingIngresso: false,
        editingIngressId: null,
        newIngresso: {
          eventoId: '',
          tipoingresso: '',
          preco: '',
          quantidadeTotal: '',
          quantidadeDisponivel: ''
        },
        ingressoToDelete: null,
        showDeleteIngressoModal: false,
        // Pedidos
        pedidos: [],
        filterStatusPedido: '',
        pedidoToUpdate: null
      };
    },
    computed: {
      currentPageTitle() {
        const menuItem = this.menuItems.find(item => item.id === this.activeMenuItem);
        return menuItem ? menuItem.name : '';
      },
      filteredEvents() {
        return this.events.filter(event => {
          const matchesSearch = this.searchQuery === '' || 
            event.nomeevento?.toLowerCase().includes(this.searchQuery.toLowerCase()) || // ✅ Corrigido: event.nomeevento
            event.id?.toString().includes(this.searchQuery.toLowerCase());
          
          const matchesCategory = this.filterCategory === '' || event.categoria === this.filterCategory;
          const matchesStatus = this.filterStatus === '' || event.status === this.filterStatus;
          
          return matchesSearch && matchesCategory && matchesStatus;
        });
      },
      totalEventos() {
        return this.events.length || 0;
      },
      totalIngressosVendidos() {
        // Filtrar apenas pedidos confirmados do organizador
        const pedidosConfirmados = this.pedidos.filter(p => p.statusPagamento === 'confirmado');
        
        // Somar a quantidade de ingressos de cada pedido confirmado
        const total = pedidosConfirmados.reduce((soma, pedido) => {
          return soma + (parseInt(pedido.quantidade) || 0);
        }, 0);
        
        return total;
      },
      totalUsuariosAtivos() {
        // Filtrar apenas pedidos confirmados do organizador
        const pedidosConfirmados = this.pedidos.filter(p => p.statusPagamento === 'confirmado');
        
        // Extrair UsuarioId únicos dos pedidos confirmados
        // Usar UsuarioId direto ou pedido.usuario?.id se disponível
        const usuariosUnicos = new Set();
        
        pedidosConfirmados.forEach(pedido => {
          // Tentar pegar o ID do usuário de diferentes formas possíveis
          const usuarioId = pedido.UsuarioId || pedido.usuario?.id || pedido.usuario?.UsuarioId;
          if (usuarioId) {
            usuariosUnicos.add(usuarioId);
          }
        });
        
        // Retornar a quantidade de usuários únicos
        return usuariosUnicos.size;
      },
      totalReceita() {
        // Filtrar apenas pedidos confirmados do organizador
        const pedidosConfirmados = this.pedidos.filter(p => p.statusPagamento === 'confirmado');
        
        // Somar o valorTotal de cada pedido confirmado
        const total = pedidosConfirmados.reduce((soma, pedido) => {
          const valor = parseFloat(pedido.valorTotal) || 0;
          return soma + valor;
        }, 0);
        
        return total;
      },
      filteredPedidos() {
        if (!this.filterStatusPedido) {
          return this.pedidos;
        }
        return this.pedidos.filter(p => p.statusPagamento === this.filterStatusPedido);
      }
    },
    created() {
      this.getOrganizadorId();
      this.fetchUserData();
      this.fetchEvents();
      this.fetchPedidos();
    },
    methods: {
      getOrganizadorId() {
        try {
          const token = localStorage.getItem('token');
          
          if (!token || typeof token !== 'string' || token.trim() === '') {
            console.error('Token inválido ou não encontrado');
            this.$router.push('/auth/login');
            return;
          }

          const decoded = jwtDecode(token);
          this.organizadorId = decoded.id;
          
          if (!this.organizadorId) {
            console.error('ID do organizador não encontrado no token');
          }
        } catch (error) {
          console.error('Erro ao decodificar token:', error);
          localStorage.removeItem('token');
          this.$router.push('/auth/login');
        }
      },
      async fetchUserData() {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token não encontrado!');
          return;
        }
        
        try {
          const decodedToken = jwtDecode(token);
          this.userName = decodedToken.nome || 'Organizador';
          
          // Buscar dados completos do usuário para pegar a imagem
          const userId = decodedToken.id;
          if (userId) {
            try {
              const userData = await getUsuarioById(userId, token);
              // Se o usuário tiver imagem, usar ela, senão usar a logo
              if (userData.imagemusuario) {
                this.userImage = userData.imagemusuario;
              } else {
                // Usar a logo padrão do Conecta
                this.userImage = '../../assets/logo.svg';
              }
            } catch (error) {
              console.error('Erro ao buscar dados do usuário:', error);
              // Em caso de erro, usar a logo padrão
              this.userImage = '../../assets/logo.svg';
            }
          } else {
            // Se não tiver userId, usar logo padrão
            this.userImage = '../../assets/logo.svg';
          }
        } catch (error) {
          console.error('Erro ao decodificar token:', error);
          // Em caso de erro, usar logo padrão
          this.userImage = '../../assets/logo.svg';
        }
      },
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/auth/login");
      },

      async fetchEvents() {
        if (!this.organizadorId) {
          console.error('Organizador ID não disponível');
          return;
        }

        this.isLoading = true;
        try {
          // Buscar apenas eventos do organizador logado
          const eventos = await getEventosPorOrganizador(this.organizadorId);
          
          // Buscar ingressos de cada evento usando EventoId
          const eventosComIngressos = [];
          for (const evento of eventos) {
            try {
              // Buscar ingressos deste evento específico usando EventoId
              const ingressosDoEvento = await getIngressosPorEvento(evento.id);
              
              eventosComIngressos.push({
                ...evento,
                ingressos: ingressosDoEvento,
                precoMinimo:
                  ingressosDoEvento.length > 0
                    ? Math.min(...ingressosDoEvento.map((i) => parseFloat(i.preco)))
                    : 0,
              });
            } catch (error) {
              console.error(`Erro ao buscar ingressos do evento ${evento.id}:`, error);
              // Adicionar evento mesmo sem ingressos
              eventosComIngressos.push({
                ...evento,
                ingressos: [],
                precoMinimo: 0,
              });
            }
          }

          this.events = eventosComIngressos;
          this.error = null;
          
          // Buscar ingressos após carregar eventos (para a tabela de ingressos)
          await this.fetchIngressos();
        } catch (err) {
          console.error("Erro na API:", err);
          this.error = "Não foi possível carregar os dados";
        } finally {
          this.isLoading = false;
        }
      },

      async addEvent() {
        try {
          if (!this.validateEventForm()) return;
          
          if (!this.organizadorId) {
            Swal.fire({
              icon: 'error',
              title: 'Erro de autenticação',
              text: 'Faça login novamente.',
              confirmButtonColor: '#dc3545'
            }).then(() => {
              this.$router.push('/auth/login');
            });
            return;
          }
          
          const eventData = {
            nomeevento: this.newEvent.nomeevento,
            descricao: this.newEvent.descricao,
            datainicio: this.newEvent.datainicio,
            datafim: this.newEvent.datafim || null,
            horainicio: this.newEvent.horainicio,
            horafim: this.newEvent.horafim,
            local: this.newEvent.local,
            imagemevento: this.newEvent.imagemevento || 'https://placehold.co/600x400',
            categoria: this.newEvent.categoria,
            quantidadeingresso: parseInt(this.newEvent.quantidadeingresso) || 0,
            status: this.newEvent.status,
            OrganizadorId: this.organizadorId 
          };

          if (this.isEditing && this.editingEventId) {
            // Atualizar evento existente
            await atualizarEvento(this.editingEventId, eventData);
            await Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Evento atualizado com sucesso!',
              timer: 2000,
              showConfirmButton: false
            });
          } else {
            // Criar novo evento
            await criarEvento(eventData);
            await Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Evento adicionado com sucesso!',
              timer: 2000,
              showConfirmButton: false
            });
          }
          
          await this.fetchEvents();
          this.closeAddEventModal();
          
        } catch (error) {
          console.error('Erro ao salvar evento:', error);
          let errorMessage = this.isEditing ? 'Erro ao atualizar evento' : 'Erro ao adicionar evento';
          
          if (error.response) {
            if (error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            } else if (error.response.status === 401) {
              errorMessage = 'Você não está autenticado';
            } else if (error.response.status === 403) {
              errorMessage = 'Você não tem permissão para esta ação';
            }
          }
          
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: errorMessage,
            confirmButtonColor: '#dc3545'
          }).then(() => {
            if (error.response?.status === 401) {
              this.$router.push('/auth/login');
            }
          });
        }
      },

  validateEventForm() {
  const errors = [];
  
  if (!this.newEvent.nomeevento?.trim()) errors.push('Nome do evento é obrigatório');
  if (!this.newEvent.categoria) errors.push('Categoria é obrigatória');
  if (!this.newEvent.datainicio) errors.push('Data de início é obrigatória');
  if (!this.newEvent.local?.trim()) errors.push('Local é obrigatório');
  if (!this.newEvent.descricao?.trim()) errors.push('Descrição é obrigatória');
  
  if (this.newEvent.datafim && new Date(this.newEvent.datafim) < new Date(this.newEvent.datainicio)) {
    errors.push('Data de término deve ser após a data de início');
  }

  if (errors.length > 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos inválidos',
      html: errors.map(err => `• ${err}`).join('<br>'),
      confirmButtonColor: '#7749F8'
    });
    return false;
  }

  return true;},

  formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  },
  formatNumber(value) {
    if (!value && value !== 0) return '0';
    return parseInt(value).toLocaleString('pt-BR');
  },
  formatCurrency(value) {
    if (!value && value !== 0) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  },
  setActiveMenuItem(menuId) {
    this.activeMenuItem = menuId;
  },
  toggleSelectAll() {
    this.events.forEach(event => {
      event.selected = this.selectAll;
    });
  },
  resetFilters() {
    this.searchQuery = '';
    this.filterCategory = '';
    this.filterStatus = '';
  },
  openAddEventModal() {
    this.resetNewEventForm();
    this.$nextTick(() => {
      const modalElement = document.getElementById('addEventModal');
      if (modalElement) {
        // Bootstrap 5 está disponível globalmente via CDN
        const bootstrap = window.bootstrap;
        if (bootstrap && bootstrap.Modal) {
          // Verificar se já existe uma instância do modal
          let modal = bootstrap.Modal.getInstance(modalElement);
          if (!modal) {
            modal = new bootstrap.Modal(modalElement);
          }
          modal.show();
        } else {
          console.error('Bootstrap não está disponível');
        }
      }
    });
  },
  closeAddEventModal() {
    const modalElement = document.getElementById('addEventModal');
    if (modalElement) {
      const bootstrap = window.bootstrap;
      if (bootstrap && bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
    this.isEditing = false;
    this.editingEventId = null;
    this.resetNewEventForm();
  },
  resetNewEventForm() {
    this.newEvent = {
      nomeevento: '',
      descricao: '',
      datainicio: '',
      datafim: '',
      horainicio: '00:00:00',
      horafim: '00:00:00',
      local: '',
      imagemevento: '',
      categoria: '',
      quantidadeingresso: 0,
      status: 'ativo',
      organizadorId: null
    };
  },
  editEvent(event) {
    // Preencher o formulário com os dados do evento
    this.isEditing = true;
    this.editingEventId = event.id;
    this.newEvent = {
      nomeevento: event.nomeevento || '',
      descricao: event.descricao || '',
      datainicio: event.datainicio || '',
      datafim: event.datafim || '',
      horainicio: event.horainicio || '00:00:00',
      horafim: event.horafim || '00:00:00',
      local: event.local || '',
      imagemevento: event.imagemevento || '',
      categoria: event.categoria || '',
      quantidadeingresso: event.quantidadeingresso || 0,
      status: event.status || 'ativo',
      organizadorId: event.OrganizadorId || this.organizadorId
    };
    this.openAddEventModal();
  },
  viewEvent(event) {
    // Navegar para a página de detalhes do evento
    this.$router.push({ name: 'evento-detalhes', params: { id: event.id } });
  },
  openDeleteModal(event) {
    this.eventToDelete = event;
    this.showDeleteEventModal = true;
    this.$nextTick(() => {
      const modalElement = document.getElementById('deleteEventModal');
      if (modalElement) {
        const bootstrap = window.bootstrap;
        if (bootstrap && bootstrap.Modal) {
          let modal = bootstrap.Modal.getInstance(modalElement);
          if (!modal) {
            modal = new bootstrap.Modal(modalElement);
          }
          modal.show();
        }
      }
    });
  },
  closeDeleteModal() {
    const modalElement = document.getElementById('deleteEventModal');
    if (modalElement) {
      const bootstrap = window.bootstrap;
      if (bootstrap && bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
    this.showDeleteEventModal = false;
    this.eventToDelete = null;
  },
  async deleteEvent() {
    try {
      if (!this.eventToDelete) return;

      await deletarEvento(this.eventToDelete.id);
      await this.fetchEvents();
      this.closeDeleteModal();
      
      await Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Evento excluído com sucesso!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao excluir evento';
      
      Swal.fire({
        icon: 'error',
        title: 'Erro ao excluir',
        text: errorMessage,
        confirmButtonColor: '#dc3545'
      });
    }
  },
  getStatusBadgeClass(status) {
    switch (status) {
      case 'Publicado':
        return 'bg-success';
      case 'Rascunho':
        return 'bg-warning';
      case 'Cancelado':
        return 'bg-danger';
      case 'Concluído':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  },
  // Métodos de Ingressos
  async fetchIngressos() {
    try {
      if (!this.organizadorId || this.events.length === 0) {
        console.error('Organizador ID não disponível ou eventos não carregados');
        this.ingressos = [];
        return;
      }
      
      // Buscar ingressos de cada evento do organizador
      const eventosIds = this.events.map(e => e.id);
      const todosIngressos = [];
      
      // Buscar ingressos para cada evento
      for (const eventoId of eventosIds) {
        try {
          const ingressosDoEvento = await getIngressosPorEvento(eventoId);
          todosIngressos.push(...ingressosDoEvento);
        } catch (error) {
          console.error(`Erro ao buscar ingressos do evento ${eventoId}:`, error);
        }
      }
      
      this.ingressos = todosIngressos;
    } catch (error) {
      console.error('Erro ao buscar ingressos:', error);
      this.ingressos = [];
    }
  },
  getEventoNome(eventoId) {
    const evento = this.events.find(e => e.id === eventoId);
    return evento ? evento.nomeevento : 'Evento não encontrado';
  },
  getEventoQuantidadeIngressos(eventoId) {
    if (!eventoId) return null;
    const evento = this.events.find(e => e.id === parseInt(eventoId));
    return evento ? (evento.quantidadeingresso || 0) : null;
  },
  openAddIngressoModal() {
    this.resetIngressoForm();
    this.$nextTick(() => {
      const modalElement = document.getElementById('ingressoModal');
      if (modalElement) {
        const bootstrap = window.bootstrap;
        if (bootstrap && bootstrap.Modal) {
          let modal = bootstrap.Modal.getInstance(modalElement);
          if (!modal) {
            modal = new bootstrap.Modal(modalElement);
          }
          modal.show();
        }
      }
    });
  },
  closeIngressoModal() {
    const modalElement = document.getElementById('ingressoModal');
    if (modalElement) {
      const bootstrap = window.bootstrap;
      if (bootstrap && bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
    this.isEditingIngresso = false;
    this.editingIngressId = null;
    this.resetIngressoForm();
  },
  resetIngressoForm() {
    this.newIngresso = {
      eventoId: '',
      tipoingresso: '',
      preco: '',
      quantidadeTotal: '',
      quantidadeDisponivel: ''
    };
  },
  onEventoSelected() {
    // Quando um evento é selecionado, preencher automaticamente a quantidade total
    if (this.newIngresso.eventoId) {
      const quantidadeEvento = this.getEventoQuantidadeIngressos(this.newIngresso.eventoId);
      if (quantidadeEvento && quantidadeEvento > 0) {
        this.newIngresso.quantidadeTotal = quantidadeEvento;
        // Por padrão, quantidade disponível = quantidade total
        this.newIngresso.quantidadeDisponivel = quantidadeEvento;
      }
    } else {
      this.newIngresso.quantidadeTotal = '';
      this.newIngresso.quantidadeDisponivel = '';
    }
  },
  editIngresso(ingresso) {
    this.isEditingIngresso = true;
    this.editingIngressId = ingresso.id;
    this.newIngresso = {
      eventoId: ingresso.EventoId || '',
      tipoingresso: ingresso.tipoingresso || '',
      preco: ingresso.preco || '',
      quantidadeTotal: ingresso.quantidadeTotal || '',
      quantidadeDisponivel: ingresso.quantidadeDisponivel || ''
    };
    this.openAddIngressoModal();
  },
  async saveIngresso() {
    try {
      if (!this.validateIngressoForm()) return;
      
      if (!this.organizadorId) {
        Swal.fire({
          icon: 'error',
          title: 'Erro de autenticação',
          text: 'Faça login novamente.',
          confirmButtonColor: '#dc3545'
        }).then(() => {
          this.$router.push('/auth/login');
        });
        return;
      }
      
      const precoValue = this.newIngresso.preco === '' || this.newIngresso.preco === null || this.newIngresso.preco === undefined 
        ? 0 
        : parseFloat(this.newIngresso.preco);
      
      const ingressoData = {
        usuarioId: this.organizadorId,
        eventoId: parseInt(this.newIngresso.eventoId),
        tipoingresso: this.newIngresso.tipoingresso || null,
        preco: precoValue >= 0 ? precoValue : 0,
        quantidadeTotal: parseInt(this.newIngresso.quantidadeTotal) || 0,
        quantidadeDisponivel: parseInt(this.newIngresso.quantidadeDisponivel) || 0
      };

      if (this.isEditingIngresso && this.editingIngressId) {
        // Atualizar ingresso existente
        try {
          await atualizarIngresso(this.editingIngressId, ingressoData);
          await Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Ingresso atualizado com sucesso!',
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          if (error.response?.status === 404 || error.response?.status === 501) {
            Swal.fire({
              icon: 'info',
              title: 'Funcionalidade não disponível',
              text: 'A edição de ingressos ainda não está implementada no backend.',
              confirmButtonColor: '#7749F8'
            });
            return;
          }
          throw error;
        }
      } else {
        // Criar novo ingresso
        await criarIngresso(ingressoData);
        await Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Ingresso adicionado com sucesso!',
          timer: 2000,
          showConfirmButton: false
        });
      }
      
      await this.fetchIngressos();
      this.closeIngressoModal();
      
    } catch (error) {
      console.error('Erro ao salvar ingresso:', error);
      let errorMessage = this.isEditingIngresso ? 'Erro ao atualizar ingresso' : 'Erro ao adicionar ingresso';
      
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = 'Você não está autenticado';
        } else if (error.response.status === 403) {
          errorMessage = 'Você não tem permissão para esta ação';
        } else if (error.response.status === 404) {
          errorMessage = 'Evento ou usuário não encontrado';
        }
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
        confirmButtonColor: '#dc3545'
      }).then(() => {
        if (error.response?.status === 401) {
          this.$router.push('/auth/login');
        }
      });
    }
  },
  validateIngressoForm() {
    const errors = [];
    
    if (!this.newIngresso.eventoId) errors.push('Evento é obrigatório');
    if (this.newIngresso.preco === '' || this.newIngresso.preco === null || parseFloat(this.newIngresso.preco) < 0) {
      errors.push('Preço deve ser um valor válido (0 para gratuito)');
    }
    const quantidadeMaximaEvento = this.getEventoQuantidadeIngressos(this.newIngresso.eventoId);
    
    if (!this.newIngresso.quantidadeTotal || parseInt(this.newIngresso.quantidadeTotal) < 1) {
      errors.push('Quantidade total deve ser maior que zero');
    }
    
    if (quantidadeMaximaEvento && parseInt(this.newIngresso.quantidadeTotal) > quantidadeMaximaEvento) {
      errors.push(`Quantidade total não pode ser maior que ${quantidadeMaximaEvento} (quantidade do evento)`);
    }
    
    if (this.newIngresso.quantidadeDisponivel === '' || parseInt(this.newIngresso.quantidadeDisponivel) < 0) {
      errors.push('Quantidade disponível deve ser um valor válido');
    }
    
    if (parseInt(this.newIngresso.quantidadeDisponivel) > parseInt(this.newIngresso.quantidadeTotal)) {
      errors.push('Quantidade disponível não pode ser maior que a quantidade total');
    }

    if (errors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos inválidos',
        html: errors.map(err => `• ${err}`).join('<br>'),
        confirmButtonColor: '#7749F8'
      });
      return false;
    }

    return true;
  },
  openDeleteIngressoModal(ingresso) {
    this.ingressoToDelete = ingresso;
    this.$nextTick(() => {
      const modalElement = document.getElementById('deleteIngressoModal');
      if (modalElement) {
        const bootstrap = window.bootstrap;
        if (bootstrap && bootstrap.Modal) {
          let modal = bootstrap.Modal.getInstance(modalElement);
          if (!modal) {
            modal = new bootstrap.Modal(modalElement);
          }
          modal.show();
        }
      }
    });
  },
  closeDeleteIngressoModal() {
    const modalElement = document.getElementById('deleteIngressoModal');
    if (modalElement) {
      const bootstrap = window.bootstrap;
      if (bootstrap && bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
    this.ingressoToDelete = null;
  },
  async deleteIngresso() {
    try {
      if (!this.ingressoToDelete) return;

      await deletarIngresso(this.ingressoToDelete.id, this.organizadorId);
      await this.fetchIngressos();
      this.closeDeleteIngressoModal();
      
      await Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Ingresso excluído com sucesso!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Erro ao excluir ingresso:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao excluir ingresso';
      
      Swal.fire({
        icon: 'error',
        title: 'Erro ao excluir',
        text: errorMessage,
        confirmButtonColor: '#dc3545'
      });
    }
  },
  // Métodos de Pedidos
  async fetchPedidos() {
    try {
      if (!this.organizadorId) {
        console.error('Organizador ID não disponível');
        this.pedidos = [];
        return;
      }
      
      // Sempre buscar TODOS os pedidos do organizador (sem filtro de status)
      // O filtro de status será aplicado apenas no computed filteredPedidos para a tabela
      const filtros = {
        OrganizadorId: this.organizadorId
      };
      
      const token = localStorage.getItem('token');
      const pedidos = await listarPedidos(token, filtros);
      this.pedidos = pedidos || [];
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      this.pedidos = [];
    }
  },
  resetFilterPedidos() {
    this.filterStatusPedido = '';
    this.fetchPedidos();
  },
  getStatusPedidoLabel(status) {
    const labels = {
      'aguarde': 'Aguardando',
      'confirmado': 'Confirmado',
      'cancelado': 'Cancelado'
    };
    return labels[status] || status;
  },
  getStatusPedidoBadgeClass(status) {
    switch (status) {
      case 'confirmado':
        return 'bg-success';
      case 'aguarde':
        return 'bg-warning';
      case 'cancelado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  },
  async atualizarStatusPedido(pedido, novoStatus) {
    try {
      const confirmText = novoStatus === 'confirmado' 
        ? 'Tem certeza que deseja confirmar este pagamento?'
        : 'Tem certeza que deseja cancelar este pedido?';
      
      const result = await Swal.fire({
        icon: 'question',
        title: 'Confirmar ação',
        text: confirmText,
        showCancelButton: true,
        confirmButtonColor: novoStatus === 'confirmado' ? '#28a745' : '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      });

      if (!result.isConfirmed) return;

      const token = localStorage.getItem('token');
      await atualizarStatusPedido(pedido.id, { statusPagamento: novoStatus }, token);
      
      await Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: `Status do pedido atualizado para ${this.getStatusPedidoLabel(novoStatus)}`,
        timer: 2000,
        showConfirmButton: false
      });

      await this.fetchPedidos();
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível atualizar o status do pedido.',
        confirmButtonColor: '#dc3545'
      });
    }
  },
  viewPedidoDetails(pedido) {
    const details = `
      <div class="text-start">
        <p><strong>ID:</strong> ${pedido.id}</p>
        <p><strong>Cliente:</strong> ${pedido.usuario?.nome || 'N/A'} (${pedido.usuario?.email || 'N/A'})</p>
        <p><strong>Evento:</strong> ${pedido.evento?.nomeevento || 'N/A'}</p>
        <p><strong>Ingresso:</strong> ${pedido.ingresso?.tipoingresso || 'N/A'}</p>
        <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
        <p><strong>Valor Total:</strong> R$ ${parseFloat(pedido.valorTotal || 0).toFixed(2).replace('.', ',')}</p>
        <p><strong>Status:</strong> ${this.getStatusPedidoLabel(pedido.statusPagamento)}</p>
        <p><strong>Preference ID:</strong> ${pedido.preferenceId || 'N/A'}</p>
        <p><strong>Payment ID:</strong> ${pedido.paymentId || 'N/A'}</p>
        <p><strong>Data:</strong> ${this.formatDate(pedido.createdAt)}</p>
      </div>
    `;
    
    Swal.fire({
      icon: 'info',
      title: 'Detalhes do Pedido',
      html: details,
      confirmButtonColor: '#7749F8'
    });
  }
}
  };
  </script>
  
  <style>
  /* Importando Bootstrap e Bootstrap Icons */
  @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");
  
  /* Estilos personalizados baseados nas cores da logo */
  :root {
    --primary-color: #7749F8; /* Roxo da logo */
    --secondary-color: #FF9933; /* Laranja da logo */
    --primary-rgb: 119, 73, 248;
    --secondary-rgb: 255, 153, 51;
    --sidebar-width: 250px;
    --sidebar-collapsed-width: 70px;
    --header-height: 60px;
  }
  
  /* Layout principal */
  .admin-dashboard {
    display: flex;
    min-height: 100vh;
  }
  
  /* Sidebar */
  .sidebar {
    width: var(--sidebar-width);
    background-color: white;
    color: #333;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
    position: fixed;
    height: 100vh;
    z-index: 1000;
    border-right: 1px solid #e9ecef;
  }
  
  .sidebar-collapsed {
    width: var(--sidebar-collapsed-width);
  }
  
  .sidebar-header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    border-bottom: 1px solid #e9ecef;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .sidebar-menu {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;
  }
  
  .sidebar-menu .nav-link {
    color: #495057;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.2s ease;
  }
  
  .sidebar-menu .nav-link:hover,
  .sidebar-menu .nav-link.active {
    color: var(--primary-color);
    background-color: rgba(var(--primary-rgb), 0.05);
    border-left: 3px solid var(--primary-color);
  }
  
  .sidebar-menu .nav-link i {
    font-size: 1.25rem;
  }
  
  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid #e9ecef;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f8f9fa;
  }
  
  .user-details {
    overflow: hidden;
  }
  
  .user-name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .user-role {
    font-size: 0.75rem;
  }
  
  .user-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .user-actions a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  /* Main Content */
  .main-content {
    flex: 1;
    margin-left: var(--sidebar-width);
    transition: margin-left 0.3s ease;
  }
  
  .main-content-expanded {
    margin-left: var(--sidebar-collapsed-width);
  }
  
  /* Header */
  .header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    background-color: white;
    border-bottom: 1px solid #e9ecef;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .page-title {
    font-size: 1.25rem;
    font-weight: 500;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
  }
  
  /* Dashboard Content */
  .dashboard-content {
    padding: 1.5rem;
    background-color: #f8f9fa;
    min-height: calc(100vh - var(--header-height));
  }
  
  /* Cards and Components */
  .card {
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .card-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1rem 1.25rem;
  }
  
  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
  
  .chart-placeholder {
    border-radius: 0.5rem;
  }
  
  /* Table Styles */
  .table th {
    font-weight: 500;
    color: #495057;
  }
  
  .event-image {
    width: 60px;
    height: 40px;
    overflow: hidden;
    border-radius: 0.25rem;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
  }
  
  /* Cores primárias e secundárias */
  .bg-primary {
    background-color: var(--primary-color) !important;
  }
  
  .text-primary {
    color: var(--primary-color) !important;
  }
  
  .btn-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }
  
  .btn-primary:hover {
    background-color: #6538e6;
    border-color: #6538e6;
  }
  
  .bg-secondary {
    background-color: var(--secondary-color) !important;
  }
  
  .text-secondary {
    color: var(--secondary-color) !important;
  }
  
  .btn-secondary {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
  }
  
  .btn-secondary:hover {
    background-color: #e68a2e;
    border-color: #e68a2e;
  }
  
  .bg-primary.bg-opacity-10 {
    background-color: rgba(var(--primary-rgb), 0.1) !important;
  }
  
  .bg-secondary.bg-opacity-10 {
    background-color: rgba(var(--secondary-rgb), 0.1) !important;
  }
  
  /* Pagination customization */
  .page-item.active .page-link {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }
  
  .page-link {
    color: var(--primary-color);
  }
  
  .page-link:hover {
    color: #6538e6;
  }
  
  /* Nav tabs customization */
  .nav-tabs .nav-link.active {
    color: var(--primary-color);
    border-color: #dee2e6 #dee2e6 #fff;
  }
  
  .nav-tabs .nav-link:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }
  
  /* Responsive */
  @media (max-width: 992px) {
    .sidebar {
      width: var(--sidebar-collapsed-width);
    }
    
    .main-content {
      margin-left: var(--sidebar-collapsed-width);
    }
    
    .sidebar:hover {
      width: var(--sidebar-width);
    }
  }
  
  @media (max-width: 768px) {
    .sidebar {
      width: 0;
    }
    
    .main-content {
      margin-left: 0;
    }
    
    .sidebar-collapsed {
      width: var(--sidebar-width);
    }
  }
  </style>