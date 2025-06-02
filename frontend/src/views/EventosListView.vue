<template>
  <div>
    <!-- Header -->
    <NavBarComponents />
    <main>
      <!-- Breadcrumb -->
      <div class="bg-light py-2">
        <div class="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <a href="#" class="text-decoration-none">Início</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Eventos
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="bg-primary text-white py-4">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <h1 class="display-5 fw-bold mb-3">Encontre eventos incríveis</h1>
              <p class="lead mb-4">
                Descubra os melhores eventos perto de você e viva experiências
                inesquecíveis
              </p>
            </div>
            <div class="col-lg-6">
              <div class="card border-0 shadow">
                <div class="card-body p-3">
                  <form @submit.prevent="searchEvents">
                    <div class="row g-2">
                      <div class="col-md-5">
                        <div class="input-group">
                          <span class="input-group-text bg-white border-end-0">
                            <i class="bi bi-search"></i>
                          </span>
                          <input
                            type="text"
                            class="form-control border-start-0"
                            placeholder="O que você procura?"
                            v-model="searchQuery"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="input-group">
                          <span class="input-group-text bg-white border-end-0">
                            <i class="bi bi-geo-alt"></i>
                          </span>
                          <select
                            class="form-select border-start-0"
                            v-model="selectedLocation"
                          >
                            <option value="">Qualquer local</option>
                            <option
                              v-for="(city, index) in cities"
                              :key="index"
                              :value="city"
                            >
                              {{ city }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <button type="submit" class="btn btn-secondary w-100">
                          Buscar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Filters and Events Section -->
      <section class="py-5">
        <div class="container">
          <div class="row g-4">
            <!-- Filters Sidebar -->
            <div class="col-lg-3">
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-white">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5 class="card-title mb-0">Filtros</h5>
                    <button
                      class="btn btn-sm btn-link text-decoration-none p-0"
                      @click="resetFilters"
                    >
                      <i class="bi bi-arrow-counterclockwise me-1"></i>Limpar
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <!-- Categories Filter -->
                  <div class="mb-4">
                    <h6 class="fw-bold mb-3">Categorias</h6>
                    <div class="d-flex flex-wrap gap-2">
                      <button
                        v-for="(category, index) in categories"
                        :key="index"
                        class="btn btn-sm"
                        :class="
                          selectedCategories.includes(category.id)
                            ? 'btn-primary'
                            : 'btn-outline-primary'
                        "
                        @click="toggleCategory(category.id)"
                      >
                        {{ category.name }}
                      </button>
                    </div>
                  </div>

                  <!-- Date Filter -->
                  <div class="mb-4">
                    <h6 class="fw-bold mb-3">Data</h6>
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="dateFilter"
                        id="dateAll"
                        value=""
                        v-model="selectedDate"
                      />
                      <label class="form-check-label" for="dateAll">
                        Qualquer data
                      </label>
                    </div>
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="dateFilter"
                        id="dateToday"
                        value="today"
                        v-model="selectedDate"
                      />
                      <label class="form-check-label" for="dateToday">
                        Hoje
                      </label>
                    </div>
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="dateFilter"
                        id="dateWeekend"
                        value="weekend"
                        v-model="selectedDate"
                      />
                      <label class="form-check-label" for="dateWeekend">
                        Este fim de semana
                      </label>
                    </div>
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="dateFilter"
                        id="dateWeek"
                        value="week"
                        v-model="selectedDate"
                      />
                      <label class="form-check-label" for="dateWeek">
                        Esta semana
                      </label>
                    </div>
                    <div class="form-check mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="dateFilter"
                        id="dateMonth"
                        value="month"
                        v-model="selectedDate"
                      />
                      <label class="form-check-label" for="dateMonth">
                        Este mês
                      </label>
                    </div>
                    <div class="row g-2">
                      <div class="col-6">
                        <label for="startDate" class="form-label small"
                          >De</label
                        >
                        <input
                          type="date"
                          class="form-control form-control-sm"
                          id="startDate"
                          v-model="startDate"
                        />
                      </div>
                      <div class="col-6">
                        <label for="endDate" class="form-label small"
                          >Até</label
                        >
                        <input
                          type="date"
                          class="form-control form-control-sm"
                          id="endDate"
                          v-model="endDate"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Price Filter -->
                  <div class="mb-4">
                    <h6 class="fw-bold mb-3">Preço</h6>
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="priceFree"
                        v-model="showFreeEvents"
                      />
                      <label class="form-check-label" for="priceFree">
                        Eventos gratuitos
                      </label>
                    </div>
                    <div class="mb-3">
                      <label
                        for="priceRange"
                        class="form-label d-flex justify-content-between"
                      >
                        <span>Até R$ {{ priceRange }}</span>
                        <span>R$ {{ priceRange }}</span>
                      </label>
                      <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="500"
                        step="10"
                        id="priceRange"
                        v-model="priceRange"
                      />
                    </div>
                  </div>

                  <!-- Format Filter -->
                  <div class="mb-4">
                    <h6 class="fw-bold mb-3">Formato</h6>
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formatFilter"
                        id="formatAll"
                        value=""
                        v-model="selectedFormat"
                      />
                      <label class="form-check-label" for="formatAll">
                        Todos
                      </label>
                    </div>
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formatFilter"
                        id="formatPresential"
                        value="presential"
                        v-model="selectedFormat"
                      />
                      <label class="form-check-label" for="formatPresential">
                        Presencial
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formatFilter"
                        id="formatOnline"
                        value="online"
                        v-model="selectedFormat"
                      />
                      <label class="form-check-label" for="formatOnline">
                        Online
                      </label>
                    </div>
                  </div>

                  <!-- Apply Filters Button (Mobile) -->
                  <div class="d-lg-none">
                    <button class="btn btn-primary w-100" @click="applyFilters">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </div>

              <!-- Map Preview (Desktop) -->
              <div class="d-none d-lg-block">
                <div class="card border-0 shadow-sm">
                  <div class="card-header bg-white">
                    <h5 class="card-title mb-0">Mapa de Eventos</h5>
                  </div>
                  <div class="card-body p-0">
                    <div class="ratio ratio-4x3">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975874201203!2d-46.65429492549636!3d-23.56410237882275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1sen!2sbr!4v1682599231978!5m2!1sen!2sbr"
                        width="600"
                        height="450"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                      >
                      </iframe>
                    </div>
                    <div class="p-3">
                      <p class="small text-muted mb-0">
                        Visualize os eventos no mapa para encontrar opções
                        próximas a você.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Events List -->
            <div class="col-lg-9">
              <!-- Results Header -->
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4"
              >
                <div class="mb-3 mb-md-0">
                  <h2 class="h4 mb-1">
                    {{ filteredEvents.length }} eventos encontrados
                  </h2>
                  <p class="text-muted mb-0">{{ getFilterDescription() }}</p>
                </div>
                <div class="d-flex gap-2 align-items-center">
                  <label for="sortEvents" class="form-label mb-0 me-2"
                    >Ordenar por:</label
                  >
                  <select
                    class="form-select form-select-sm"
                    id="sortEvents"
                    v-model="sortBy"
                  >
                    <option value="relevance">Relevância</option>
                    <option value="date">Data</option>
                    <option value="price_asc">Preço: menor para maior</option>
                    <option value="price_desc">Preço: maior para menor</option>
                    <option value="name">Nome</option>
                  </select>
                  <div class="btn-group ms-2">
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm"
                      :class="{ active: viewMode === 'grid' }"
                      @click="viewMode = 'grid'"
                    >
                      <i class="bi bi-grid"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm"
                      :class="{ active: viewMode === 'list' }"
                      @click="viewMode = 'list'"
                    >
                      <i class="bi bi-list-ul"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm"
                      :class="{ active: viewMode === 'map' }"
                      @click="viewMode = 'map'"
                    >
                      <i class="bi bi-map"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Grid View -->
              <div v-if="viewMode === 'grid'" class="row g-4">
                <div
                  v-for="event in paginatedEvents"
                  :key="event.id"
                  class="col-md-6 col-lg-4"
                >
                  <div class="card h-100 border-0 shadow-sm hover-card">
                    <div class="position-relative">
                      <img
                        :src="
                          event.imagemevento || 'https://placehold.co/600x400'
                        "
                        :alt="event.nomeevento"
                        class="card-img-top"
                      />
                      <span
                        class="position-absolute top-0 end-0 badge bg-primary m-2"
                      >
                        {{ event.categoria }}
                      </span>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">{{ event.nomeevento }}</h5>
                      <div
                        class="d-flex align-items-center text-muted mb-2 small"
                      >
                        <i class="bi bi-calendar-event me-2"></i>
                        <span>{{ formatDate(event.datainicio) }}</span>
                      </div>
                      <div
                        class="d-flex align-items-center text-muted mb-2 small"
                      >
                        <i class="bi bi-geo-alt me-2"></i>
                        <span>{{ event.local }}</span>
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div class="fw-bold">
                          {{
                            event.ingressos.length > 0
                              ? `A partir de R$ ${event.precoMinimo.toFixed(2)}`
                              : "Grátis"
                          }}
                        </div>
                        <router-link 
                          :to="{ name: 'evento-detalhes', params: { id: event.id } }" 
                          class="btn btn-sm btn-primary"
                        >
                          Ver Detalhes
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- List View -->
              <div v-if="viewMode === 'list'" class="card border-0 shadow-sm">
                <div class="list-group list-group-flush">
                  <div
                    v-for="event in paginatedEvents"
                    :key="event.id"
                    class="list-group-item p-3"
                  >
                    <div class="row g-3 align-items-center">
                      <!-- Coluna da Imagem -->
                      <div class="col-md-3">
                        <div class="position-relative">
                          <img
                            :src="
                              event.imagemevento ||
                              'https://placehold.co/600x400'
                            "
                            :alt="event.nomeevento"
                            class="img-fluid rounded"
                            style="
                              height: 150px;
                              object-fit: cover;
                              width: 100%;
                            "
                          />
                          <button
                            class="btn btn-sm btn-light position-absolute top-0 start-0 m-2 rounded-circle"
                            title="Adicionar aos favoritos"
                            @click="toggleFavorite(event.id)"
                          >
                            <i
                              class="bi"
                              :class="
                                event.isFavorite
                                  ? 'bi-heart-fill text-danger'
                                  : 'bi-heart'
                              "
                            ></i>
                          </button>
                        </div>
                      </div>

                      <!-- Coluna de Informações -->
                      <div class="col-md-6">
                        <span class="badge bg-primary mb-2">{{
                          event.categoria
                        }}</span>
                        <h5 class="mb-1">{{ event.nomeevento }}</h5>
                        <p class="text-muted small mb-2">
                          {{ event.descricao.substring(0, 100) }}...
                        </p>

                        <div
                          class="d-flex align-items-center text-muted mb-2 small"
                        >
                          <i class="bi bi-calendar-event me-2"></i>
                          <span>
                            {{ formatDate(event.datainicio) }}
                            <span v-if="event.datafim !== event.datainicio">
                              - {{ formatDate(event.datafim) }}
                            </span>
                          </span>
                        </div>

                        <div
                          class="d-flex align-items-center text-muted mb-2 small"
                        >
                          <i class="bi bi-clock me-2"></i>
                          <span
                            >{{ formatTime(event.horainicio) }} -
                            {{ formatTime(event.horafim) }}</span
                          >
                        </div>

                        <div class="d-flex align-items-center text-muted small">
                          <i class="bi bi-geo-alt me-2"></i>
                          <span>{{ event.local }}</span>
                        </div>
                      </div>

                      <!-- Coluna de Preço e Botão -->
                      <div class="col-md-3 text-md-end">
                        <div class="fw-bold mb-3 text-center">
                          {{
                            event.ingressos.length > 0
                              ? `A partir de R$ ${event.precoMinimo.toFixed(2)}`
                              : "Grátis"
                          }}
                        </div>
                        <div class="d-flex flex-column gap-2">
                          <span
                            class="badge bg-success"
                            v-if="event.status === 'ativo'"
                          >
                            Disponível
                          </span>
                          <router-link 
                            :to="{ name: 'evento-detalhes', params: { id: event.id } }" 
                            class="btn btn-sm btn-primary"
                          >
                            Ver Detalhes
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Map View -->
              <div v-if="viewMode === 'map'" class="row g-4 mt-4">
                <div
                  v-for="event in paginatedEvents"
                  :key="event.id"
                  class="col-md-6"
                >
                  <div class="card h-100 border-0 shadow-sm hover-card">
                    <div class="row g-0">
                      <div class="col-4">
                        <img
                          :src="
                            event.imagemevento || 'https://placehold.co/600x400'
                          "
                          class="img-fluid rounded-start h-100"
                          style="object-fit: cover"
                        />
                      </div>
                      <div class="col-8">
                        <div class="card-body">
                          <h6 class="card-title">{{ event.nomeevento }}</h6>
                          <div
                            class="d-flex align-items-center text-muted mb-2 small"
                          >
                            <i class="bi bi-calendar-event me-2"></i>
                            <span>{{ formatDate(event.datainicio) }}</span>
                          </div>
                          <div
                            class="d-flex align-items-center text-muted mb-2 small"
                          >
                            <i class="bi bi-geo-alt me-2"></i>
                            <span>{{ event.local }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Map View Event List -->
              <div v-if="viewMode === 'map'" class="row g-4 mt-4">
                <div
                  v-for="(event, index) in paginatedEvents"
                  :key="index"
                  class="col-md-6"
                >
                  <div class="card h-100 border-0 shadow-sm hover-card">
                    <div class="row g-0">
                      <div class="col-4">
                        <img
                          :src="event.image"
                          :alt="event.name"
                          class="img-fluid rounded-start h-100"
                          style="object-fit: cover"
                        />
                      </div>
                      <div class="col-8">
                        <div class="card-body">
                          <h6 class="card-title">{{ event.name }}</h6>
                          <div
                            class="d-flex align-items-center text-muted mb-2 small"
                          >
                            <i class="bi bi-calendar-event me-2"></i>
                            <span>{{ event.date }}</span>
                          </div>
                          <div
                            class="d-flex align-items-center text-muted mb-2 small"
                          >
                            <i class="bi bi-geo-alt me-2"></i>
                            <span>{{ event.location }}</span>
                          </div>
                          <div class="fw-bold small">
                            {{
                              event.price === 0
                                ? "Grátis"
                                : `R$ ${event.price.toFixed(2)}`
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- No Results -->
              <div
                v-if="!isLoading && events.length === 0"
                class="text-center py-5"
              >
                <i class="bi bi-calendar-x text-muted fs-1"></i>
                <h3 class="h5 mt-3">Nenhum evento disponível no momento</h3>
                <button @click="fetchEvents" class="btn btn-primary mt-2">
                  Recarregar eventos
                </button>
              </div>

              <!-- Pagination -->
              <div
                v-if="filteredEvents.length > 0"
                class="d-flex justify-content-center mt-5"
              >
                <nav aria-label="Navegação de páginas">
                  <ul class="pagination">
                    <li
                      class="page-item"
                      :class="{ disabled: currentPage === 1 }"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="currentPage--"
                        aria-label="Anterior"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li
                      v-for="page in totalPages"
                      :key="page"
                      class="page-item"
                      :class="{ active: currentPage === page }"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="currentPage = page"
                        >{{ page }}</a
                      >
                    </li>
                    <li
                      class="page-item"
                      :class="{ disabled: currentPage === totalPages }"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="currentPage++"
                        aria-label="Próximo"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-5 bg-gradient text-white">
        <div class="container py-4 text-center">
          <h2 class="h3 fw-bold mb-3">Não perca nenhum evento</h2>
          <p class="lead mb-4 mx-auto" style="max-width: 600px">
            Receba em primeira mão informações sobre os melhores eventos e
            ofertas exclusivas
          </p>
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
              <form class="d-flex flex-column flex-sm-row gap-2 mb-2">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Digite seu email"
                />
                <button type="submit" class="btn btn-light">
                  Inscrever-se
                </button>
              </form>
              <p class="small">
                Ao se inscrever, você concorda com nossos
                <a href="#" class="text-white text-decoration-underline"
                  >Termos de Serviço</a
                >
                e
                <a href="#" class="text-white text-decoration-underline"
                  >Política de Privacidade</a
                >.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="py-5 bg-white border-top">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-3 col-md-6">
            <div class="mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoConecta-SNoUxrSWP8iTB6IvwaQcweuJEgUJxa.png"
                alt="Conecta Eventos Logo"
                height="40"
                class="mb-3"
              />
              <p class="text-muted small">
                A melhor plataforma para encontrar e promover eventos no Brasil.
              </p>
            </div>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5 class="fw-bold mb-3 small text-uppercase">Eventos</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Todos os Eventos</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Eventos Gratuitos</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Eventos Online</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Eventos Próximos</a
                >
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5 class="fw-bold mb-3 small text-uppercase">Organizadores</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Criar Evento</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Vender Ingressos</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Ferramentas</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Preços</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5 class="fw-bold mb-3 small text-uppercase">Empresa</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Sobre Nós</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Carreiras</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Blog</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Contato</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="fw-bold mb-3 small text-uppercase">Legal</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Termos de Serviço</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Política de Privacidade</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Política de Cookies</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Acessibilidade</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div
          class="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 mt-4 border-top"
        >
          <p class="text-muted small">
            &copy; {{ new Date().getFullYear() }} Conecta Eventos. Todos os
            direitos reservados.
          </p>
          <div class="d-flex gap-3">
            <a href="#" class="text-muted">
              <i class="bi bi-facebook"></i>
              <span class="visually-hidden">Facebook</span>
            </a>
            <a href="#" class="text-muted">
              <i class="bi bi-instagram"></i>
              <span class="visually-hidden">Instagram</span>
            </a>
            <a href="#" class="text-muted">
              <i class="bi bi-twitter"></i>
              <span class="visually-hidden">Twitter</span>
            </a>
            <a href="#" class="text-muted">
              <i class="bi bi-youtube"></i>
              <span class="visually-hidden">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBarComponents from "@/components/Publico/NavBarComponents.vue";

export default {
  name: "ListagemEventos",
  components: {
    NavBarComponents,
  },
  data() {
    return {
      searchQuery: "",
      selectedLocation: "",
      selectedCategories: [],
      selectedDate: "",
      startDate: "",
      endDate: "",
      showFreeEvents: false,
      priceRange: 200,
      selectedFormat: "",
      sortBy: "relevance",
      viewMode: "grid",
      currentPage: 1,
      eventsPerPage: 9,
      categories: [
        { id: "show", name: "Shows" },
        { id: "festival", name: "Festivais" },
        { id: "teatro", name: "Teatro" },
        { id: "esporte", name: "Esportes" },
        { id: "workshop", name: "Workshops" },
        { id: "conferencia", name: "Conferências" },
        { id: "feira", name: "Feiras" },
        { id: "exposicao", name: "Exposições" },
        { id: "gastronomia", name: "Gastronomia" },
      ],
      cities: [
        "São Paulo",
        "Rio de Janeiro",
        "Belo Horizonte",
        "Salvador",
        "Brasília",
        "Curitiba",
        "Fortaleza",
        "Recife",
        "Porto Alegre",
      ],
      events: [],
    };
  },
  computed: {
    filteredEvents() {
      // Filtra eventos vazios e mantém apenas ativos
      let result = this.events.filter(
        (event) => event.nomeevento && event.status === "ativo"
      );

      // Filtro por texto de busca
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (event) =>
            event.nomeevento.toLowerCase().includes(query) ||
            (event.descricao &&
              event.descricao.toLowerCase().includes(query)) ||
            event.local.toLowerCase().includes(query)
        );
      }

      // Filtro por localização
      if (this.selectedLocation) {
        result = result.filter((event) =>
          event.local.includes(this.selectedLocation)
        );
      }

      // Filtro por categorias
      if (this.selectedCategories.length > 0) {
        result = result.filter((event) =>
          this.selectedCategories.some(
            (cat) =>
              event.categoria &&
              event.categoria.toLowerCase() === cat.toLowerCase()
          )
        );
      }

      // Filtro por data
      if (this.selectedDate === "today") {
        const today = new Date().toISOString().split("T")[0];
        result = result.filter((event) => event.datainicio === today);
      } else if (this.selectedDate === "weekend") {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para domingo
        const weekendStart = new Date(today.setDate(diff + 5)); // Sábado
        const weekendEnd = new Date(today.setDate(diff + 7)); // Domingo

        result = result.filter((event) => {
          const eventDate = new Date(event.datainicio);
          return eventDate >= weekendStart && eventDate <= weekendEnd;
        });
      } else if (this.startDate && this.endDate) {
        result = result.filter(
          (event) =>
            event.datainicio >= this.startDate && event.datafim <= this.endDate
        );
      }

      // Ordenação
      switch (this.sortBy) {
        case "date":
          result.sort(
            (a, b) => new Date(a.datainicio) - new Date(b.datainicio)
          );
          break;
        case "name":
          result.sort((a, b) => a.nomeevento.localeCompare(b.nomeevento));
          break;
        case "relevance":
        case "name":
          result.sort((a, b) => a.nomeevento.localeCompare(b.nomeevento));
          break;
        case "price_asc":
          result.sort((a, b) => a.precoMinimo - b.precoMinimo);
          break;
        case "price_desc":
          result.sort((a, b) => b.precoMinimo - a.precoMinimo);
          break;
        case "relevance":
        default:
          result.sort((a, b) => a.id - b.id);
      }

      return result;
    },
    paginatedEvents() {
      const startIndex = (this.currentPage - 1) * this.eventsPerPage;
      const endIndex = startIndex + this.eventsPerPage;
      return this.filteredEvents.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.eventsPerPage);
    },
  },
  methods: {
    searchEvents() {
      // Reset to first page when searching
      this.currentPage = 1;
    },
    toggleCategory(categoryId) {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index === -1) {
        this.selectedCategories.push(categoryId);
      } else {
        this.selectedCategories.splice(index, 1);
      }
    },
    resetFilters() {
      this.searchQuery = "";
      this.selectedLocation = "";
      this.selectedCategories = [];
      this.selectedDate = "";
      this.startDate = "";
      this.endDate = "";
      this.showFreeEvents = false;
      this.priceRange = 200;
      this.selectedFormat = "";
      this.sortBy = "relevance";
      this.currentPage = 1;
    },
    applyFilters() {
      // For mobile view - would close the filter sidebar
      this.currentPage = 1;
    },
    getFilterDescription() {
      let description = "";

      if (this.selectedCategories.length > 0) {
        const categoryNames = this.selectedCategories.map((catId) => {
          const category = this.categories.find((c) => c.id === catId);
          return category ? category.name : catId;
        });

        description += `Categorias: ${categoryNames.join(", ")}`;
      }

      if (this.selectedLocation) {
        if (description) description += " | ";
        description += `Local: ${this.selectedLocation}`;
      }

      if (this.selectedDate) {
        if (description) description += " | ";
        let dateText = "";
        switch (this.selectedDate) {
          case "today":
            dateText = "Hoje";
            break;
          case "weekend":
            dateText = "Este fim de semana";
            break;
          case "week":
            dateText = "Esta semana";
            break;
          case "month":
            dateText = "Este mês";
            break;
        }
        description += `Data: ${dateText}`;
      } else if (this.startDate && this.endDate) {
        if (description) description += " | ";
        description += `Data: ${this.startDate} a ${this.endDate}`;
      }

      if (this.showFreeEvents) {
        if (description) description += " | ";
        description += "Eventos gratuitos";
      } else if (this.priceRange < 500) {
        if (description) description += " | ";
        description += `Preço: até R$ ${this.priceRange}`;
      }

      if (this.selectedFormat) {
        if (description) description += " | ";
        description += `Formato: ${
          this.selectedFormat === "online" ? "Online" : "Presencial"
        }`;
      }

      return description || "Todos os eventos";
    },

    async fetchEvents() {
      this.isLoading = true;
      try {
        const response = await fetch("http://localhost:3000/eventos");
        console.log("🚀 ~ fetchEvents ~ response:", response);
        if (!response.ok) throw new Error("Erro ao carregar eventos");

        this.events = await response.json();
        console.log("🚀 ~ fetchEvents ~ this.events:", this.events);
        this.error = null;
      } catch (err) {
        console.error("Erro na API:", err);
        this.error = "Não foi possível carregar os eventos";
      } finally {
        this.isLoading = false;
      }
    },
    async fetchEvents() {
      this.isLoading = true;
      try {
        // Busca eventos
        const eventsResponse = await fetch("http://localhost:3000/eventos");
        if (!eventsResponse.ok) throw new Error("Erro ao carregar eventos");
        const eventos = await eventsResponse.json();

        // Busca ingressos
        const ingressosResponse = await fetch(
          "http://localhost:3000/ingressos"
        );
        if (!ingressosResponse.ok)
          throw new Error("Erro ao carregar ingressos");
        const ingressos = await ingressosResponse.json();

        // Combina os dados
        this.events = eventos.map((evento) => {
          const ingressosDoEvento = ingressos.filter(
            (ingresso) => ingresso.EventoId === evento.id
          );
          return {
            ...evento,
            ingressos: ingressosDoEvento,
            precoMinimo:
              ingressosDoEvento.length > 0
                ? Math.min(...ingressosDoEvento.map((i) => parseFloat(i.preco)))
                : 0,
          };
        });

        this.error = null;
      } catch (err) {
        console.error("Erro na API:", err);
        this.error = "Não foi possível carregar os dados";
      } finally {
        this.isLoading = false;
      }
    },
    // toggleFavorite(eventId) {
    //   const event = this.events.find((e) => e.id === eventId);
    //   if (event) {
    //     event.isFavorite = !event.isFavorite;
    //   }
    // },

    formatDate(dateString) {
      const options = { day: "2-digit", month: "long", year: "numeric" };
      return new Date(dateString).toLocaleDateString("pt-BR", options);
    },

    formatTime(timeString) {
      return timeString.substring(0, 5); // Formata para HH:MM
    },
    formatPrice(price) {
      return parseFloat(price).toFixed(2).replace(".", ",");
    },
  },
  created() {
    this.fetchEvents();
  },
};
</script>

<style>
/* Importando Bootstrap e Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");

/* Estilos personalizados baseados nas cores da logo */
:root {
  --primary-color: #7749f8; /* Roxo da logo */
  --secondary-color: #ff9933; /* Laranja da logo */
  --primary-rgb: 119, 73, 248;
  --secondary-rgb: 255, 153, 51;
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

/* Gradiente para seções especiais */
.bg-gradient {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
}

/* Efeitos de hover para cards */
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Estilos para o breadcrumb */
.breadcrumb-item a {
  color: var(--primary-color);
}

.breadcrumb-item.active {
  color: var(--secondary-color);
}

/* Estilos para a paginação */
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

/* Estilos para os botões de filtro */
.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover,
.btn-outline-primary.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

/* Estilos para os inputs de formulário */
.form-control:focus,
.form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.25);
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

/* Estilos para o modo de visualização */
.btn-group .btn-outline-secondary.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}
</style>
