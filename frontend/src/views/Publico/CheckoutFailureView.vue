<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body p-5">
            <div class="mb-4">
              <i class="bi bi-x-circle-fill text-danger" style="font-size: 4rem;"></i>
            </div>
            <h2 class="fw-bold mb-3">Pagamento Não Aprovado</h2>
            <p class="text-muted mb-4">
              Não foi possível processar seu pagamento. Por favor, tente novamente ou escolha outra forma de pagamento.
            </p>
            
            <div class="d-grid gap-2">
              <button class="btn btn-primary" @click="$router.push('/checkout')">
                Tentar Novamente
              </button>
              <button class="btn btn-outline-secondary" @click="$router.push('/')">
                Voltar para Home
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
  name: 'CheckoutFailureView'
};
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}
</style>

