<template>
    <div>
      <main>
        <!-- Hero Section -->
        <section class="py-5 bg-light">
          <div class="container py-5">
            <div class="row align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <h1 class="display-4 fw-bold mb-3">Descubra eventos incríveis perto de você</h1>
                <p class="lead text-muted mb-4">
                  Compre ingressos para os melhores shows, festivais, conferências e muito mais. Tudo em um só lugar.
                </p>
                <div class="d-flex flex-column flex-sm-row gap-2 mb-3">
                  <div class="input-group">
                    <span class="input-group-text bg-white">
                      <i class="bi bi-search"></i>
                    </span>
                    <input type="search" class="form-control" placeholder="Buscar eventos...">
                  </div>
                  <button class="btn btn-primary">Buscar</button>
                </div>
                <div class="d-flex gap-2 text-muted small">
                  <span>Populares:</span>
                  <a href="#" class="text-decoration-underline text-muted">Shows</a>
                  <a href="#" class="text-decoration-underline text-muted">Festivais</a>
                  <a href="#" class="text-decoration-underline text-muted">Teatro</a>
                </div>
              </div>
              <div class="col-lg-6">
                <img src="https://placehold.co/600x400" alt="Imagem de um evento com multidão" class="img-fluid rounded shadow">
              </div>
            </div>
          </div>
        </section>
  
        <!-- Categories Section -->
        <section class="py-5">
          <div class="container py-5">
            <div class="text-center mb-5">
              <h2 class="display-5 fw-bold">Explore por Categoria</h2>
              <p class="lead text-muted mx-auto" style="max-width: 700px;">
                Encontre eventos que combinam com seus interesses e paixões
              </p>
            </div>
            <div class="row g-4">
              <div v-for="(category, index) in categories" :key="index" class="col-6 col-md-4 col-lg-2">
                <a href="#" class="text-decoration-none">
                  <div class="card h-100 border-0 shadow-sm text-center hover-card">
                    <div class="card-body">
                      <div class="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                        <i :class="`bi ${category.icon} text-primary`"></i>
                      </div>
                      <h5 class="card-title small fw-bold">{{ category.name }}</h5>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
  

        <!-- How It Works Section -->
        <section class="py-5">
          <div class="container py-5">
            <div class="text-center mb-5">
              <h2 class="display-5 fw-bold">Como Funciona</h2>
              <p class="lead text-muted mx-auto" style="max-width: 700px;">
                Comprar ingressos nunca foi tão fácil e seguro
              </p>
            </div>
            <div class="row g-4 mt-3">
              <div v-for="(step, index) in steps" :key="index" class="col-md-4 text-center">
                <div class="d-inline-flex justify-content-center align-items-center rounded-circle bg-primary text-white mb-4" style="width: 80px; height: 80px;">
                  <span class="fs-4 fw-bold">{{ index + 1 }}</span>
                </div>
                <h3 class="h4 fw-bold">{{ step.title }}</h3>
                <p class="text-muted">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Testimonials Section -->
        <section class="py-5 bg-light">
          <div class="container py-5">
            <div class="text-center mb-5">
              <h2 class="display-5 fw-bold">O Que Nossos Clientes Dizem</h2>
              <p class="lead text-muted mx-auto" style="max-width: 700px;">
                Milhares de pessoas já usam nossa plataforma para encontrar e participar de eventos incríveis
              </p>
            </div>
            <div class="row g-4">
              <div v-for="(testimonial, index) in testimonials" :key="index" class="col-md-4">
                <div class="card h-100 border-0 shadow-sm hover-card">
                  <div class="card-body p-4">
                    <p class="card-text text-muted fst-italic mb-4">"{{ testimonial.text }}"</p>
                    <div class="d-flex align-items-center">
                      <div class="rounded-circle bg-secondary bg-opacity-10 me-3" style="width: 48px; height: 48px; overflow: hidden;">
                        <img src="https://placehold.co/48x48" :alt="testimonial.name" class="img-fluid">
                      </div>
                      <div>
                        <h5 class="card-title mb-0 h6 fw-bold">{{ testimonial.name }}</h5>
                        <p class="card-text small text-muted">{{ testimonial.role }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- For Organizers Section -->
        <section class="py-5 border-top">
          <div class="container py-5">
            <div class="row align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="badge bg-secondary mb-2">Para Organizadores</div>
                <h2 class="display-5 fw-bold mb-3">Promova seus eventos e venda ingressos sem complicação</h2>
                <p class="lead text-muted mb-4">
                  Nossa plataforma oferece todas as ferramentas que você precisa para criar, promover e gerenciar seus
                  eventos com facilidade.
                </p>
                <div class="mb-4">
                  <div class="d-flex mb-3">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                      <i class="bi bi-graph-up text-primary"></i>
                    </div>
                    <div>
                      <h3 class="h5 fw-bold">Alcance maior</h3>
                      <p class="text-muted">Conecte-se com milhares de pessoas interessadas em eventos como o seu.</p>
                    </div>
                  </div>
                  <div class="d-flex mb-3">
                    <div class="rounded-circle bg-secondary bg-opacity-10 p-3 d-inline-flex mb-3">
                      <i class="bi bi-ticket-perforated text-secondary"></i>
                    </div>
                    <div>
                      <h3 class="h5 fw-bold">Venda de ingressos simplificada</h3>
                      <p class="text-muted">Gerencie vendas, emita ingressos e acompanhe tudo em tempo real.</p>
                    </div>
                  </div>
                  <div class="d-flex mb-4">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                      <i class="bi bi-people text-primary"></i>
                    </div>
                    <div>
                      <h3 class="h5 fw-bold">Suporte dedicado</h3>
                      <p class="text-muted">Nossa equipe está sempre disponível para ajudar com qualquer necessidade.</p>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-column flex-sm-row gap-2">
                  <a href="#" class="btn btn-primary btn-lg">Comece a vender</a>
                  <a href="#" class="btn btn-outline-secondary btn-lg">Saiba mais</a>
                </div>
              </div>
              <div class="col-lg-6">
                <img src="https://placehold.co/600x600" alt="Organizador de evento usando um tablet" class="img-fluid rounded shadow">
              </div>
            </div>
          </div>
        </section>
  
        <!-- Newsletter Section -->
        <section class="py-5 bg-gradient text">
          <div class="container py-5 text-center">
            <h2 class="display-5 fw-bold mb-3">Fique por dentro das novidades</h2>
            <p class="lead mb-5 mx-auto" style="max-width: 600px;">
              Receba em primeira mão informações sobre os melhores eventos e ofertas exclusivas
            </p>
            <div class="row justify-content-center">
              <div class="col-md-8 col-lg-6">
                <form class="d-flex flex-column flex-sm-row gap-2 mb-2">
                  <input type="email" class="form-control" placeholder="Digite seu email">
                  <button type="submit" class="btn btn-light">Inscrever-se</button>
                </form>
                <p class="small">
                  Ao se inscrever, você concorda com nossos
                  <a href="#" class="text-black text-decoration-underline">Termos de Serviço</a> e
                  <a href="#" class="text-black text-decoration-underline">Política de Privacidade</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      <!-- Footer -->
  
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
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
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
  </style>