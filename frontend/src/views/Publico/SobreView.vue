<template>
  <div class="min-vh-100 bg-light">
    <NavBarComponents />
    
    <main>
      <!-- Breadcrumb -->
      <div class="bg-light py-2">
        <div class="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none">Início</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Sobre Nós
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="bg-primary text-white py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-8 mx-auto text-center">
              <h1 class="display-5 fw-bold mb-3">Sobre o Conecta Eventos</h1>
              <p class="lead mb-0">
                Conectando pessoas através de experiências inesquecíveis
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="py-5">
        <div class="container">
          <div class="row g-4 align-items-center mb-5">
            <div class="col-lg-6">
              <h2 class="h3 fw-bold mb-4">Nossa História</h2>
              <p class="text-muted mb-3">
                O Conecta Eventos nasceu da paixão por unir pessoas e criar momentos especiais. 
                Fundada em 2020, nossa plataforma surgiu com o objetivo de democratizar o acesso 
                a eventos culturais, esportivos e de entretenimento em todo o Brasil.
              </p>
              <p class="text-muted mb-3">
                Começamos como uma pequena startup e hoje somos uma das principais plataformas 
                de eventos do país, conectando milhões de pessoas a experiências únicas e 
                inesquecíveis.
              </p>
              <p class="text-muted mb-0">
                Acreditamos que cada evento é uma oportunidade de criar memórias, fazer novas 
                conexões e viver momentos que marcam nossas vidas. Por isso, trabalhamos 
                incansavelmente para oferecer a melhor experiência tanto para quem participa 
                quanto para quem organiza eventos.
              </p>
            </div>
            <div class="col-lg-6">
              <div class="card border-0 shadow-sm">
                <img
                  src="https://placehold.co/800x500/7749f8/ffffff?text=Conecta+Eventos"
                  alt="Nossa Equipe"
                  class="card-img-top"
                  style="height: 400px; object-fit: cover;"
                />
              </div>
            </div>
          </div>

          <!-- Mission, Vision, Values -->
          <div class="row g-4 mb-5">
            <div class="col-md-4">
              <div class="card border-0 shadow-sm h-100 text-center">
                <div class="card-body p-4">
                  <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                    <i class="bi bi-bullseye text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h3 class="h5 fw-bold mb-3">Missão</h3>
                  <p class="text-muted mb-0">
                    Conectar pessoas a experiências transformadoras, facilitando o acesso 
                    a eventos e promovendo a cultura e o entretenimento em todo o Brasil.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card border-0 shadow-sm h-100 text-center">
                <div class="card-body p-4">
                  <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                    <i class="bi bi-eye text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h3 class="h5 fw-bold mb-3">Visão</h3>
                  <p class="text-muted mb-0">
                    Ser a plataforma de eventos mais confiável e inovadora da América Latina, 
                    reconhecida por excelência no atendimento e na experiência do usuário.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card border-0 shadow-sm h-100 text-center">
                <div class="card-body p-4">
                  <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                    <i class="bi bi-heart text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h3 class="h5 fw-bold mb-3">Valores</h3>
                  <p class="text-muted mb-0">
                    Transparência, inovação, comprometimento com a satisfação do cliente e 
                    responsabilidade social são os pilares que guiam todas as nossas ações.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Numbers Section -->
          <div class="row g-4 mb-5">
            <div class="col-12">
              <div class="card border-0 shadow-sm bg-gradient text-white">
                <div class="card-body p-5">
                  <h2 class="h3 fw-bold text-center mb-5">Números que Nos Orgulham</h2>
                  <div class="row g-4 text-center">
                    <div class="col-md-3 col-6">
                      <div class="mb-3">
                        <h2 class="display-4 fw-bold mb-2">500K+</h2>
                        <p class="mb-0">Usuários Ativos</p>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="mb-3">
                        <h2 class="display-4 fw-bold mb-2">10K+</h2>
                        <p class="mb-0">Eventos Realizados</p>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="mb-3">
                        <h2 class="display-4 fw-bold mb-2">2M+</h2>
                        <p class="mb-0">Ingressos Vendidos</p>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="mb-3">
                        <h2 class="display-4 fw-bold mb-2">50+</h2>
                        <p class="mb-0">Cidades Atendidas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Team Section -->
          <div class="row mb-5">
            <div class="col-12 text-center mb-4">
              <h2 class="h3 fw-bold mb-3">Nossa Equipe</h2>
              <p class="text-muted">Profissionais dedicados a tornar cada evento uma experiência única</p>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card border-0 shadow-sm text-center">
                <div class="card-body p-4">
                  <img
                    src="https://placehold.co/150x150/7749f8/ffffff?text=FA"
                    alt="João Silva"
                    class="rounded-circle mb-3"
                    style="width: 150px; height: 150px; object-fit: cover;"
                  />
                  <h5 class="fw-bold mb-1">Felipe Araujo</h5>
                  <p class="text-muted small mb-3">CEO & Fundador</p>
                  <div class="d-flex justify-content-center gap-2">
                    <a href="#" class="text-muted"><i class="bi bi-linkedin"></i></a>
                    <a href="#" class="text-muted"><i class="bi bi-twitter"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card border-0 shadow-sm text-center">
                <div class="card-body p-4">
                  <img
                    src="https://placehold.co/150x150/ff9933/ffffff?text=MJ"
                    alt="Maria Santos"
                    class="rounded-circle mb-3"
                    style="width: 150px; height: 150px; object-fit: cover;"
                  />
                  <h5 class="fw-bold mb-1">Matheus Junior</h5>
                  <p class="text-muted small mb-3">CEO & Fundador</p>
                  <div class="d-flex justify-content-center gap-2">
                    <a href="#" class="text-muted"><i class="bi bi-linkedin"></i></a>
                    <a href="#" class="text-muted"><i class="bi bi-twitter"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card border-0 shadow-sm text-center">
                <div class="card-body p-4">
                  <img
                    src="https://placehold.co/150x150/7749f8/ffffff?text=PB"
                    alt="Pedro Costa"
                    class="rounded-circle mb-3"
                    style="width: 150px; height: 150px; object-fit: cover;"
                  />
                  <h5 class="fw-bold mb-1">Pedro Bonini</h5>
                  <p class="text-muted small mb-3">CEO & Fundador</p>
                  <div class="d-flex justify-content-center gap-2">
                    <a href="#" class="text-muted"><i class="bi bi-linkedin"></i></a>
                    <a href="#" class="text-muted"><i class="bi bi-twitter"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Why Choose Us Section -->
          <div class="row g-4">
            <div class="col-12 text-center mb-4">
              <h2 class="h3 fw-bold mb-3">Por Que Escolher o Conecta Eventos?</h2>
              <p class="text-muted">Diferenciais que fazem a diferença na sua experiência</p>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="d-flex align-items-start mb-4">
                <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3 flex-shrink-0">
                  <i class="bi bi-shield-check text-primary" style="font-size: 1.5rem;"></i>
                </div>
                <div>
                  <h5 class="fw-bold mb-2">Segurança Garantida</h5>
                  <p class="text-muted mb-0">
                    Transações 100% seguras com certificação SSL e proteção de dados.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="d-flex align-items-start mb-4">
                <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3 flex-shrink-0">
                  <i class="bi bi-clock-history text-primary" style="font-size: 1.5rem;"></i>
                </div>
                <div>
                  <h5 class="fw-bold mb-2">Atendimento 24/7</h5>
                  <p class="text-muted mb-0">
                    Suporte disponível quando você precisar, todos os dias da semana.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="d-flex align-items-start mb-4">
                <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3 flex-shrink-0">
                  <i class="bi bi-phone text-primary" style="font-size: 1.5rem;"></i>
                </div>
                <div>
                  <h5 class="fw-bold mb-2">App Mobile</h5>
                  <p class="text-muted mb-0">
                    Gerencie seus ingressos e eventos direto do seu celular.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="d-flex align-items-start mb-4">
                <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3 flex-shrink-0">
                  <i class="bi bi-graph-up-arrow text-primary" style="font-size: 1.5rem;"></i>
                </div>
                <div>
                  <h5 class="fw-bold mb-2">Ferramentas Avançadas</h5>
                  <p class="text-muted mb-0">
                    Dashboard completo para organizadores com analytics e relatórios.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="d-flex align-items-start mb-4">
                <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3 flex-shrink-0">
                  <i class="bi bi-credit-card text-primary" style="font-size: 1.5rem;"></i>
                </div>
                <div>
                  <h5 class="fw-bold mb-2">Múltiplas Formas de Pagamento</h5>
                  <p class="text-muted mb-0">
                    Aceitamos cartões, PIX, boleto e outras formas de pagamento.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="d-flex align-items-start mb-4">
                <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3 flex-shrink-0">
                  <i class="bi bi-star-fill text-primary" style="font-size: 1.5rem;"></i>
                </div>
                <div>
                  <h5 class="fw-bold mb-2">Experiência Premium</h5>
                  <p class="text-muted mb-0">
                    Interface intuitiva e fácil de usar, pensada para você.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-5 bg-gradient text-white">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto text-center">
              <h2 class="h3 fw-bold mb-3">Pronto para Começar?</h2>
              <p class="lead mb-4">
                Junte-se a milhares de pessoas que já descobriram eventos incríveis através do Conecta Eventos
              </p>
              <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <router-link to="/eventos" class="btn btn-light btn-lg">
                  <i class="bi bi-calendar-event me-2"></i>
                  Explorar Eventos
                </router-link>
                <router-link to="/contato" class="btn btn-outline-light btn-lg">
                  <i class="bi bi-envelope me-2"></i>
                  Entre em Contato
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <FooterComponents />
  </div>
</template>

<script>
import NavBarComponents from '@/components/Publico/common/NavBarComponents.vue';
import FooterComponents from '@/components/Publico/common/FooterComponents.vue';

export default {
  name: 'SobreView',
  components: {
    NavBarComponents,
    FooterComponents
  }
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

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
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

/* Gradiente para seções especiais */
.bg-gradient {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  ) !important;
}

/* Estilos para o breadcrumb */
.breadcrumb-item a {
  color: var(--primary-color);
}

.breadcrumb-item.active {
  color: var(--secondary-color);
}

/* Cards com hover */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Estilos para botões outline light */
.btn-outline-light {
  color: white;
  border-color: white;
}

.btn-outline-light:hover {
  background-color: white;
  border-color: white;
  color: var(--primary-color);
}
</style>

