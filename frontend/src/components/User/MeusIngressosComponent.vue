<template>
      <header class="sticky-top bg-white border-bottom">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light py-2">
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center" href="#">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoConecta-SNoUxrSWP8iTB6IvwaQcweuJEgUJxa.png"
              alt="Conecta Eventos Logo"
              height="40"
              class="me-2"
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">Eventos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Categorias</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Para Organizadores</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Sobre</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contato</a>
              </li>
            </ul>
            <div class="d-flex align-items-center">
              <div class="dropdown">
                <a
                  href="#"
                  class="d-flex align-items-center text-decoration-none dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://placehold.co/100x100"
                    alt="User Avatar"
                    class="rounded-circle me-2"
                    width="32"
                    height="32"
                  />
                  <span class="d-none d-sm-inline">{{ userName }}</span>
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <a class="dropdown-item active" href="#"
                      ><i class="bi bi-person me-2"></i>Meu Perfil</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><i class="bi bi-ticket-perforated me-2"></i>Meus
                      Ingressos</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><i class="bi bi-heart me-2"></i>Favoritos</a
                    >
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><i class="bi bi-box-arrow-right me-2"></i>Sair</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
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
            <p>Você ainda não tem ingressos ou nenhum ingresso corresponde aos filtros.</p>
          </div>

          <div class="row g-3">
            <div v-for="ingresso in filteredIngressos" :key="ingresso.id" class="col-md-6 col-lg-4">
              <div class="card h-100 shadow-sm">
                <img v-if="ingresso.Evento && ingresso.Evento.imagem" :src="ingresso.Evento.imagem" class="card-img-top" alt="Capa do evento" style="object-fit:cover; height:140px" />
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title mb-1">{{ ingresso.Evento?.titulo || ingresso.eventoNome || 'Evento' }}</h5>
                  <p class="small text-muted mb-2">{{ formatDate(ingresso.Evento?.dataHora || ingresso.dataEvento) }}</p>
                  <p class="mb-1"><strong>Tipo:</strong> {{ ingresso.tipo || ingresso.tipoIngresso || 'Padrão' }}</p>
                  <p class="mb-2"><strong>Código:</strong> <span class="text-monospace">{{ ingresso.codigo || ingresso.id }}</span></p>

                  <div class="mt-auto d-flex justify-content-between align-items-center">
                    <div>
                      <span class="badge" :class="statusClass(ingresso.status)">{{ labelStatus(ingresso.status) }}</span>
                    </div>
                    <div class="btn-group">
                      <button class="btn btn-sm btn-outline-primary" @click="openQrModal(ingresso)"><i class="bi bi-qr-code"></i> QR</button>
                      <a :href="qrUrlFor(ingresso)" :download="`ingresso-${ingresso.id || ingresso.codigo}.png`" class="btn btn-sm btn-outline-secondary">Baixar</a>
                      <button class="btn btn-sm btn-outline-danger" @click="requestCancel(ingresso)" v-if="canCancel(ingresso)">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QR Modal -->
    <div v-if="showQr" class="qr-overlay" @click.self="closeQrModal">
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

export default {
  name: 'MeusIngressos',
  data() {
    return {
      ingressos: [],
      filteredIngressos: [],
      loading: true,
      query: '',
      statusFilter: 'all',
      showQr: false,
      currentIngress: null
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
        const decoded = decodeJwt(token);
        userId = decoded?.id || decoded?.userId || decoded?.sub;
      } catch (err) {
        console.error('Erro ao decodificar token', err);
      }

      if (!userId) {
        this.loading = false;
        console.error('ID do usuário não encontrado no token');
        return;
      }

      try {
        const data = await getIngressosUsuario(userId, token);
        this.ingressos = Array.isArray(data) ? data : (data?.ingressos || data?.rows || []);
        this.filteredIngressos = this.ingressos.slice();
      } catch (error) {
        console.error('Erro ao buscar ingressos', error);
        Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível carregar seus ingressos. Tente novamente.' });
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
      return d.toLocaleString();
    },
    qrUrlFor(ingresso) {
      if (!ingresso) return '';
      const payload = encodeURIComponent(ingresso.codigo || ingresso.id || (ingresso.Evento?.id || 'ticket'));
      return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${payload}`;
    },
    openQrModal(ingresso) {
      this.currentIngress = ingresso;
      this.showQr = true;
    },
    closeQrModal() {
      this.showQr = false;
      this.currentIngress = null;
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
      const s = (ingresso.status || 'active').toLowerCase();
      return s === 'active';
    },
    requestCancel(ingresso) {
      Swal.fire({
        title: 'Cancelar ingresso?',
        text: 'Deseja realmente cancelar este ingresso? Essa ação pode ser irreversível.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, cancelar',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
          ingresso.status = 'cancelled';
          this.applyFilters();
          Swal.fire('Cancelado', 'Seu ingresso foi marcado como cancelado.', 'success');
        }
      });
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
