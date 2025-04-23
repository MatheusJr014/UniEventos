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
                    <a href="#" class="text-decoration-none d-flex align-items-center text-secondary">
                        Ver todos <i class="bi bi-arrow-right ms-1"></i>
                    </a>
                </div>
                <div class="row g-4">
                    <div v-for="event in events" :key="event.id" class="col-md-6 col-lg-4">
                        <div class="card h-100 border-0 shadow-sm hover-card">
                            <div class="position-relative">
                                <img :src="event.image" :alt="event.title" class="card-img-top">
                                <span class="position-absolute top-0 end-0 badge bg-primary m-2">{{ event.category
                                    }}</span>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title fw-bold">{{ event.title }}</h5>
                                <div class="d-flex align-items-center text-muted mb-2">
                                    <i class="bi bi-calendar-event me-2"></i>
                                    <span>{{ event.date }}</span>
                                </div>
                                <div class="d-flex align-items-center text-muted mb-3">
                                    <i class="bi bi-geo-alt me-2"></i>
                                    <span>{{ event.location }}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="fw-bold">{{ event.price === 0 ? 'Grátis' : `R$
                                        ${event.price.toFixed(2)}` }}</div>
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
        events: [
          {
            id: 1,
            title: "Festival de Música Verão 2023",
            date: "15-17 Dez 2023",
            location: "Praia de Copacabana, Rio de Janeiro",
            price: 150.0,
            category: "Festival",
            image: "https://placehold.co/600x400",
          },
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
            title: "Conferência de Tecnologia",
            date: "5-7 Dez 2023",
            location: "Centro de Convenções, Belo Horizonte",
            price: 200.0,
            category: "Conferência",
            image: "https://placehold.co/600x400",
          },
          {
            id: 4,
            title: "Peça de Teatro: O Fantasma da Ópera",
            date: "10 Dez 2023",
            location: "Teatro Municipal, São Paulo",
            price: 120.0,
            category: "Teatro",
            image: "https://placehold.co/600x400",
          },
          {
            id: 5,
            title: "Workshop de Fotografia",
            date: "18 Nov 2023",
            location: "Galeria de Arte, Curitiba",
            price: 50.0,
            category: "Workshop",
            image: "https://placehold.co/600x400",
          },
          {
            id: 6,
            title: "Campeonato de Futebol Amador",
            date: "25-26 Nov 2023",
            location: "Estádio Municipal, Salvador",
            price: 0,
            category: "Esporte",
            image: "https://placehold.co/600x400",
          },
        ],
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
  };
</script>
<style lang="">

</style>