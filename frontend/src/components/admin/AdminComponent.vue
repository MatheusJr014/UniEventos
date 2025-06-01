<template>
    <div class="admin-dashboard">
      <!-- Sidebar -->
      <div class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <div class="sidebar-header">
          <div class="logo-container">
            <img v-if="!sidebarCollapsed" src="../assets/logo.svg" alt="Conecta Eventos Logo" height="100" class="logo">
            <img v-else class="logo-small">
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
              <img src="https://placehold.co/100x100" alt="Admin User" class="img-fluid rounded-circle">
            </div>
            <div class="user-details">
              <div class="user-name">Admin User</div>
              <div class="user-role text-muted">Administrador</div>
            </div>
          </div>
          <div class="user-actions">
            <a href="#" class="btn btn-sm btn-link text-primary" title="Configurações">
              <i class="bi bi-gear"></i>
              <span v-if="!sidebarCollapsed">Configurações</span>
            </a>
            <a href="#" class="btn btn-sm btn-link text-primary" title="Sair">
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
                <li><a class="dropdown-item" href="#">Configurações</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Sair</a></li>
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
                        <h2 class="card-title mb-0">245</h2>
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
                        <h2 class="card-title mb-0">1,842</h2>
                      </div>
                      <div class="icon-box bg-secondary bg-opacity-10 text-secondary">
                        <i class="bi bi-ticket-perforated"></i>
                      </div>
                    </div>
                    <div class="mt-3 small text-success">
                      <i class="bi bi-arrow-up"></i> 8% desde o mês passado
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
                        <h2 class="card-title mb-0">5,389</h2>
                      </div>
                      <div class="icon-box bg-primary bg-opacity-10 text-primary">
                        <i class="bi bi-people"></i>
                      </div>
                    </div>
                    <div class="mt-3 small text-success">
                      <i class="bi bi-arrow-up"></i> 15% desde o mês passado
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
                        <h2 class="card-title mb-0">R$ 98,5k</h2>
                      </div>
                      <div class="icon-box bg-secondary bg-opacity-10 text-secondary">
                        <i class="bi bi-currency-dollar"></i>
                      </div>
                    </div>
                    <div class="mt-3 small text-success">
                      <i class="bi bi-arrow-up"></i> 23% desde o mês passado
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
                          <tr v-for="(event, index) in recentEvents" :key="index">
                            <td>{{ event.name }}</td>
                            <td>{{ event.date }}</td>
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
                        <tbody>
                          <tr v-for="(user, index) in recentUsers" :key="index">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="avatar me-2">
                                  <img :src="user.avatar" alt="User Avatar" class="rounded-circle" width="32" height="32">
                                </div>
                                <div>{{ user.name }}</div>
                              </div>
                            </td>
                            <td>{{ user.type }}</td>
                            <td>{{ user.date }}</td>
                          </tr>
                        </tbody>
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
              <button class="btn btn-primary" @click="showAddEventModal = true">
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
                        <th scope="col">Organizador</th>
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
                              <img :src="event.image" :alt="event.name" class="rounded" width="60" height="40">
                            </div>
                            <div>
                              <div class="fw-bold">{{ event.name }}</div>
                              <div class="small text-muted">ID: {{ event.id }}</div>
                            </div>
                          </div>
                        </td>
                        <td>{{ event.organizer }}</td>
                        <td>{{ event.date }}</td>
                        <td>
                          <span class="badge bg-primary">{{ event.category }}</span>
                        </td>
                        <td>{{ event.tickets }}</td>
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
                            <button class="btn btn-sm btn-outline-danger" @click="confirmDeleteEvent(event)">
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
  
          <!-- Users Management -->
          <div v-if="activeMenuItem === 'users'">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h4 class="mb-0">Gerenciamento de Usuários</h4>
              <button class="btn btn-primary">
                <i class="bi bi-person-plus me-2"></i>Adicionar Usuário
              </button>
            </div>
  
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <div class="row g-3 mb-4">
                  <div class="col-md-6">
                    <div class="input-group">
                      <span class="input-group-text bg-white">
                        <i class="bi bi-search"></i>
                      </span>
                      <input type="text" class="form-control" placeholder="Buscar usuários...">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <select class="form-select">
                      <option value="">Todos os Tipos</option>
                      <option value="Cliente">Cliente</option>
                      <option value="Organizador">Organizador</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <select class="form-select">
                      <option value="">Todos os Status</option>
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Pendente">Pendente</option>
                    </select>
                  </div>
                </div>
  
                <div class="table-responsive">
                  <table class="table table-hover align-middle">
                    <thead class="table-light">
                      <tr>
                        <th scope="col">Usuário</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Status</th>
                        <th scope="col">Data de Cadastro</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, index) in users" :key="index">
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="avatar me-3">
                              <img :src="user.avatar" alt="User Avatar" class="rounded-circle" width="40" height="40">
                            </div>
                            <div>
                              <div class="fw-bold">{{ user.name }}</div>
                              <div class="small text-muted">ID: {{ user.id }}</div>
                            </div>
                          </div>
                        </td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.type }}</td>
                        <td>
                          <span class="badge" :class="getUserStatusBadgeClass(user.status)">
                            {{ user.status }}
                          </span>
                        </td>
                        <td>{{ user.date }}</td>
                        <td>
                          <div class="btn-group">
                            <button class="btn btn-sm btn-outline-secondary">
                              <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-secondary">
                              <i class="bi bi-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger">
                              <i class="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
  
                <div class="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <span class="text-muted">Mostrando 10 de 45 usuários</span>
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
                    <button class="nav-link active" id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">Geral</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="security-tab" data-bs-toggle="tab" data-bs-target="#security" type="button" role="tab" aria-controls="security" aria-selected="false">Segurança</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="notifications-tab" data-bs-toggle="tab" data-bs-target="#notifications" type="button" role="tab" aria-controls="notifications" aria-selected="false">Notificações</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment" type="button" role="tab" aria-controls="payment" aria-selected="false">Pagamentos</button>
                  </li>
                </ul>
                <div class="tab-content p-3" id="settingsTabsContent">
                  <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                    <h5 class="mb-4">Configurações Gerais</h5>
                    <form>
                      <div class="mb-3">
                        <label for="siteName" class="form-label">Nome do Site</label>
                        <input type="text" class="form-control" id="siteName" value="Conecta Eventos">
                      </div>
                      <div class="mb-3">
                        <label for="siteDescription" class="form-label">Descrição do Site</label>
                        <textarea class="form-control" id="siteDescription" rows="3">A melhor plataforma para encontrar e promover eventos no Brasil.</textarea>
                      </div>
                      <div class="mb-3">
                        <label for="contactEmail" class="form-label">Email de Contato</label>
                        <input type="email" class="form-control" id="contactEmail" value="contato@conectaeventos.com.br">
                      </div>
                      <div class="mb-3">
                        <label for="logoUpload" class="form-label">Logo do Site</label>
                        <input class="form-control" type="file" id="logoUpload">
                      </div>
                      <div class="mb-3">
                        <label for="faviconUpload" class="form-label">Favicon</label>
                        <input class="form-control" type="file" id="faviconUpload">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Redes Sociais</label>
                        <div class="input-group mb-2">
                          <span class="input-group-text"><i class="bi bi-facebook"></i></span>
                          <input type="text" class="form-control" placeholder="URL do Facebook" value="https://facebook.com/conectaeventos">
                        </div>
                        <div class="input-group mb-2">
                          <span class="input-group-text"><i class="bi bi-instagram"></i></span>
                          <input type="text" class="form-control" placeholder="URL do Instagram" value="https://instagram.com/conectaeventos">
                        </div>
                        <div class="input-group mb-2">
                          <span class="input-group-text"><i class="bi bi-twitter"></i></span>
                          <input type="text" class="form-control" placeholder="URL do Twitter" value="https://twitter.com/conectaeventos">
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
                    <h5 class="mb-4">Configurações de Segurança</h5>
                    <form>
                      <div class="mb-3 form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="twoFactorAuth" checked>
                        <label class="form-check-label" for="twoFactorAuth">Autenticação de dois fatores</label>
                        <div class="form-text">Requer verificação adicional ao fazer login</div>
                      </div>
                      <div class="mb-3 form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="loginNotifications" checked>
                        <label class="form-check-label" for="loginNotifications">Notificações de login</label>
                        <div class="form-text">Receba notificações quando houver login em sua conta</div>
                      </div>
                      <div class="mb-3">
                        <label for="sessionTimeout" class="form-label">Tempo limite da sessão (minutos)</label>
                        <input type="number" class="form-control" id="sessionTimeout" value="30">
                      </div>
                      <div class="mb-4">
                        <label for="passwordPolicy" class="form-label">Política de senhas</label>
                        <select class="form-select" id="passwordPolicy">
                          <option value="medium" selected>Média (mínimo 8 caracteres, letras e números)</option>
                          <option value="strong">Forte (mínimo 10 caracteres, letras, números e símbolos)</option>
                          <option value="very-strong">Muito forte (mínimo 12 caracteres, maiúsculas, minúsculas, números e símbolos)</option>
                        </select>
                      </div>
                      <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="notifications" role="tabpanel" aria-labelledby="notifications-tab">
                    <h5 class="mb-4">Configurações de Notificações</h5>
                    <form>
                      <div class="mb-3">
                        <label class="form-label">Notificações por Email</label>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="emailNewEvent" checked>
                          <label class="form-check-label" for="emailNewEvent">Novos eventos cadastrados</label>
                        </div>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="emailNewUser" checked>
                          <label class="form-check-label" for="emailNewUser">Novos usuários registrados</label>
                        </div>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="emailSales" checked>
                          <label class="form-check-label" for="emailSales">Relatórios de vendas</label>
                        </div>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="emailSystem" checked>
                          <label class="form-check-label" for="emailSystem">Alertas do sistema</label>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Notificações no Sistema</label>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="systemNewEvent" checked>
                          <label class="form-check-label" for="systemNewEvent">Novos eventos cadastrados</label>
                        </div>
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="systemNewUser" checked>
                          <label class="form-check-label" for="systemNewUser">Novos usuários registrados</label>
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
                      <div class="mb-3 form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="testMode" checked>
                        <label class="form-check-label" for="testMode">Modo de Teste</label>
                        <div class="form-text">As transações não serão processadas realmente</div>
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
      <div class="modal fade" id="addEventModal" tabindex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true" v-if="showAddEventModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addEventModalLabel">Adicionar Novo Evento</h5>
              <button type="button" class="btn-close" @click="showAddEventModal = false"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row g-3">
                  <div class="col-md-12">
                    <label for="eventName" class="form-label">Nome do Evento</label>
                    <input type="text" class="form-control" id="eventName" placeholder="Digite o nome do evento">
                  </div>
                  <div class="col-md-6">
                    <label for="eventCategory" class="form-label">Categoria</label>
                    <select class="form-select" id="eventCategory">
                      <option value="">Selecione uma categoria</option>
                      <option value="Festival">Festival</option>
                      <option value="Show">Show</option>
                      <option value="Conferência">Conferência</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Teatro">Teatro</option>
                      <option value="Esporte">Esporte</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="eventOrganizer" class="form-label">Organizador</label>
                    <select class="form-select" id="eventOrganizer">
                      <option value="">Selecione um organizador</option>
                      <option value="1">Produtora Eventos Brasil</option>
                      <option value="2">Show Produções</option>
                      <option value="3">Festival Company</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="eventStartDate" class="form-label">Data de Início</label>
                    <input type="date" class="form-control" id="eventStartDate">
                  </div>
                  <div class="col-md-6">
                    <label for="eventEndDate" class="form-label">Data de Término</label>
                    <input type="date" class="form-control" id="eventEndDate">
                  </div>
                  <div class="col-md-12">
                    <label for="eventLocation" class="form-label">Local</label>
                    <input type="text" class="form-control" id="eventLocation" placeholder="Digite o local do evento">
                  </div>
                  <div class="col-md-12">
                    <label for="eventDescription" class="form-label">Descrição</label>
                    <textarea class="form-control" id="eventDescription" rows="4" placeholder="Digite a descrição do evento"></textarea>
                  </div>
                  <div class="col-md-6">
                    <label for="eventImage" class="form-label">Imagem do Evento</label>
                    <input type="file" class="form-control" id="eventImage">
                  </div>
                  <div class="col-md-6">
                    <label for="eventStatus" class="form-label">Status</label>
                    <select class="form-select" id="eventStatus">
                      <option value="Rascunho">Rascunho</option>
                      <option value="Publicado">Publicado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showAddEventModal = false">Cancelar</button>
              <button type="button" class="btn btn-primary">Salvar Evento</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delete Event Confirmation Modal -->
      <div class="modal fade" id="deleteEventModal" tabindex="-1" aria-labelledby="deleteEventModalLabel" aria-hidden="true" v-if="showDeleteEventModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteEventModalLabel">Confirmar Exclusão</h5>
              <button type="button" class="btn-close" @click="showDeleteEventModal = false"></button>
            </div>
            <div class="modal-body">
              <p>Tem certeza que deseja excluir o evento <strong>{{ eventToDelete?.name }}</strong>?</p>
              <p class="text-danger">Esta ação não pode ser desfeita.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showDeleteEventModal = false">Cancelar</button>
              <button type="button" class="btn btn-danger" @click="deleteEvent">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminPainel',
    data() {
      return {
        sidebarCollapsed: false,
        activeMenuItem: 'dashboard',
        showAddEventModal: false,
        showDeleteEventModal: false,
        eventToDelete: null,
        searchQuery: '',
        filterCategory: '',
        filterStatus: '',
        selectAll: false,
        menuItems: [
          { id: 'dashboard', name: 'Dashboard', icon: 'bi-speedometer2' },
          { id: 'events', name: 'Eventos', icon: 'bi-calendar-event' },
          { id: 'users', name: 'Usuários', icon: 'bi-people' },
          { id: 'reports', name: 'Relatórios', icon: 'bi-bar-chart' },
          { id: 'settings', name: 'Configurações', icon: 'bi-gear' }
        ],
        events: [
          {
            id: 'EVT001',
            name: 'Festival de Música Verão 2023',
            organizer: 'Produtora Eventos Brasil',
            date: '15-17 Dez 2023',
            category: 'Festival',
            tickets: '1250/2000',
            status: 'Publicado',
            image: 'https://placehold.co/600x400',
            selected: false
          },
          {
            id: 'EVT002',
            name: 'Show de Rock Nacional',
            organizer: 'Show Produções',
            date: '22 Nov 2023',
            category: 'Show',
            tickets: '850/1000',
            status: 'Publicado',
            image: 'https://placehold.co/600x400',
            selected: false
          },
          {
            id: 'EVT003',
            name: 'Conferência de Tecnologia',
            organizer: 'Tech Events',
            date: '5-7 Dez 2023',
            category: 'Conferência',
            tickets: '320/500',
            status: 'Publicado',
            image: 'https://placehold.co/600x400',
            selected: false
          },
          {
            id: 'EVT004',
            name: 'Workshop de Fotografia',
            organizer: 'Arte Visual',
            date: '18 Nov 2023',
            category: 'Workshop',
            tickets: '45/50',
            status: 'Publicado',
            image: 'https://placehold.co/600x400',
            selected: false
          },
          {
            id: 'EVT005',
            name: 'Peça de Teatro: O Fantasma da Ópera',
            organizer: 'Teatro Municipal',
            date: '10 Dez 2023',
            category: 'Teatro',
            tickets: '180/300',
            status: 'Rascunho',
            image: 'https://placehold.co/600x400',
            selected: false
          },
          {
            id: 'EVT006',
            name: 'Campeonato de Futebol Amador',
            organizer: 'Liga Esportiva',
            date: '25-26 Nov 2023',
            category: 'Esporte',
            tickets: '0/500',
            status: 'Cancelado',
            image: 'https://placehold.co/600x400',
            selected: false
          },
          {
            id: 'EVT007',
            name: 'Festival de Jazz',
            organizer: 'Music Productions',
            date: '10-12 Jan 2024',
            category: 'Festival',
            tickets: '0/1500',
            status: 'Rascunho',
            image: 'https://placehold.co/600x400',
            selected: false
          },
          {
            id: 'EVT008',
            name: 'Feira Gastronômica',
            organizer: 'Food Events',
            date: '3-5 Dez 2023',
            category: 'Feira',
            tickets: '750/1000',
            status: 'Publicado',
            image: 'https://placehold.co/600x400',
            selected: false
          }
        ],
        users: [
          {
            id: 'USR001',
            name: 'João Silva',
            email: 'joao.silva@email.com',
            type: 'Cliente',
            status: 'Ativo',
            date: '15/05/2023',
            avatar: 'https://placehold.co/100x100'
          },
          {
            id: 'USR002',
            name: 'Maria Oliveira',
            email: 'maria.oliveira@email.com',
            type: 'Cliente',
            status: 'Ativo',
            date: '22/06/2023',
            avatar: 'https://placehold.co/100x100'
          },
          {
            id: 'USR003',
            name: 'Carlos Santos',
            email: 'carlos.santos@email.com',
            type: 'Organizador',
            status: 'Ativo',
            date: '10/04/2023',
            avatar: 'https://placehold.co/100x100'
          },
          {
            id: 'USR004',
            name: 'Ana Pereira',
            email: 'ana.pereira@email.com',
            type: 'Cliente',
            status: 'Inativo',
            date: '05/07/2023',
            avatar: 'https://placehold.co/100x100'
          },
          {
            id: 'USR005',
            name: 'Roberto Almeida',
            email: 'roberto.almeida@email.com',
            type: 'Organizador',
            status: 'Ativo',
            date: '18/03/2023',
            avatar: 'https://placehold.co/100x100'
          },
          {
            id: 'USR006',
            name: 'Fernanda Costa',
            email: 'fernanda.costa@email.com',
            type: 'Administrador',
            status: 'Ativo',
            date: '02/01/2023',
            avatar: 'https://placehold.co/100x100'
          },
          {
            id: 'USR007',
            name: 'Lucas Mendes',
            email: 'lucas.mendes@email.com',
            type: 'Cliente',
            status: 'Pendente',
            date: '30/07/2023',
            avatar: 'https://placehold.co/100x100'
          }
        ],
        recentEvents: [
          { name: 'Festival de Música Verão 2023', date: '15-17 Dez 2023', status: 'Publicado' },
          { name: 'Show de Rock Nacional', date: '22 Nov 2023', status: 'Publicado' },
          { name: 'Conferência de Tecnologia', date: '5-7 Dez 2023', status: 'Publicado' },
          { name: 'Workshop de Fotografia', date: '18 Nov 2023', status: 'Publicado' },
          { name: 'Peça de Teatro: O Fantasma da Ópera', date: '10 Dez 2023', status: 'Rascunho' }
        ],
        recentUsers: [
          { name: 'João Silva', type: 'Cliente', date: '15/05/2023', avatar: 'https://placehold.co/100x100' },
          { name: 'Maria Oliveira', type: 'Cliente', date: '22/06/2023', avatar: 'https://placehold.co/100x100' },
          { name: 'Carlos Santos', type: 'Organizador', date: '10/04/2023', avatar: 'https://placehold.co/100x100' },
          { name: 'Ana Pereira', type: 'Cliente', date: '05/07/2023', avatar: 'https://placehold.co/100x100' },
          { name: 'Roberto Almeida', type: 'Organizador', date: '18/03/2023', avatar: 'https://placehold.co/100x100' }
        ]
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
            event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            event.id.toLowerCase().includes(this.searchQuery.toLowerCase());
          
          const matchesCategory = this.filterCategory === '' || event.category === this.filterCategory;
          const matchesStatus = this.filterStatus === '' || event.status === this.filterStatus;
          
          return matchesSearch && matchesCategory && matchesStatus;
        });
      }
    },
    methods: {
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
      editEvent(event) {
        // Implementar lógica para editar evento
        console.log('Editar evento:', event);
      },
      viewEvent(event) {
        // Implementar lógica para visualizar evento
        console.log('Visualizar evento:', event);
      },
      confirmDeleteEvent(event) {
        this.eventToDelete = event;
        this.showDeleteEventModal = true;
      },
      deleteEvent() {
        // Implementar lógica para excluir evento
        console.log('Excluir evento:', this.eventToDelete);
        this.events = this.events.filter(event => event.id !== this.eventToDelete.id);
        this.showDeleteEventModal = false;
        this.eventToDelete = null;
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
      getUserStatusBadgeClass(status) {
        switch (status) {
          case 'Ativo':
            return 'bg-success';
          case 'Inativo':
            return 'bg-danger';
          case 'Pendente':
            return 'bg-warning';
          default:
            return 'bg-secondary';
        }
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