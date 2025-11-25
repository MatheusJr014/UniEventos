<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <!-- Header -->
        <div class="mb-4">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2 class="fw-bold">Checkout</h2>
              <p class="text-muted">Finalize sua compra de ingressos</p>
            </div>
            <button class="btn btn-outline-secondary" @click="$router.push('/')">
              <i class="bi bi-arrow-left me-2"></i>Voltar
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <p class="mt-3">Preparando seu pagamento...</p>
        </div>

        <!-- Erro -->
        <div v-else-if="error" class="alert alert-danger">
          <h5 class="alert-heading">Erro ao processar pagamento</h5>
          <p>{{ error }}</p>
          <hr>
          <button class="btn btn-outline-danger" @click="$router.push('/')">
            Voltar para Home
          </button>
        </div>

        <!-- Conteúdo do Checkout -->
        <div v-else>
          <!-- Resumo do Pedido -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Resumo do Pedido</h5>
            </div>
            <div class="card-body">
              <div v-for="item in checkoutData.tickets" :key="item.id" class="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <div>
                  <h6 class="mb-1">{{ item.tipoingresso || 'Ingresso' }}</h6>
                  <small class="text-muted">Quantidade: {{ item.quantidade }}</small>
                </div>
                <div class="text-end">
                  <div class="fw-bold">R$ {{ (item.preco * item.quantidade).toFixed(2).replace('.', ',') }}</div>
                  <small class="text-muted">R$ {{ item.preco.toFixed(2).replace('.', ',') }} cada</small>
                </div>
              </div>

              <div class="mt-3">
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>R$ {{ checkoutData.subtotal.toFixed(2).replace('.', ',') }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Taxa de serviço (10%)</span>
                  <span>R$ {{ checkoutData.serviceFee.toFixed(2).replace('.', ',') }}</span>
                </div>
                <div class="d-flex justify-content-between fw-bold fs-5 pt-2 border-top">
                  <span>Total</span>
                  <span class="text-primary">R$ {{ checkoutData.total.toFixed(2).replace('.', ',') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Botão de Pagamento -->
          <div class="card border-0 shadow-sm">
            <div class="card-body text-center">
              <h5 class="mb-3">Finalizar Pagamento</h5>
              <p class="text-muted mb-4">Você será redirecionado para o Mercado Pago para concluir o pagamento</p>
              
              <button 
                class="btn btn-primary btn-lg w-100 mb-3" 
                :disabled="processing"
                @click="processarPagamento"
              >
                <span v-if="processing" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ processing ? 'Processando...' : 'Pagar com Mercado Pago' }}
              </button>

              <div class="d-flex align-items-center justify-content-center text-muted small">
                <i class="bi bi-shield-check me-2"></i>
                <span>Pagamento 100% seguro</span>
              </div>
            </div>
          </div>

          <!-- Informações de Segurança -->
          <div class="mt-4 text-center">
            <small class="text-muted">
              <i class="bi bi-lock me-1"></i>
              Seus dados estão protegidos. Não armazenamos informações de cartão de crédito.
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { criarCheckout } from '@/services/api';
import Swal from 'sweetalert2';

export default {
  name: 'CheckoutView',
  data() {
    return {
      loading: true,
      processing: false,
      error: null,
      checkoutData: null
    };
  },
  async created() {
    await this.loadCheckoutData();
  },
  methods: {
    loadCheckoutData() {
      try {
        const data = localStorage.getItem('checkoutData');
        if (!data) {
          this.error = 'Nenhum item selecionado para compra.';
          this.loading = false;
          return;
        }

        this.checkoutData = JSON.parse(data);
        this.loading = false;
      } catch (error) {
        console.error('Erro ao carregar dados do checkout:', error);
        this.error = 'Erro ao carregar dados do checkout.';
        this.loading = false;
      }
    },
    async processarPagamento() {
      // Verificar se usuário está logado
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'warning',
          title: 'Login necessário',
          text: 'Você precisa estar logado para realizar a compra.',
          confirmButtonColor: '#7749F8'
        }).then(() => {
          this.$router.push('/auth/login');
        });
        return;
      }

      this.processing = true;

      try {
        const response = await criarCheckout({
          itens: this.checkoutData.itens,
          eventoId: this.checkoutData.eventId
        });

        // Redirecionar para o Mercado Pago
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        } else {
          throw new Error('URL de pagamento não retornada');
        }
      } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        this.processing = false;
        
        let errorMessage = 'Erro ao processar pagamento. Tente novamente.';
        
        if (error.response?.status === 401) {
          errorMessage = 'Você precisa estar logado para realizar a compra.';
          Swal.fire({
            icon: 'warning',
            title: 'Login necessário',
            text: errorMessage,
            confirmButtonColor: '#7749F8'
          }).then(() => {
            this.$router.push('/auth/login');
          });
          return;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Erro ao processar pagamento',
          text: errorMessage,
          confirmButtonColor: '#dc3545'
        });
      }
    }
  },
  beforeUnmount() {
    // Limpar dados do checkout após sair da página (opcional)
    // localStorage.removeItem('checkoutData');
  }
};
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}

.btn-primary {
  background-color: #7749F8;
  border-color: #7749F8;
}

.btn-primary:hover {
  background-color: #6538e6;
  border-color: #6538e6;
}
</style>

