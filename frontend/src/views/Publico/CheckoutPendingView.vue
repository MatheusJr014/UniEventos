<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body p-5">
            <div class="mb-4">
              <div class="spinner-border text-warning" role="status" style="width: 4rem; height: 4rem;">
                <span class="visually-hidden">Carregando...</span>
              </div>
            </div>
            <h2 class="fw-bold mb-3">Pagamento Pendente</h2>
            <p class="text-muted mb-4">
              Seu pagamento está sendo processado. Você receberá um e-mail assim que o pagamento for confirmado.
            </p>
            
            <div class="d-grid gap-2">
              <button class="btn btn-primary" @click="$router.push('/')">
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
  name: 'CheckoutPendingView'
};
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}
</style>

