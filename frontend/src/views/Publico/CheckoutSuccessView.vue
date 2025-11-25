<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body p-5">
            <div v-if="loading" class="mb-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Processando...</span>
              </div>
            </div>
            <div v-else>
              <div class="mb-4">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
              </div>
              <h2 class="fw-bold mb-3">Pagamento Aprovado!</h2>
              <p class="text-muted mb-4">
                Seu pagamento foi processado com sucesso. Seus ingressos já estão disponíveis em "Meus Ingressos".
              </p>
            </div>
            
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
import { listarPedidos, atualizarStatusPedido } from '@/services/api';
import Swal from 'sweetalert2';

export default {
  name: 'CheckoutSuccessView',
  data() {
    return {
      loading: true
    };
  },
  async created() {
    await this.processarPagamento();
    // Limpar dados do checkout
    localStorage.removeItem('checkoutData');
  },
  methods: {
    async processarPagamento() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.loading = false;
        return;
      }

      try {
        // Buscar pedidos pendentes do usuário
        const pedidos = await listarPedidos(token, { statusPagamento: 'aguarde' });
        
        if (pedidos && pedidos.length > 0) {
          // Atualizar todos os pedidos para "confirmado"
          const promises = pedidos.map(pedido => 
            atualizarStatusPedido(pedido.id, { statusPagamento: 'confirmado' }, token)
          );
          
          await Promise.all(promises);
          console.log(`${pedidos.length} pedido(s) atualizado(s) para confirmado`);
        }
      } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        // Não mostrar erro ao usuário, apenas logar
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}
</style>

