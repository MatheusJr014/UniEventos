<template>
  <div>
    <!-- Header -->
    <EventHeader />

    <main>
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
              <li class="breadcrumb-item">
                <a href="#" class="text-decoration-none">{{
                  evento.category
                }}</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ evento.title }}
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
                  :src="evento.imageLarge"
                  :alt="evento.title"
                  class="img-fluid w-100"
                />
                <span
                  class="position-absolute top-0 end-0 badge bg-primary m-3"
                  >{{ evento.category }}</span
                >
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <h1 class="h2 fw-bold mb-0">{{ evento.title }}</h1>
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
                          <p class="mb-0">{{ evento.fullDate }}</p>
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
                          <p class="mb-0">{{ evento.venue }}</p>
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
                  <div class="mb-4" v-html="evento.description"></div>

                  <h3 class="h5 fw-bold mb-3">Informações Importantes</h3>
                  <ul class="mb-0">
                    <li
                      v-for="(info, index) in evento.importantInfo"
                      :key="index"
                      class="mb-2"
                    >
                      {{ info }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Location Map -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                  <h3 class="h5 fw-bold mb-3">Localização</h3>
                  <p class="mb-3">{{ evento.fullAddress }}</p>
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
              <div class="card border-0 shadow-sm mb-4">
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
              </div>
            </div>

            <!-- Sidebar -->
            <SideBarEvent
              :tickets="evento.tickets"
              :subtotal="subtotal"
              :serviceFee="serviceFee"
              :total="total"
              @increment="incrementTicket"
              @decrement="decrementTicket"
            />
          </div>
        </div>
      </section>

      <!-- Related Events -->
      <RelatedEvents :relatedEvents="relatedEvents" />
    </main>

    <!-- Footer -->
    <EventFooter />
  </div>
</template>

<script>
import RelatedEvents from "@/components/Publico/Evento Details/RelatedEventsComponents.vue";
import EventHeader from "@/components/Publico/Evento Details/HeaderEventComponents.vue";
import EventFooter from "@/components/Publico/Evento Details/FooterEventComponents.vue";
import SideBarEvent from "@/components/Publico/Evento Details/SideBarEventComponents.vue";

export default {
  name: "EventoDetalhes",
  components: {
    EventHeader,
    RelatedEvents,
    EventFooter,
    SideBarEvent,
  },
  data() {
    return {
      evento: {
        id: 1,
        title: "Festival de Música Verão 2023",
        category: "Festival",
        image: "https://placehold.co/600x400",
        imageLarge: "https://placehold.co/1200x600",
        date: "15-17 Dez 2023",
        fullDate: "15 a 17 de Dezembro de 2023, das 14:00 às 00:00",
        location: "Praia de Copacabana, Rio de Janeiro",
        venue: "Arena Copacabana",
        fullAddress:
          "Av. Atlântica, s/n - Copacabana, Rio de Janeiro - RJ, 22070-000",
        price: 150.0,
        description: `<p>O Festival de Música Verão 2023 é o maior evento de música do ano, reunindo os melhores artistas nacionais e internacionais em um fim de semana inesquecível à beira-mar.</p>
          <p>Com três palcos e mais de 30 atrações, o festival oferece uma experiência musical diversificada, abrangendo gêneros como pop, rock, eletrônica, hip-hop e MPB. Além dos shows, o evento conta com áreas gastronômicas, espaços de arte e atividades interativas.</p>
          <p>Prepare-se para três dias de muita música, diversão e conexões em um dos cartões-postais mais famosos do Brasil!</p>
          <h4>Line-up confirmado:</h4>
          <ul>
            <li>Sexta-feira (15/12): Banda Nacional, DJ Internacional, Cantora Pop</li>
            <li>Sábado (16/12): Grupo de Rock, Rapper Famoso, Banda Indie</li>
            <li>Domingo (17/12): Artista MPB, Dupla Sertaneja, DJ Eletrônico</li>
          </ul>`,
        importantInfo: [
          "É obrigatória a apresentação de documento com foto para entrada no evento",
          "Proibida a entrada de bebidas e alimentos externos",
          "Menores de 16 anos somente acompanhados dos pais ou responsáveis legais",
          "Em caso de chuva, o evento acontecerá normalmente",
          "Não é permitida a entrada de animais, exceto cães-guia",
        ],
        organizer: {
          name: "Produtora Eventos Brasil",
          image: "https://placehold.co/100x100",
          events: 45,
        },
        tickets: [
          {
            name: "Ingresso Meia-Entrada - 1 Dia",
            description: "Válido para um dia do evento (escolha na entrada)",
            price: 75.0,
            available: true,
            quantity: 0,
          },
          {
            name: "Ingresso Inteira - 1 Dia",
            description: "Válido para um dia do evento (escolha na entrada)",
            price: 150.0,
            available: true,
            quantity: 0,
          },
          {
            name: "Passaporte Meia-Entrada - 3 Dias",
            description: "Acesso aos três dias do festival",
            price: 180.0,
            available: true,
            quantity: 0,
          },
          {
            name: "Passaporte Inteira - 3 Dias",
            description: "Acesso aos três dias do festival",
            price: 360.0,
            available: true,
            quantity: 0,
          },
          {
            name: "Ingresso VIP - 3 Dias",
            description: "Acesso à área VIP com open bar e food",
            price: 750.0,
            available: false,
            quantity: 0,
          },
        ],
      },
      relatedEvents: [
        {
          id: 2,
          title: "Show de Rock Nacional",
          date: "22 Nov 2023",
          location: "Arena Multiuso, São Paulo",
          price: 90.0,
          category: "Show",
          image: "https://placehold.co/600x400",
        },
        {
          id: 3,
          title: "Festival de Jazz",
          date: "10-12 Jan 2024",
          location: "Parque da Cidade, Brasília",
          price: 120.0,
          category: "Festival",
          image: "https://placehold.co/600x400",
        },
        {
          id: 4,
          title: "Sunset Party",
          date: "30 Dez 2023",
          location: "Praia de Ipanema, Rio de Janeiro",
          price: 80.0,
          category: "Festa",
          image: "https://placehold.co/600x400",
        },
      ],
    };
  },
  methods: {
    incrementTicket(index) {
      if (this.evento.tickets[index].available) {
        this.evento.tickets[index].quantity++;
      }
    },
    decrementTicket(index) {
      if (this.evento.tickets[index].quantity > 0) {
        this.evento.tickets[index].quantity--;
      }
    },
    calculateSubtotal() {
      return this.evento.tickets.reduce((total, ticket) => {
        return total + ticket.price * ticket.quantity;
      }, 0);
    },
    calculateServiceFee() {
      // 10% de taxa de serviço
      return this.calculateSubtotal() * 0.1;
    },
    calculateTotal() {
      return this.calculateSubtotal() + this.calculateServiceFee();
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
