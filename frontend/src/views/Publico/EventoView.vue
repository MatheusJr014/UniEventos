<template>
  <div>
    <!-- Header -->
    <NavBarComponents />

    <main>
      <!-- Loading / Erro -->
      <section v-if="loading" class="py-5 text-center">
        <div class="container">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
      </section>

      <section v-else-if="error" class="py-5 text-center">
        <div class="container">
          <h2 class="h4 mb-3">Não foi possível carregar o evento</h2>
          <p class="text-muted">{{ error }}</p>
        </div>
      </section>

      <section v-else-if="evento" class="pb-5">
        <!-- Breadcrumb -->
        <div class="bg-light py-2">
          <div class="container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <a href="#" class="text-decoration-none">Início</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#" class="text-decoration-none">Eventos</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ evento.nomeevento }}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <!-- Event Hero Section -->
        <section class="py-4">
          <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div
                class="position-relative rounded overflow-hidden shadow mb-4"
              >
                <img
                  :src="evento.imagemevento"
                  :alt="evento.nomeevento"
                  class="img-fluid w-100"
                  style="max-height: 500px; object-fit: cover"
                />
                <span
                  class="position-absolute top-0 end-0 badge bg-primary m-3"
                >
                  {{ evento.categoria }}
                </span>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <h1 class="h2 fw-bold mb-0">{{ evento.nomeevento }}</h1>
                <div class="d-flex gap-2">
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    title="Compartilhar"
                  >
                    <i class="bi bi-share"></i>
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    title="Favoritar"
                  >
                    <i class="bi bi-heart"></i>
                  </button>
                </div>
              </div>

              <!-- Event Details -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                  <div class="row g-4">
                    <div class="col-md-6">
                      <div class="d-flex align-items-center">
                        <div
                          class="rounded-circle bg-primary bg-opacity-10 p-3 me-3"
                        >
                          <i class="bi bi-calendar-event text-primary"></i>
                        </div>
                        <div>
                          <h6 class="mb-1">Data e Hora</h6>
                          <p class="mb-0">
                            {{ formatDate(evento.datainicio) }}
                            <span v-if="evento.datafim !== evento.datainicio">
                              a {{ formatDate(evento.datafim) }}
                            </span>
                            <br />
                            Das {{ formatTime(evento.horainicio) }} às
                            {{ formatTime(evento.horafim) }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="d-flex align-items-center">
                        <div
                          class="rounded-circle bg-primary bg-opacity-10 p-3 me-3"
                        >
                          <i class="bi bi-geo-alt text-primary"></i>
                        </div>
                        <div>
                          <h6 class="mb-1">Local</h6>
                          <p class="mb-0">{{ evento.local }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Event Description -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                  <h3 class="h5 fw-bold mb-3">Sobre o Evento</h3>
                  <div class="mb-4" v-html="evento.descricao"></div>
                </div>
              </div>

              <!-- Location Map -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                  <h3 class="h5 fw-bold mb-3">Localização</h3>
                  <p class="mb-3">{{ evento.local }}</p>
                  <div class="ratio ratio-16x9 rounded overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.8018529442225!2d-43.18058692549636!3d-22.951345479112845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997fd5984aa13f%3A0x9dc984d7019502de!2sCopacabana%20Beach!5e0!3m2!1sen!2sbr!4v1682599231978!5m2!1sen!2sbr"
                      width="600"
                      height="450"
                      style="border: 0"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                  </div>
                </div>
              </div>

              <!-- Organizer -->
              <!-- <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                  <h3 class="h5 fw-bold mb-3">Organizador</h3>
                  <div class="d-flex align-items-center">
                    <div
                      class="rounded-circle bg-light p-2 me-3"
                      style="width: 60px; height: 60px; overflow: hidden"
                    >
                      <img
                        :src="evento.organizer.image"
                        :alt="evento.organizer.name"
                        class="img-fluid rounded-circle"
                      />
                    </div>
                    <div>
                      <h6 class="mb-1">{{ evento.organizer.name }}</h6>
                      <p class="text-muted mb-2 small">
                        {{ evento.organizer.events }} eventos organizados
                      </p>
                      <a href="#" class="btn btn-sm btn-outline-primary"
                        >Ver perfil</a
                      >
                    </div>
                  </div>
                </div>
              </div> -->
            </div>

            <!-- Sidebar -->
            <SideBarEvent :event-id="evento.id" />
          </div>
        </div>
        </section>

        <!-- Related Events -->
        <RelatedEvents :relatedEvents="relatedEvents" />
      </section>
    </main>

    <!-- Footer -->
    <EventFooter />
  </div>
</template>

<script>
import RelatedEvents from "@/components/Publico/Evento Details/RelatedEventsComponents.vue";
import NavBarComponents from "@/components/Publico/common/NavBarComponents.vue";
import EventFooter from "@/components/Publico/Evento Details/FooterEventComponents.vue";
import SideBarEvent from "@/components/Publico/Evento Details/SideBarEventComponents.vue";
import { getEventoDetalhadoById, getEventos } from "@/services/api";

export default {
  name: "EventoDetalhes",
  components: {
    NavBarComponents,
    RelatedEvents,
    EventFooter,
    SideBarEvent,
  },
  data() {
    return {
      evento: null,
      loading: true,
      error: null,
      relatedEvents: [],
    };
  },
  async created() {
    await this.loadEvento(this.$route.params.id);
  },
  watch: {
    "$route.params.id"(newId) {
      // Quando navegar para outro evento na mesma view (ex: relacionado)
      this.loadEvento(newId);
    },
  },
  methods: {
    async loadEvento(id) {
      this.loading = true;
      this.error = null;
      this.evento = null;
      try {
        // Carrega evento principal via serviço de API
        const evento = await getEventoDetalhadoById(id);
        this.evento = {
          ...evento,
          imagemevento:
            evento.imagemevento ||
            "https://placehold.co/1200x600?text=Evento+sem+imagem",
        };

        // Carrega eventos relacionados (mesma categoria, diferente ID)
        const todosEventos = await getEventos();
        this.relatedEvents = todosEventos
          .filter(
            (e) =>
              e.id !== this.evento.id &&
              e.categoria &&
              e.categoria === this.evento.categoria
          )
          .slice(0, 3)
          .map((e) => ({
            id: e.id,
            title: e.nomeevento,
            date: this.formatDate(e.datainicio),
            location: e.local,
            // Se tiver ingressos agregados em outro fluxo, poderíamos usar precoMinimo; aqui mantemos 0
            price: 0,
            category: e.categoria,
            image:
              e.imagemevento ||
              "https://placehold.co/600x400?text=Evento+sem+imagem",
          }));
      } catch (err) {
        this.error = err.message || "Erro ao carregar evento.";
        console.error("Erro ao carregar evento:", err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const options = { day: "2-digit", month: "long", year: "numeric" };
      return new Date(dateString).toLocaleDateString("pt-BR", options);
    },
    formatTime(timeString) {
      return timeString.substring(0, 5);
    },
    formatDateRange(start, end) {
      if (start === end) return this.formatDate(start);

      const startDate = new Date(start);
      const endDate = new Date(end);

      if (
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getFullYear() === endDate.getFullYear()
      ) {
        return `${startDate.getDate()} a ${endDate.getDate()} de ${startDate.toLocaleDateString(
          "pt-BR",
          { month: "long", year: "numeric" }
        )}`;
      }

      return `${this.formatDate(start)} a ${this.formatDate(end)}`;
    },
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

/* Efeitos de hover para cards */
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Sombras suaves */
.shadow {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05) !important;
}

.shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
}

/* Estilos específicos para a página de detalhes do evento */
.breadcrumb-item a {
  color: var(--primary-color);
}

.breadcrumb-item.active {
  color: var(--secondary-color);
}

.sticky-top {
  transition: all 0.3s ease;
}

/* Estilos para a descrição do evento */
.card-body h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.card-body ul {
  padding-left: 1.5rem;
}

.card-body ul li {
  margin-bottom: 0.5rem;
}
</style>
