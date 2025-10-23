<template>
  <div class="maintenance-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 text-center">
          <!-- Ícone Simples -->
          <div class="mb-4">
            <i class="bi bi-tools text-primary" style="font-size: 4rem;"></i>
          </div>
          
          <!-- Título Principal -->
          <h1 class="display-4 fw-bold mb-3">404</h1>
          <h2 class="h3 mb-4">Página em Manutenção</h2>
          
          <!-- Mensagem Simples -->
          <p class="lead text-muted mb-5">
            Estamos trabalhando para melhorar sua experiência. 
            Volte em breve para descobrir as novidades!
          </p>
          
          <!-- Botões de Ação -->
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button @click="goHome" class="btn btn-primary btn-lg px-4">
              Voltar ao Início
            </button>
            <button @click="refreshPage" class="btn btn-outline-primary btn-lg px-4">
              Tentar Novamente
            </button>
          </div>
          
          <!-- Informação de Contato Simples -->
          <div class="mt-5 pt-4 border-top">
            <p class="text-muted mb-0">
              Precisa de ajuda? Entre em contato: 
              <a href="mailto:suporte@conectaeventos.com" class="text-primary text-decoration-none">
                suporte@conectaeventos.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaintenancePage',
  methods: {
    goHome() {
      this.$router.push('/');
    },
    refreshPage() {
      window.location.reload();
    }
  }
}
</script>

<style scoped>
.maintenance-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
}

/* Usando as mesmas cores da navbar/home */
:root {
  --primary-color: #7749F8;
  --secondary-color: #FF9933;
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
}
</style>
