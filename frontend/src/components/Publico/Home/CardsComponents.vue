<template>
  <div>
    <!-- Featured Events Section -->
    <section class="py-5 bg-light">
      <div class="container py-5">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5">
          <div>
            <h2 class="display-5 fw-bold">Eventos em Destaque</h2>
            <p class="text-muted">Não perca os eventos mais populares da temporada</p>
          </div>
          <router-link to="/eventos" class="text-decoration-none d-flex align-items-center text-secondary">
            Ver todos <i class="bi bi-arrow-right ms-1"></i>
          </router-link>
        </div>
        <div class="row g-4">
          <div v-for="event in events" :key="event.id" class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="position-relative">
                <img :src="event.imagemevento" :alt="event.nomeevento" class="card-img-top">
                <span class="position-absolute top-0 end-0 badge bg-primary m-2">{{ event.categoria
                }}</span>
              </div>
              <div class="card-body">
                <h5 class="card-title fw-bold">{{ event.nomeevento }}</h5>
                <div class="d-flex align-items-center text-muted mb-2">
                  <i class="bi bi-calendar-event me-2"></i>
                  <span>{{ event.datafim }}</span>
                </div>
                <div class="d-flex align-items-center text-muted mb-3">
                  <i class="bi bi-geo-alt me-2"></i>
                  <span>{{ event.datafim }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="fw-bold">{{`R$0,0`}}</div>
                  <!-- <div class="fw-bold">{{ event.price === 0 ? 'Grátis' : `R$
                    ${event.price.toFixed(2)}` }}</div> -->
                  <a href="#" class="btn btn-sm btn-secondary">Comprar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
import { getEventos, getIngressos } from '@/services/api';

export default {
  name: 'ConectaEventosLandingPage',
  data() {
    return {
      categories: [
        { name: "Shows", icon: "bi-music-note-beamed" },
        { name: "Festivais", icon: "bi-people-fill" },
        { name: "Teatro", icon: "bi-mask" },
        { name: "Esportes", icon: "bi-trophy" },
        { name: "Workshops", icon: "bi-calendar-event" },
        { name: "Conferências", icon: "bi-mic-fill" },
      ],
      events: [],
      steps: [
        {
          title: "Encontre eventos",
          description: "Busque por eventos próximos a você ou filtre por categoria, data e localização.",
        },
        {
          title: "Compre ingressos",
          description: "Escolha seus ingressos e efetue o pagamento de forma rápida e segura.",
        },
        {
          title: "Aproveite a experiência",
          description: "Receba seus ingressos por e-mail e apresente-os na entrada do evento.",
        },
      ],
      testimonials: [
        {
          text: "Uso o Conecta Eventos há mais de um ano e nunca tive problemas. É super fácil encontrar eventos interessantes e comprar ingressos.",
          name: "Ana Silva",
          role: "Cliente",
        },
        {
          text: "Como organizador de eventos, a plataforma me ajudou a aumentar significativamente a visibilidade dos meus eventos. As ferramentas de gestão são excelentes.",
          name: "Carlos Mendes",
          role: "Organizador",
        },
        {
          text: "Encontrei shows incríveis que nem sabia que estavam acontecendo na minha cidade. A interface é intuitiva e o processo de compra é muito simples.",
          name: "Juliana Costa",
          role: "Cliente",
        },
      ],
    };
  },
  methods: {
     async fetchEvents() {
      this.isLoading = true;
      try {
        const eventsResponse = await getEventos();
        if (!eventsResponse.ok) throw new Error("Erro ao carregar eventos");
        const eventos = await eventsResponse.json();

        const ingressosResponse = await getIngressos();
        if (!ingressosResponse.ok)
          throw new Error("Erro ao carregar ingressos");
        const ingressos = await ingressosResponse.json();

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
      return timeString.substring(0, 5);
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
