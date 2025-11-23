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
                Contato
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
              <h1 class="display-5 fw-bold mb-3">Entre em Contato</h1>
              <p class="lead mb-0">
                Estamos aqui para ajudar! Entre em contato conosco e responderemos o mais rápido possível.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="py-5">
        <div class="container">
          <div class="row g-4">
            <!-- Contact Form -->
            <div class="col-lg-8">
              <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                  <h2 class="h4 fw-bold mb-4">Envie sua Mensagem</h2>
                  
                  <form @submit.prevent="submitForm">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label for="nome" class="form-label">Nome Completo *</label>
                        <input
                          type="text"
                          class="form-control"
                          id="nome"
                          v-model="formData.nome"
                          required
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="email" class="form-label">E-mail *</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          v-model="formData.email"
                          required
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="telefone" class="form-label">Telefone</label>
                        <input
                          type="tel"
                          class="form-control"
                          id="telefone"
                          v-model="formData.telefone"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="assunto" class="form-label">Assunto *</label>
                        <select
                          class="form-select"
                          id="assunto"
                          v-model="formData.assunto"
                          required
                        >
                          <option value="">Selecione um assunto</option>
                          <option value="suporte">Suporte Técnico</option>
                          <option value="eventos">Dúvidas sobre Eventos</option>
                          <option value="organizador">Sou Organizador</option>
                          <option value="parceria">Parcerias</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                      <div class="col-12">
                        <label for="mensagem" class="form-label">Mensagem *</label>
                        <textarea
                          class="form-control"
                          id="mensagem"
                          rows="6"
                          v-model="formData.mensagem"
                          required
                          placeholder="Descreva sua dúvida ou solicitação..."
                        ></textarea>
                      </div>
                      <div class="col-12">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg"
                          :disabled="isSubmitting"
                        >
                          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                          <i v-else class="bi bi-send me-2"></i>
                          {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
                        </button>
                      </div>
                    </div>
                  </form>

                  <!-- Success Message -->
                  <div v-if="showSuccess" class="alert alert-success mt-4" role="alert">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>

                  <!-- Error Message -->
                  <div v-if="showError" class="alert alert-danger mt-4" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    {{ errorMessage }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="col-lg-4">
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-4">
                  <h3 class="h5 fw-bold mb-4">Informações de Contato</h3>
                  
                  <div class="mb-4">
                    <div class="d-flex align-items-start mb-3">
                      <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <i class="bi bi-envelope-fill text-primary"></i>
                      </div>
                      <div>
                        <h6 class="fw-bold mb-1">E-mail</h6>
                        <p class="text-muted mb-0">contato@conectaeventos.com</p>
                        <p class="text-muted mb-0">suporte@conectaeventos.com</p>
                      </div>
                    </div>

                    <div class="d-flex align-items-start mb-3">
                      <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <i class="bi bi-telephone-fill text-primary"></i>
                      </div>
                      <div>
                        <h6 class="fw-bold mb-1">Telefone</h6>
                        <p class="text-muted mb-0">(11) 3000-0000</p>
                        <p class="text-muted mb-0">(11) 99999-9999</p>
                      </div>
                    </div>

                    <div class="d-flex align-items-start mb-3">
                      <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <i class="bi bi-geo-alt-fill text-primary"></i>
                      </div>
                      <div>
                        <h6 class="fw-bold mb-1">Endereço</h6>
                        <p class="text-muted mb-0">
                          Av. Paulista, 1000<br>
                          Bela Vista, São Paulo - SP<br>
                          CEP: 01310-100
                        </p>
                      </div>
                    </div>

                    <div class="d-flex align-items-start">
                      <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <i class="bi bi-clock-fill text-primary"></i>
                      </div>
                      <div>
                        <h6 class="fw-bold mb-1">Horário de Atendimento</h6>
                        <p class="text-muted mb-0">
                          Segunda a Sexta: 9h às 18h<br>
                          Sábado: 9h às 13h<br>
                          Domingo: Fechado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Social Media -->
              <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                  <h3 class="h5 fw-bold mb-4">Redes Sociais</h3>
                  <div class="d-flex flex-column gap-3">
                    <a href="#" class="btn btn-outline-primary d-flex align-items-center">
                      <i class="bi bi-facebook me-2"></i>
                      Facebook
                    </a>
                    <a href="#" class="btn btn-outline-primary d-flex align-items-center">
                      <i class="bi bi-instagram me-2"></i>
                      Instagram
                    </a>
                    <a href="#" class="btn btn-outline-primary d-flex align-items-center">
                      <i class="bi bi-twitter me-2"></i>
                      Twitter
                    </a>
                    <a href="#" class="btn btn-outline-primary d-flex align-items-center">
                      <i class="bi bi-linkedin me-2"></i>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-5 bg-white">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto text-center mb-4">
              <h2 class="h3 fw-bold mb-3">Perguntas Frequentes</h2>
              <p class="text-muted">Encontre respostas rápidas para as dúvidas mais comuns</p>
            </div>
          </div>
          <div class="row g-4">
            <div class="col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <h5 class="fw-bold mb-3">
                    <i class="bi bi-question-circle text-primary me-2"></i>
                    Como compro ingressos?
                  </h5>
                  <p class="text-muted mb-0">
                    Basta navegar pelos eventos, escolher o ingresso desejado e seguir o processo de compra. 
                    Você receberá o ingresso por e-mail após a confirmação do pagamento.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <h5 class="fw-bold mb-3">
                    <i class="bi bi-question-circle text-primary me-2"></i>
                    Como organizo um evento?
                  </h5>
                  <p class="text-muted mb-0">
                    Entre em contato conosco através deste formulário selecionando "Sou Organizador" 
                    ou acesse a área para organizadores. Nossa equipe entrará em contato para mais detalhes.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <h5 class="fw-bold mb-3">
                    <i class="bi bi-question-circle text-primary me-2"></i>
                    Posso cancelar minha compra?
                  </h5>
                  <p class="text-muted mb-0">
                    Sim, você pode cancelar sua compra seguindo nossa política de cancelamento. 
                    Consulte os termos e condições para mais informações sobre reembolsos.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4">
                  <h5 class="fw-bold mb-3">
                    <i class="bi bi-question-circle text-primary me-2"></i>
                    Como recebo meu ingresso?
                  </h5>
                  <p class="text-muted mb-0">
                    Após a confirmação do pagamento, você receberá um e-mail com seu ingresso em formato PDF 
                    e um QR Code que pode ser apresentado na entrada do evento.
                  </p>
                </div>
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
  name: 'ContatoView',
  components: {
    NavBarComponents,
    FooterComponents
  },
  data() {
    return {
      formData: {
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      },
      isSubmitting: false,
      showSuccess: false,
      showError: false,
      errorMessage: ''
    };
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      this.showSuccess = false;
      this.showError = false;

      try {
        // Aqui você pode integrar com uma API de envio de e-mail ou salvar no backend
        // Por enquanto, simulamos um envio
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulação de sucesso
        this.showSuccess = true;
        this.formData = {
          nome: '',
          email: '',
          telefone: '',
          assunto: '',
          mensagem: ''
        };

        // Scroll para a mensagem de sucesso
        setTimeout(() => {
          const alert = document.querySelector('.alert-success');
          if (alert) {
            alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);

      } catch (error) {
        this.showError = true;
        this.errorMessage = 'Erro ao enviar mensagem. Por favor, tente novamente.';
        console.error('Erro ao enviar formulário:', error);
      } finally {
        this.isSubmitting = false;
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

/* Estilos para o breadcrumb */
.breadcrumb-item a {
  color: var(--primary-color);
}

.breadcrumb-item.active {
  color: var(--secondary-color);
}

/* Estilos para os inputs de formulário */
.form-control:focus,
.form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.25);
}

/* Cards com hover */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>

