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
                Para Organizadores
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
              <h1 class="display-5 fw-bold mb-3">Plataforma Completa para Organizadores</h1>
              <p class="lead mb-4">
                Gerencie seus eventos de forma profissional e alcance mais pessoas com nossas ferramentas
              </p>
              <router-link to="/auth/login" class="btn btn-light btn-lg">
                <i class="bi bi-rocket-takeoff me-2"></i>
                Começar Agora
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-5">
        <div class="container">
          <div class="row mb-5">
            <div class="col-12 text-center">
              <h2 class="h3 fw-bold mb-3">Tudo que você precisa em um só lugar</h2>
              <p class="text-muted">Ferramentas poderosas para criar, gerenciar e promover seus eventos</p>
            </div>
          </div>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100 text-center">
                <div class="card-body p-4">
                  <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                    <i class="bi bi-calendar-check text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h5 class="fw-bold mb-3">Criação de Eventos</h5>
                  <p class="text-muted mb-0">
                    Crie eventos profissionais em minutos com nosso editor intuitivo e personalizável.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100 text-center">
                <div class="card-body p-4">
                  <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                    <i class="bi bi-ticket-perforated text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h5 class="fw-bold mb-3">Gestão de Ingressos</h5>
                  <p class="text-muted mb-0">
                    Controle total sobre tipos de ingressos, preços, quantidades e disponibilidade.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100 text-center">
                <div class="card-body p-4">
                  <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                    <i class="bi bi-graph-up-arrow text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h5 class="fw-bold mb-3">Analytics e Relatórios</h5>
                  <p class="text-muted mb-0">
                    Acompanhe vendas, público e receita em tempo real com dashboards completos.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100 text-center">
                <div class="card-body p-4">
                  <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                    <i class="bi bi-credit-card text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h5 class="fw-bold mb-3">Pagamentos Seguros</h5>
                  <p class="text-muted mb-0">
                    Receba pagamentos de forma segura com múltiplas formas de pagamento integradas.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100 text-center">
                <div class="card-body p-4">
                  <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                    <i class="bi bi-megaphone text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h5 class="fw-bold mb-3">Marketing Integrado</h5>
                  <p class="text-muted mb-0">
                    Promova seus eventos com ferramentas de email marketing e redes sociais.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100 text-center">
                <div class="card-body p-4">
                  <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                    <i class="bi bi-headset text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h5 class="fw-bold mb-3">Suporte Dedicado</h5>
                  <p class="text-muted mb-0">
                    Conte com nossa equipe especializada para ajudar em todas as etapas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Plans Section -->
      <section class="py-5 bg-white">
        <div class="container">
          <div class="row mb-5">
            <div class="col-12 text-center">
              <h2 class="h3 fw-bold mb-3">Escolha o Plano Ideal para Você</h2>
              <p class="text-muted">Planos flexíveis que crescem junto com seus eventos</p>
            </div>
          </div>
          <div class="row g-4 justify-content-center">
            <!-- Plano Básico -->
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <div class="text-center mb-4">
                    <h3 class="h4 fw-bold mb-2">Básico</h3>
                    <div class="mb-3">
                      <span class="display-4 fw-bold">R$ 0</span>
                      <span class="text-muted">/mês</span>
                    </div>
                    <p class="text-muted small">Ideal para começar</p>
                  </div>
                  <ul class="list-unstyled mb-4">
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Até 3 eventos por mês
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Até 500 ingressos por evento
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Dashboard básico
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Suporte por email
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Taxa de 8% por venda
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-x-circle text-muted me-2"></i>
                      <span class="text-muted">Marketing integrado</span>
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-x-circle text-muted me-2"></i>
                      <span class="text-muted">Relatórios avançados</span>
                    </li>
                  </ul>
                  <router-link to="/auth/login" class="btn btn-outline-primary w-100">
                    Começar Grátis
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Plano Profissional (Destaque) -->
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-lg h-100 position-relative" style="border: 3px solid var(--primary-color) !important;">
                <div class="position-absolute top-0 start-50 translate-middle">
                  <span class="badge bg-primary px-3 py-2">Mais Popular</span>
                </div>
                <div class="card-body p-4 pt-5">
                  <div class="text-center mb-4">
                    <h3 class="h4 fw-bold mb-2">Profissional</h3>
                    <div class="mb-3">
                      <span class="display-4 fw-bold">R$ 99</span>
                      <span class="text-muted">/mês</span>
                    </div>
                    <p class="text-muted small">Para eventos frequentes</p>
                  </div>
                  <ul class="list-unstyled mb-4">
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Eventos ilimitados
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Até 5.000 ingressos por evento
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Dashboard completo
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Suporte prioritário
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Taxa de 5% por venda
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Marketing integrado
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Relatórios avançados
                    </li>
                  </ul>
                  <router-link to="/auth/login" class="btn btn-primary w-100">
                    Assinar Agora
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Plano Empresarial -->
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <div class="text-center mb-4">
                    <h3 class="h4 fw-bold mb-2">Empresarial</h3>
                    <div class="mb-3">
                      <span class="display-4 fw-bold">R$ 299</span>
                      <span class="text-muted">/mês</span>
                    </div>
                    <p class="text-muted small">Para grandes eventos</p>
                  </div>
                  <ul class="list-unstyled mb-4">
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Eventos ilimitados
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Ingressos ilimitados
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Dashboard premium
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Suporte 24/7 dedicado
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Taxa de 3% por venda
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Marketing avançado
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      API personalizada
                    </li>
                    <li class="mb-3">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      Gerente de conta dedicado
                    </li>
                  </ul>
                  <router-link to="/contato" class="btn btn-outline-primary w-100">
                    Falar com Vendas
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Comparison Table -->
          <div class="row mt-5">
            <div class="col-12">
              <div class="card border-0 shadow-sm">
                <div class="card-header bg-white">
                  <h3 class="h5 fw-bold mb-0">Comparação de Planos</h3>
                </div>
                <div class="card-body p-0">
                  <div class="table-responsive">
                    <table class="table table-hover mb-0">
                      <thead class="table-light">
                        <tr>
                          <th scope="col" style="width: 30%;">Recursos</th>
                          <th scope="col" class="text-center">Básico</th>
                          <th scope="col" class="text-center">Profissional</th>
                          <th scope="col" class="text-center">Empresarial</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Eventos por mês</td>
                          <td class="text-center">Até 3</td>
                          <td class="text-center">Ilimitados</td>
                          <td class="text-center">Ilimitados</td>
                        </tr>
                        <tr>
                          <td>Ingressos por evento</td>
                          <td class="text-center">Até 500</td>
                          <td class="text-center">Até 5.000</td>
                          <td class="text-center">Ilimitados</td>
                        </tr>
                        <tr>
                          <td>Taxa por venda</td>
                          <td class="text-center">8%</td>
                          <td class="text-center">5%</td>
                          <td class="text-center">3%</td>
                        </tr>
                        <tr>
                          <td>Dashboard Analytics</td>
                          <td class="text-center">
                            <i class="bi bi-check-circle-fill text-success"></i>
                          </td>
                          <td class="text-center">
                            <i class="bi bi-check-circle-fill text-success"></i>
                          </td>
                          <td class="text-center">
                            <i class="bi bi-check-circle-fill text-success"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>Relatórios Avançados</td>
                          <td class="text-center">
                            <i class="bi bi-x-circle text-muted"></i>
                          </td>
                          <td class="text-center">
                            <i class="bi bi-check-circle-fill text-success"></i>
                          </td>
                          <td class="text-center">
                            <i class="bi bi-check-circle-fill text-success"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>Marketing Integrado</td>
                          <td class="text-center">
                            <i class="bi bi-x-circle text-muted"></i>
                          </td>
                          <td class="text-center">
                            <i class="bi bi-check-circle-fill text-success"></i>
                          </td>
                          <td class="text-center">
                            <i class="bi bi-check-circle-fill text-success"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>Suporte</td>
                          <td class="text-center">Email</td>
                          <td class="text-center">Prioritário</td>
                          <td class="text-center">24/7 Dedicado</td>
                        </tr>
                        <tr>
                          <td>API Personalizada</td>
                          <td class="text-center">
                            <i class="bi bi-x-circle text-muted"></i>
                          </td>
                          <td class="text-center">
                            <i class="bi bi-x-circle text-muted"></i>
                          </td>
                          <td class="text-center">
                            <i class="bi bi-check-circle-fill text-success"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-5">
        <div class="container">
          <div class="row mb-5">
            <div class="col-12 text-center">
              <h2 class="h3 fw-bold mb-3">O que nossos organizadores dizem</h2>
              <p class="text-muted">Depoimentos de quem já usa nossa plataforma</p>
            </div>
          </div>
          <div class="row g-4">
            <div class="col-md-4">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <div class="mb-3">
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                  </div>
                  <p class="text-muted mb-4">
                    "A plataforma facilitou muito a gestão dos meus eventos. O dashboard é intuitivo 
                    e os relatórios me ajudam a tomar decisões melhores."
                  </p>
                  <div class="d-flex align-items-center">
                    <img
                      src="https://placehold.co/50x50/7749f8/ffffff?text=AS"
                      alt="Ana Silva"
                      class="rounded-circle me-3"
                      style="width: 50px; height: 50px; object-fit: cover;"
                    />
                    <div>
                      <h6 class="fw-bold mb-0">Ana Silva</h6>
                      <p class="text-muted small mb-0">Organizadora de Eventos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <div class="mb-3">
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                  </div>
                  <p class="text-muted mb-4">
                    "O suporte é excelente e sempre me ajudam quando preciso. A taxa é justa e 
                    o retorno sobre investimento é muito bom."
                  </p>
                  <div class="d-flex align-items-center">
                    <img
                      src="https://placehold.co/50x50/ff9933/ffffff?text=CM"
                      alt="Carlos Mendes"
                      class="rounded-circle me-3"
                      style="width: 50px; height: 50px; object-fit: cover;"
                    />
                    <div>
                      <h6 class="fw-bold mb-0">Carlos Mendes</h6>
                      <p class="text-muted small mb-0">Produtor Cultural</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <div class="mb-3">
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                  </div>
                  <p class="text-muted mb-4">
                    "Migrei de outra plataforma e não me arrependo. A interface é muito melhor 
                    e as ferramentas de marketing fazem toda a diferença."
                  </p>
                  <div class="d-flex align-items-center">
                    <img
                      src="https://placehold.co/50x50/7749f8/ffffff?text=JC"
                      alt="Juliana Costa"
                      class="rounded-circle me-3"
                      style="width: 50px; height: 50px; object-fit: cover;"
                    />
                    <div>
                      <h6 class="fw-bold mb-0">Juliana Costa</h6>
                      <p class="text-muted small mb-0">Event Manager</p>
                    </div>
                  </div>
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
              <h2 class="h3 fw-bold mb-3">Pronto para começar a organizar eventos?</h2>
              <p class="lead mb-4">
                Junte-se a milhares de organizadores que já confiam na nossa plataforma
              </p>
              <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <router-link to="/auth/login" class="btn btn-light btn-lg">
                  <i class="bi bi-rocket-takeoff me-2"></i>
                  Criar Conta Grátis
                </router-link>
                <router-link to="/contato" class="btn btn-outline-light btn-lg">
                  <i class="bi bi-chat-dots me-2"></i>
                  Falar com Vendas
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
  name: 'ParaOrganizadoresView',
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

/* Estilos para a tabela de comparação */
.table th {
  font-weight: 600;
}

.table td {
  vertical-align: middle;
}
</style>

