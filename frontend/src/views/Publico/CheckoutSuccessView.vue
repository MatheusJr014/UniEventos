<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body p-5">
            <div class="mb-4">
              <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
            </div>
            <h2 class="fw-bold mb-3">Pagamento Aprovado!</h2>
            <p class="text-muted mb-4">
              Seu pagamento foi processado com sucesso. Você receberá um e-mail com os detalhes dos seus ingressos.
            </p>
            
            <div class="d-grid gap-2">
              <button class="btn btn-primary" @click="$router.push('/')">
                Voltar para Home
              </button>
              <button class="btn btn-outline-secondary" @click="$router.push('/usuario/ingressos')">
                Ver Meus Ingressos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutSuccessView',
  created() {
    // Limpar dados do checkout
    localStorage.removeItem('checkoutData');
  }
};
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}
</style>

