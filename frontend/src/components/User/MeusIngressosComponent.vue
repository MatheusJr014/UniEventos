<template>
    <NavBarComponents />
    <section class="py-4">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3>Meus Ingressos</h3>
          <div class="d-flex gap-2">
            <input v-model="query" @input="applyFilters" class="form-control form-control-sm" placeholder="Pesquisar evento, local ou código" />
            <select v-model="statusFilter" @change="applyFilters" class="form-select form-select-sm">
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="used">Usados</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Carregando...</span></div>
        </div>

        <div v-else>
          <div v-if="filteredIngressos.length === 0" class="text-center py-5 text-muted">
            <i class="bi bi-ticket-perforated fs-1 d-block mb-3"></i>
            <p class="mb-2">Você ainda não tem ingressos ou pedidos.</p>
            <p class="small">Seus ingressos e pedidos aparecerão aqui.</p>
            <router-link to="/eventos" class="btn btn-primary mt-3">
              <i class="bi bi-calendar-event me-2"></i>Ver Eventos
            </router-link>
          </div>

          <div class="row g-3">
            <div v-for="ingresso in filteredIngressos" :key="ingresso.id" class="col-md-6 col-lg-4">
              <div class="card h-100 shadow-sm">
                <img v-if="ingresso.Evento && ingresso.Evento.imagem" :src="ingresso.Evento.imagem" class="card-img-top" alt="Capa do evento" style="object-fit:cover; height:140px" />
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title mb-1">{{ ingresso.Evento?.titulo || ingresso.eventoNome || 'Evento' }}</h5>
                  <p class="small text-muted mb-2">{{ formatDate(ingresso.Evento?.dataHora || ingresso.dataEvento) }}</p>
                  <p class="mb-1"><strong>Tipo:</strong> {{ ingresso.tipo || ingresso.tipoIngresso || 'Padrão' }}</p>
                  
                  <!-- Valor do pedido -->
                  <p class="mb-1">
                    <strong>Valor:</strong> 
                    <span class="text-success fw-bold">R$ {{ formatCurrency(ingresso.valorTotal) }}</span>
                  </p>
                  
                  <!-- Quantidade -->
                  <p class="mb-1" v-if="ingresso.quantidade > 1">
                    <strong>Quantidade:</strong> {{ ingresso.quantidade }} ingressos
                  </p>
                  
                  <!-- Código do ingresso - apenas se confirmado -->
                  <p v-if="isConfirmado(ingresso)" class="mb-2">
                    <strong>Código:</strong> <span class="text-monospace">{{ ingresso.codigo || ingresso.id }}</span>
                  </p>

                  <!-- Status do pagamento -->
                  <div class="mb-2">
                    <span class="badge" :class="getStatusPagamentoClass(ingresso.statusPagamento)">
                      {{ getStatusPagamentoLabel(ingresso.statusPagamento) }}
                    </span>
                  </div>

                  <div class="mt-auto d-flex justify-content-between align-items-center">
                    <!-- Status do ingresso (apenas se confirmado) -->
                    <div v-if="isConfirmado(ingresso)">
                      <span class="badge" :class="statusClass(ingresso.status)">{{ labelStatus(ingresso.status) }}</span>
                    </div>
                    <div v-else></div>
                    
                    <!-- Botões de ação -->
                    <div class="btn-group">
                      <!-- QR Code e Baixar - apenas se confirmado -->
                      <template v-if="isConfirmado(ingresso)">
                        <button class="btn btn-sm btn-outline-primary" @click="openQrModal(ingresso)">
                          <i class="bi bi-qr-code"></i> QR
                        </button>
                        <a :href="qrUrlFor(ingresso)" :download="`ingresso-${ingresso.id || ingresso.codigo}.png`" class="btn btn-sm btn-outline-secondary">
                          Baixar
                        </a>
                      </template>
                      <!-- Botão de cancelar - sempre disponível se aguardando pagamento -->
                      <button 
                        class="btn btn-sm btn-outline-danger" 
                        @click="requestCancel(ingresso)" 
                        v-if="canCancel(ingresso) || ingresso.statusPagamento === 'aguarde'"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QR Modal - apenas para ingressos confirmados -->
    <div v-if="showQr && currentIngress && isConfirmado(currentIngress)" class="qr-overlay" @click.self="closeQrModal">
      <div class="qr-card p-4 bg-white rounded shadow-sm text-center">
        <h5 class="mb-3">Ingresso - {{ currentIngress?.Evento?.titulo || currentIngress?.id }}</h5>
        <img :src="qrUrlFor(currentIngress)" alt="QR Code" />
        <p class="small text-muted mt-2">Apresente este QR no acesso do evento.</p>
        <div class="d-flex justify-content-center gap-2 mt-3">
          <a :href="qrUrlFor(currentIngress)" class="btn btn-sm btn-primary" :download="`ingresso-${currentIngress?.id || currentIngress?.codigo}.png`">Baixar QR</a>
          <button class="btn btn-sm btn-outline-secondary" @click="closeQrModal">Fechar</button>
        </div>
      </div>
    </div>
</template>

<script>
import { getIngressosUsuario } from '@/services/api';
import decodeJwt from '@/utils/decodeJwt';
import Swal from 'sweetalert2';
import NavBarComponents from '@/components/Publico/common/NavBarComponents.vue';

export default {
  name: 'MeusIngressos',
  components: {
    NavBarComponents
  },
  data() {
    return {
      ingressos: [],
      filteredIngressos: [],
      loading: true,
      query: '',
      statusFilter: 'all',
      showQr: false,
      currentIngress: null,
      userName: ''
    };
  },
  mounted() {
    this.fetchIngressos();
  },
  methods: {
    async fetchIngressos() {
      this.loading = true;
      const token = localStorage.getItem('token');
      if (!token) {
        this.loading = false;
        Swal.fire({ icon: 'warning', title: 'Não autenticado', text: 'Faça login para ver seus ingressos.' });
        return;
      }

      let userId = null;
      try {
        const decoded = decodeJwt(token) || {};
        userId = decoded?.id || decoded?.userId || decoded?.sub;
        this.userName = decoded.nome || decoded.name || decoded.email || '';
      } catch (err) {
        console.error('Erro ao decodificar token', err);
      }

      if (!userId) {
        this.loading = false;
        console.error('ID do usuário não encontrado no token');
        return;
      }

      try {
        // Buscar ingressos através dos pedidos (confirmados e aguardando pagamento)
        const data = await getIngressosUsuario(userId, token);
        this.ingressos = Array.isArray(data) ? data : (data?.ingressos || data?.rows || []);
        
        // Garantir que temos os dados necessários
        this.ingressos = this.ingressos.map(ing => ({
          ...ing,
          statusPagamento: ing.statusPagamento || 'aguarde',
          status: ing.status || (ing.statusPagamento === 'confirmado' ? 'active' : null)
        }));
        
        this.filteredIngressos = this.ingressos.slice();
      } catch (error) {
        console.error('Erro ao buscar ingressos', error);
        Swal.fire({ 
          icon: 'error', 
          title: 'Erro', 
          text: 'Não foi possível carregar seus ingressos. Tente novamente.' 
        });
      } finally {
        this.loading = false;
      }
    },
    applyFilters() {
      const q = this.query.trim().toLowerCase();
      this.filteredIngressos = this.ingressos.filter((i) => {
        const matchesQuery = !q || (
          (i.Evento?.titulo || i.eventoNome || '').toString().toLowerCase().includes(q) ||
          (i.Evento?.local || i.local || '').toString().toLowerCase().includes(q) ||
          (i.codigo || i.id || '').toString().toLowerCase().includes(q)
        );

        const matchesStatus = this.statusFilter === 'all' || (i.status || 'active') === this.statusFilter;

        return matchesQuery && matchesStatus;
      });
    },
    formatDate(val) {
      if (!val) return '';
      const d = new Date(val);
      return d.toLocaleString('pt-BR');
    },
    formatCurrency(value) {
      if (!value && value !== 0) return '0,00';
      return parseFloat(value).toFixed(2).replace('.', ',');
    },
    qrUrlFor(ingresso) {
      if (!ingresso) return '';
      const payload = encodeURIComponent(ingresso.codigo || ingresso.id || (ingresso.Evento?.id || 'ticket'));
      return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${payload}`;
    },
    openQrModal(ingresso) {
      // Só abrir modal se o ingresso estiver confirmado
      if (this.isConfirmado(ingresso)) {
        this.currentIngress = ingresso;
        this.showQr = true;
      }
    },
    closeQrModal() {
      this.showQr = false;
      this.currentIngress = null;
    },
    isConfirmado(ingresso) {
      return ingresso.statusPagamento === 'confirmado';
    },
    getStatusPagamentoLabel(status) {
      const labels = {
        'aguarde': 'Aguardando Pagamento',
        'confirmado': 'Pagamento Confirmado',
        'cancelado': 'Cancelado'
      };
      return labels[status] || status;
    },
    getStatusPagamentoClass(status) {
      const classes = {
        'aguarde': 'bg-warning text-dark',
        'confirmado': 'bg-success text-white',
        'cancelado': 'bg-danger text-white'
      };
      return classes[status] || 'bg-secondary text-white';
    },
    labelStatus(status) {
      const s = (status || 'active').toLowerCase();
      if (s === 'active') return 'Ativo';
      if (s === 'used') return 'Usado';
      if (s === 'cancelled' || s === 'canceled') return 'Cancelado';
      return s;
    },
    statusClass(status) {
      const s = (status || 'active').toLowerCase();
      if (s === 'active') return 'bg-success text-white';
      if (s === 'used') return 'bg-secondary text-white';
      if (s === 'cancelled' || s === 'canceled') return 'bg-danger text-white';
      return 'bg-light';
    },
    canCancel(ingresso) {
      // Pode cancelar se estiver ativo (confirmado) ou aguardando pagamento
      if (ingresso.statusPagamento === 'aguarde') return true;
      const s = (ingresso.status || 'active').toLowerCase();
      return s === 'active';
    },
    async requestCancel(ingresso) {
      const isAguardando = ingresso.statusPagamento === 'aguarde';
      const title = isAguardando ? 'Cancelar e deletar pedido?' : 'Cancelar ingresso?';
      const text = isAguardando 
        ? 'Deseja realmente cancelar e deletar este pedido? O pedido será removido permanentemente e o pagamento não será processado.'
        : 'Deseja realmente cancelar este ingresso? Essa ação pode ser irreversível.';

      const result = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, cancelar',
        cancelButtonText: 'Não',
        confirmButtonColor: '#dc3545'
      });

      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          
          // Se for um pedido aguardando pagamento, deletar da tabela
          if (isAguardando && ingresso.pedidoId) {
            const { deletarPedido } = await import('@/services/api');
            await deletarPedido(ingresso.pedidoId, token);
          } else if (ingresso.pedidoId) {
            // Se for ingresso confirmado, apenas atualizar status para cancelado
            const { atualizarStatusPedido } = await import('@/services/api');
            await atualizarStatusPedido(ingresso.pedidoId, { statusPagamento: 'cancelado' }, token);
          } else {
            // Se for ingresso confirmado sem pedidoId, apenas atualizar localmente
            ingresso.status = 'cancelled';
          }
          
          // Recarregar lista de ingressos
          await this.fetchIngressos();
          
          Swal.fire({
            icon: 'success',
            title: 'Cancelado',
            text: isAguardando ? 'Pedido cancelado e removido com sucesso.' : 'Ingresso cancelado com sucesso.',
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Erro ao cancelar:', error);
          const errorMessage = error.response?.data?.error || 'Não foi possível cancelar. Tente novamente.';
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: errorMessage
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.qr-overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:1050;
}
.qr-card img{ max-width:240px; height:auto }
.qr-card{ max-width:420px; width:90% }
.text-monospace{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace }
</style>
