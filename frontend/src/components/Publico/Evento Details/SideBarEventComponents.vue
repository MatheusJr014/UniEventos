<template>
  <div class="col-lg-4">
    <div class="card border-0 shadow-sm mb-4 sticky-top" style="top: 90px; z-index: 10">
      <div class="card-body">
        <h3 class="h5 fw-bold mb-3">Ingressos</h3>

        <!-- Loading state -->
        <div v-if="loading" class="text-center py-3">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>

        <!-- Lista de ingressos -->
        <div v-else class="mb-4">
          <div v-for="(ticket, index) in tickets" :key="ticket.id" class="card mb-3 border">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 class="mb-1">{{ ticket.tipoingresso }}</h6>
                  <p class="text-muted small mb-0">{{ ticket.tipoingresso }}</p>
                </div>
                <span class="badge" :class="ticket.quantidadeDisponivel ? 'bg-success' : 'bg-danger'">
                  {{ ticket.quantidadeDisponivel ? "Disponível" : "Esgotado" }}
                </span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bold">R$ {{ ticket.preco.toFixed(2).replace('.', ',') }}</div>
                <div class="input-group input-group-sm" style="width: 110px">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    :disabled="!ticket.quantidadeDisponivel || ticket.quantidadeDisponivel <= 0"
                    @click="decrementTicket(index)"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    class="form-control text-center"
                    :value="ticket.quantidade"
                    readonly
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    :disabled="!ticket.quantidadeDisponivel"
                    @click="incrementTicket(index)"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo do pedido -->
        <div class="mb-3">
          <div class="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>R$ {{ subtotal.toFixed(2).replace('.', ',') }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Taxa de serviço</span>
            <span>R$ {{ serviceFee.toFixed(2).replace('.', ',') }}</span>
          </div>
          <div class="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>R$ {{ total.toFixed(2).replace('.', ',') }}</span>
          </div>
        </div>

        <button 
          class="btn btn-primary w-100 mb-3" 
          :disabled="subtotal <= 0 || isProcessing"
          @click="irParaCheckout"
        >
          <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2" role="status"></span>
          {{ isProcessing ? 'Processando...' : 'Comprar Ingressos' }}
        </button>

        <div class="d-flex align-items-center justify-content-center text-muted small">
          <i class="bi bi-shield-check me-2"></i>
          <span>Compra 100% segura</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIngressosPorEvento } from '@/services/api';

export default {
  name: "SideBarEvent",
  props: {
    eventId: { type: Number, required: true },
    // Opcional: Se o pai quiser controlar o estado
    modelValue: { type: Array, default: () => [] }
  },
  data() {
    return {
      loading: true,
      tickets: [],
      subtotal: 0,
      serviceFee: 0,
      total: 0,
      isProcessing: false
    };
  },
  async created() {
    await this.fetchTickets();
  },
  methods: {
    async fetchTickets() {
      try {
        this.loading = true;
        // getIngressosPorEvento já retorna o JSON (axios)
        const data = await getIngressosPorEvento(this.eventId);

        this.tickets = data.map(ticket => ({
          ...ticket,
          quantidade: 0,
          preco: parseFloat(ticket.preco)
        }));
        
        this.calculateTotals();
      } catch (error) {
        console.error("Erro ao carregar ingressos:", error);
      } finally {
        this.loading = false;
      }
    },
    incrementTicket(index) {
      if (this.tickets[index].quantidadeDisponivel) {
        this.tickets[index].quantidade++;
        this.calculateTotals();
      }
    },
    decrementTicket(index) {
      if (this.tickets[index].quantidade > 0) {
        this.tickets[index].quantidade--;
        this.calculateTotals();
      }
    },
    calculateTotals() {
      this.subtotal = this.tickets.reduce((total, ticket) => {
        return total + (ticket.preco * ticket.quantidade);
      }, 0);
      
      this.serviceFee = this.subtotal * 0.1; // 10% de taxa
      this.total = this.subtotal + this.serviceFee;
    },
    irParaCheckout() {
      // Filtrar apenas ingressos com quantidade > 0
      const itensSelecionados = this.tickets
        .filter(ticket => ticket.quantidade > 0)
        .map(ticket => ({
          ingressoId: ticket.id,
          quantidade: ticket.quantidade
        }));

      if (itensSelecionados.length === 0) {
        return;
      }

      // Salvar dados no localStorage para usar no checkout
      const checkoutData = {
        eventId: this.eventId,
        itens: itensSelecionados,
        subtotal: this.subtotal,
        serviceFee: this.serviceFee,
        total: this.total,
        tickets: this.tickets.filter(t => t.quantidade > 0)
      };

      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
      
      // Redirecionar para checkout
      this.$router.push('/checkout');
    }
  }
};
</script>