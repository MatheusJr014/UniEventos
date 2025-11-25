<template>
  <div class="min-vh-100 bg-light">
    <NavBarComponents />
    
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Header -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="fw-bold">Checkout de Planos</h2>
                <p class="text-muted">Finalize a assinatura do seu plano</p>
              </div>
              <button class="btn btn-outline-secondary" @click="$router.push('/organizadores')">
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
            <button class="btn btn-outline-danger" @click="$router.push('/organizadores')">
              Voltar para Planos
            </button>
          </div>

          <!-- Seleção de Plano -->
          <div v-else>
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Selecione seu Plano</h5>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div 
                    v-for="plano in planos" 
                    :key="plano.id"
                    class="col-md-4"
                  >
                    <div 
                      class="card h-100 cursor-pointer"
                      :class="{ 'border-primary border-2': planoSelecionado === plano.id }"
                      @click="selecionarPlano(plano.id)"
                      style="cursor: pointer; transition: all 0.3s;"
                    >
                      <div class="card-body text-center">
                        <h5 class="card-title">{{ plano.nome }}</h5>
                        <div class="mb-3">
                          <span class="display-6 fw-bold">R$ {{ plano.preco }}</span>
                          <span class="text-muted">/mês</span>
                        </div>
                        <div v-if="planoSelecionado === plano.id" class="mb-2">
                          <span class="badge bg-primary">Selecionado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Resumo do Pedido -->
            <div v-if="planoSelecionado" class="card border-0 shadow-sm mb-4">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Resumo do Pedido</h5>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h6 class="mb-1">{{ planoAtual.nome }}</h6>
                    <small class="text-muted">Assinatura mensal</small>
                  </div>
                  <div class="text-end">
                    <div class="fw-bold">R$ {{ planoAtual.preco.toFixed(2).replace('.', ',') }}</div>
                    <small class="text-muted">/mês</small>
                  </div>
                </div>
                <div class="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span class="text-primary">R$ {{ planoAtual.preco.toFixed(2).replace('.', ',') }}</span>
                </div>
              </div>
            </div>

            <!-- Botão de Pagamento -->
            <div v-if="planoSelecionado" class="text-center">
              <button 
                class="btn btn-primary btn-lg px-5"
                @click="processarPagamento"
                :disabled="processando"
              >
                <span v-if="processando" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="bi bi-credit-card me-2"></i>
                {{ processando ? 'Processando...' : 'Finalizar Pagamento' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterComponents />
  </div>
</template>

<script>
import NavBarComponents from '@/components/Publico/common/NavBarComponents.vue';
import FooterComponents from '@/components/Publico/common/FooterComponents.vue';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

export default {
  name: 'CheckoutPlanosView',
  components: {
    NavBarComponents,
    FooterComponents
  },
  data() {
    return {
      loading: true,
      error: null,
      processando: false,
      planoSelecionado: null,
      planos: [
        { id: 'basico', nome: 'Básico', preco: 0 },
        { id: 'profissional', nome: 'Profissional', preco: 99 },
        { id: 'empresarial', nome: 'Empresarial', preco: 299 }
      ]
    };
  },
  computed: {
    planoAtual() {
      return this.planos.find(p => p.id === this.planoSelecionado) || this.planos[0];
    }
  },
  mounted() {
    this.verificarAcesso();
    this.carregarPlanoInicial();
  },
  methods: {
    verificarAcesso() {
      const token = localStorage.getItem('token');
      
      if (!token) {
        Swal.fire({
          icon: 'warning',
          title: 'Login Necessário',
          text: 'Você precisa estar logado para assinar um plano.',
          confirmButtonText: 'Fazer Login',
          confirmButtonColor: '#7749f8'
        }).then(() => {
          this.$router.push('/auth/login');
        });
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.tipo !== true) {
          Swal.fire({
            icon: 'warning',
            title: 'Acesso Restrito',
            text: 'Você precisa ser um organizador para realizar a compra de planos.',
            confirmButtonText: 'Entendi',
            confirmButtonColor: '#7749f8'
          }).then(() => {
            this.$router.push('/organizadores');
          });
          return;
        }
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        this.error = 'Erro ao verificar autenticação';
        return;
      }

      this.loading = false;
    },
    carregarPlanoInicial() {
      // Verificar se há um plano na query string
      const planoQuery = this.$route.query.plano;
      if (planoQuery && this.planos.find(p => p.id === planoQuery)) {
        this.planoSelecionado = planoQuery;
      } else {
        // Selecionar o primeiro plano por padrão
        this.planoSelecionado = this.planos[0].id;
      }
    },
    selecionarPlano(planoId) {
      this.planoSelecionado = planoId;
    },
    async processarPagamento() {
      if (!this.planoSelecionado) {
        Swal.fire({
          icon: 'warning',
          title: 'Selecione um Plano',
          text: 'Por favor, selecione um plano antes de continuar.',
          confirmButtonColor: '#7749f8'
        });
        return;
      }

      this.processando = true;

      try {
        // Aqui você pode implementar a lógica de pagamento
        // Por enquanto, vamos apenas simular
        await new Promise(resolve => setTimeout(resolve, 1500));

        Swal.fire({
          icon: 'info',
          title: 'Em Desenvolvimento',
          text: 'A funcionalidade de pagamento de planos está em desenvolvimento. Em breve você poderá assinar planos diretamente pela plataforma.',
          confirmButtonText: 'Entendi',
          confirmButtonColor: '#7749f8'
        }).then(() => {
          this.$router.push('/organizadores');
        });
      } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível processar o pagamento. Tente novamente.',
          confirmButtonColor: '#dc3545'
        });
      } finally {
        this.processando = false;
      }
    }
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.border-primary {
  border-color: #7749f8 !important;
}
</style>

