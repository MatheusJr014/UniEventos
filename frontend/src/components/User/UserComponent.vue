<template>
    <div v-if="userData">
        <main>
            <!-- Profile Header -->
            <section class="bg-primary text-white py-5">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-3 text-center text-md-start mb-4 mb-md-0">
                            <div class="position-relative d-inline-block">
                                <img src="../../assets/logo.svg" alt="User Avatar" class="rounded-circle img-thumbnail"
                                    width="180" height="180">
                                <button class="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle p-2"
                                    title="Alterar foto">
                                    <i class="bi bi-camera"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-9 text-center text-md-start">
                            <div
                                class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-3">
                                <div>
                                    <h1 class="h2 mb-1">{{ userData.nome }}</h1>
                                    <p class="mb-2">{{ userData.email }}</p>
                                    <span class="badge bg-light text-primary"></span>
                                </div>
                                <div class="mt-3 mt-md-0">
                                    <button class="btn btn-light" @click="editMode = !editMode">
                                        <i class="bi" :class="editMode ? 'bi-x-lg' : 'bi-pencil'"></i>
                                        {{ editMode ? 'Cancelar Edição' : 'Editar Perfil' }}
                                    </button>
                                </div>
                            </div>
                            <div class="row g-3 mt-2">
                                <div class="col-md-4">
                                    <div class="d-flex align-items-center">
                                        <div class="rounded-circle bg-white bg-opacity-25 p-2 me-2">
                                            <i class="bi bi-calendar-check text-white"></i>
                                        </div>
                                        <div>
                                            <div class="small text-white-50">Membro desde</div>
                                            <div>{{ formatDate(userData.createdAt) }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="d-flex align-items-center">
                                        <div class="rounded-circle bg-white bg-opacity-25 p-2 me-2">
                                            <i class="bi bi-ticket-perforated text-white"></i>
                                        </div>
                                        <div>
                                            <div class="small text-white-50">Eventos participados</div>
                                            <div>{{ userData.eventsAttended }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="d-flex align-items-center">
                                        <div class="rounded-circle bg-white bg-opacity-25 p-2 me-2">
                                            <i class="bi bi-heart text-white"></i>
                                        </div>
                                        <div>
                                            <div class="small text-white-50">Eventos favoritos</div>
                                            <div>{{ userData.favoriteEvents }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Profile Content -->
            <section class="py-5">
                <div class="container">
                    <div class="row g-4">
                        <!-- Sidebar -->
                        <div class="col-lg-3">
                            <div class="card border-0 shadow-sm mb-4">
                                <div class="card-body p-0">
                                    <div class="list-group list-group-flush">
                                        <a href="#" v-for="(tab, index) in tabs" :key="index"
                                            class="list-group-item list-group-item-action d-flex align-items-center"
                                            :class="{ active: activeTab === tab.id }"
                                            @click.prevent="activeTab = tab.id">
                                            <i :class="`bi ${tab.icon} me-2`"></i>
                                            {{ tab.nome }}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="card border-0 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">Verificação de Conta</h5>
                                    <p class="card-text small text-muted">Complete seu perfil para melhorar suas
                                        recomendações e experiência na plataforma.</p>
                                    <div v-if="userData.profileCompletion < 100">
                                        <div class="d-flex align-items-center text-muted mb-2 small">
                                            <i class="bi bi-check-circle-fill text-success me-2"></i>
                                            <span>Informações básicas</span>
                                        </div>
                                        <div class="d-flex align-items-center text-muted mb-2 small">
                                            <i class="bi"
                                                :class="userData.emailVerified ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'"></i>
                                            <span>Verificar e-mail</span>
                                        </div>
                                        <div class="d-flex align-items-center text-muted mb-2 small">
                                            <i class="bi"
                                                :class="userData.phoneVerified ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'"></i>
                                            <span>Adicionar telefone</span>
                                        </div>
                                        <div class="d-flex align-items-center text-muted small">
                                            <i class="bi"
                                                :class="userData.preferencesSet ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'"></i>
                                            <span>Definir preferências</span>
                                        </div>
                                    </div>
                                    <div v-else class="text-center">
                                        <i class="bi bi-shield-check text-success fs-1"></i>
                                        <p class="small text-muted mt-2 mb-0">Seu perfil está completo!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Main Content -->
                        <div class="col-lg-9">
                            <!-- Personal Information -->
                            <div v-if="activeTab === 'personal'" class="card border-0 shadow-sm mb-4">
                                <div class="card-header bg-white">
                                    <h5 class="card-title mb-0">Informações Pessoais</h5>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="saveProfile">
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label for="nome" class="form-label">Nome Completo</label>
                                                <input type="text" class="form-control" id="name"
                                                    v-model="userData.nome" :disabled="!editMode">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="email" class="form-label">Email</label>
                                                <div class="input-group">
                                                    <input type="email" class="form-control" id="email"
                                                        v-model="userData.email" :disabled="!editMode">
                                                    <span v-if="userData.emailVerified"
                                                        class="input-group-text bg-success text-white"
                                                        title="Email verificado">
                                                        <i class="bi bi-check-circle-fill"></i>
                                                    </span>
                                                    <span v-else class="input-group-text bg-warning text-white"
                                                        title="Email não verificado">
                                                        <i class="bi bi-exclamation-circle-fill"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="phone" class="form-label">Telefone</label>
                                                <div class="input-group">
                                                    <input type="tel" class="form-control" id="phone"
                                                        v-model="userData.telefone" :disabled="!editMode"
                                                        placeholder="(00) 00000-0000">
                                                    <span v-if="userData.phoneVerified"
                                                        class="input-group-text bg-success text-white"
                                                        title="Telefone verificado">
                                                        <i class="bi bi-check-circle-fill"></i>
                                                    </span>
                                                    <span v-else class="input-group-text bg-warning text-white"
                                                        title="Telefone não verificado">
                                                        <i class="bi bi-exclamation-circle-fill"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="birthdate" class="form-label">Data de Nascimento</label>
                                                <input type="date" class="form-control" id="birthdate"
                                                    v-model="userData.datanascimento" :disabled="!editMode">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="gender" class="form-label">Gênero</label>
                                                <select class="form-select" id="gender" v-model="userData.genero"
                                                    :disabled="!editMode">
                                                    <option value="">Selecione</option>
                                                    <option value="male">Masculino</option>
                                                    <option value="female">Feminino</option>
                                                    <option value="other">Outro</option>
                                                    <option value="prefer_not_to_say">Prefiro não informar</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="cpf" class="form-label">CPF</label>
                                                <input type="text" class="form-control" id="cpf" v-model="userData.cpf"
                                                    :disabled="!editMode">
                                            </div>
                                            <div class="col-12">
                                                <label for="address" class="form-label">Endereço</label>
                                                <input type="text" class="form-control" id="address"
                                                    v-model="userData.endereco" :disabled="!editMode"
                                                    placeholder="Rua, número, complemento">
                                            </div>
                                            <div class="col-md-4">
                                                <label for="city" class="form-label">Cidade</label>
                                                <input type="text" class="form-control" id="city" v-model="userData.cidade"
                                                    :disabled="!editMode">
                                            </div>
                                            <div class="col-md-4">
                                                <label for="state" class="form-label">Estado</label>
                                                <select class="form-select" id="state" v-model="userData.estado"
                                                    :disabled="!editMode">
                                                    <option value="">Selecione</option>
                                                    <option v-for="state in states" :key="state.value"
                                                        :value="state.value">{{ state.label }}</option>
                                                </select>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="zipcode" class="form-label">CEP</label>
                                                <input type="text" class="form-control" id="zipcode"
                                                    v-model="userData.cep" :disabled="!editMode"
                                                    placeholder="00000-000">
                                            </div>
                                            <div class="col-12" v-if="editMode">
                                                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                            <!-- Histórico de Eventos -->
                            <div v-if="activeTab === 'history'" class="card border-0 shadow-sm mb-4">
                                <div class="card-header bg-white">
                                    <h5 class="card-title mb-0">Histórico de Eventos</h5>
                                </div>
                                <div class="card-body">
                                    <div v-if="loadingHistorico" class="text-center py-5">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Carregando...</span>
                                        </div>
                                        <p class="mt-3 text-muted">Carregando histórico de eventos...</p>
                                    </div>
                                    <div v-else-if="historicoEventos.length === 0" class="text-center py-5">
                                        <i class="bi bi-calendar-x text-muted" style="font-size: 3rem;"></i>
                                        <p class="mt-3 text-muted">Você ainda não participou de nenhum evento.</p>
                                        <router-link to="/eventos/lista" class="btn btn-primary mt-3">
                                            <i class="bi bi-search me-2"></i>Explorar Eventos
                                        </router-link>
                                    </div>
                                    <div v-else class="row g-4">
                                        <div v-for="item in historicoEventos" :key="item.pedidoId" class="col-md-6 col-lg-4">
                                            <div class="card border-0 shadow-sm h-100 hover-card">
                                                <div class="position-relative">
                                                    <img 
                                                        :src="item.evento?.imagemevento || 'https://placehold.co/400x250'" 
                                                        :alt="item.evento?.nomeevento || 'Evento'"
                                                        class="card-img-top"
                                                        style="height: 200px; object-fit: cover;"
                                                    >
                                                    <span class="badge bg-success position-absolute top-0 end-0 m-2">
                                                        Confirmado
                                                    </span>
                                                </div>
                                                <div class="card-body d-flex flex-column">
                                                    <h6 class="card-title fw-bold">{{ item.evento?.nomeevento || 'Evento' }}</h6>
                                                    <p class="card-text text-muted small flex-grow-1">
                                                        {{ item.evento?.descricao ? (item.evento.descricao.substring(0, 100) + '...') : 'Sem descrição' }}
                                                    </p>
                                                    <div class="mb-3">
                                                        <div class="d-flex align-items-center mb-2">
                                                            <i class="bi bi-calendar-event text-primary me-2"></i>
                                                            <small class="text-muted">
                                                                {{ formatDate(item.evento?.datainicio) }}
                                                            </small>
                                                        </div>
                                                        <div class="d-flex align-items-center mb-2">
                                                            <i class="bi bi-geo-alt text-primary me-2"></i>
                                                            <small class="text-muted">
                                                                {{ item.evento?.local || 'Local não informado' }}
                                                            </small>
                                                        </div>
                                                        <div class="d-flex align-items-center mb-2">
                                                            <i class="bi bi-ticket-perforated text-primary me-2"></i>
                                                            <small class="text-muted">
                                                                {{ item.ingresso?.tipoingresso || 'Ingresso' }} - 
                                                                {{ item.quantidade }}x
                                                            </small>
                                                        </div>
                                                        <div class="d-flex align-items-center">
                                                            <i class="bi bi-currency-dollar text-primary me-2"></i>
                                                            <small class="text-muted">
                                                                Total: {{ formatCurrency(item.valorTotal) }}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex gap-2">
                                                        <router-link 
                                                            :to="{ name: 'evento-detalhes', params: { id: item.evento?.id } }"
                                                            class="btn btn-sm btn-primary flex-grow-1"
                                                        >
                                                            <i class="bi bi-eye me-1"></i>Ver Detalhes
                                                        </router-link>
                                                    </div>
                                                </div>
                                                <div class="card-footer bg-white border-top">
                                                    <small class="text-muted">
                                                        <i class="bi bi-clock me-1"></i>
                                                        Comprado em {{ formatDate(item.dataCompra) }}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Favoritos -->
                            <div v-if="activeTab === 'favorites'" class="card border-0 shadow-sm mb-4">
                                <div class="card-header bg-white">
                                    <h5 class="card-title mb-0">Eventos Favoritos</h5>
                                </div>
                                <div class="card-body">
                                    <div class="text-center py-5">
                                        <i class="bi bi-heart text-muted" style="font-size: 4rem;"></i>
                                        <h5 class="mt-4 mb-3">Funcionalidade em Desenvolvimento</h5>
                                        <p class="text-muted mb-4">
                                            Em breve você poderá salvar seus eventos favoritos para acessá-los rapidamente.
                                        </p>
                                        <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                                            <router-link to="/eventos/lista" class="btn btn-primary">
                                                <i class="bi bi-search me-2"></i>Explorar Eventos
                                            </router-link>
                                            <button class="btn btn-outline-secondary" disabled>
                                                <i class="bi bi-bell me-2"></i>Notificar quando disponível
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Preferências -->
                            <div v-if="activeTab === 'preferences'" class="card border-0 shadow-sm mb-4">
                                <div class="card-header bg-white">
                                    <h5 class="card-title mb-0">Preferências</h5>
                                </div>
                                <div class="card-body">
                                    <div class="text-center py-5">
                                        <i class="bi bi-gear text-muted" style="font-size: 4rem;"></i>
                                        <h5 class="mt-4 mb-3">Funcionalidade em Desenvolvimento</h5>
                                        <p class="text-muted mb-4">
                                            Em breve você poderá personalizar suas preferências de notificações, idioma e outras configurações da plataforma.
                                        </p>
                                        <div class="row g-3 justify-content-center">
                                            <div class="col-md-4">
                                                <div class="card border-0 bg-light h-100">
                                                    <div class="card-body text-center">
                                                        <i class="bi bi-bell text-primary fs-3 mb-2"></i>
                                                        <h6 class="card-title">Notificações</h6>
                                                        <p class="card-text small text-muted">Configure alertas e notificações</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="card border-0 bg-light h-100">
                                                    <div class="card-body text-center">
                                                        <i class="bi bi-translate text-primary fs-3 mb-2"></i>
                                                        <h6 class="card-title">Idioma</h6>
                                                        <p class="card-text small text-muted">Escolha seu idioma preferido</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="card border-0 bg-light h-100">
                                                    <div class="card-body text-center">
                                                        <i class="bi bi-palette text-primary fs-3 mb-2"></i>
                                                        <h6 class="card-title">Tema</h6>
                                                        <p class="card-text small text-muted">Personalize a aparência</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Segurança -->
                            <div v-if="activeTab === 'security'" class="card border-0 shadow-sm mb-4">
                                <div class="card-header bg-white">
                                    <h5 class="card-title mb-0">Segurança</h5>
                                </div>
                                <div class="card-body">
                                    <div class="text-center py-5">
                                        <i class="bi bi-shield-lock text-muted" style="font-size: 4rem;"></i>
                                        <h5 class="mt-4 mb-3">Funcionalidade em Desenvolvimento</h5>
                                        <p class="text-muted mb-4">
                                            Em breve você poderá gerenciar a segurança da sua conta, incluindo alteração de senha, autenticação de dois fatores e sessões ativas.
                                        </p>
                                        <div class="row g-3 justify-content-center">
                                            <div class="col-md-6">
                                                <div class="card border-0 bg-light h-100">
                                                    <div class="card-body text-center">
                                                        <i class="bi bi-key text-primary fs-3 mb-2"></i>
                                                        <h6 class="card-title">Alterar Senha</h6>
                                                        <p class="card-text small text-muted">Atualize sua senha regularmente</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="card border-0 bg-light h-100">
                                                    <div class="card-body text-center">
                                                        <i class="bi bi-shield-check text-primary fs-3 mb-2"></i>
                                                        <h6 class="card-title">Autenticação de Dois Fatores</h6>
                                                        <p class="card-text small text-muted">Adicione uma camada extra de segurança</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    <div v-else>
        <p>Carregando dados do usuário...</p>
    </div>
</template>

<script>
import { getUsuarioById, atualizarUsuario, getIngressosUsuario } from '@/services/api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';


export default {
    name: 'PerfilUsuario',
    data() {
        return {
            editMode: false,
            userData: null,
            activeTab: 'personal',
            historicoEventos: [],
            loadingHistorico: false,
            tabs: [
                { id: 'personal', nome: 'Informações Pessoais', icon: 'bi-person' },
                // { id: 'tickets', nome: 'Meus Ingressos', icon: 'bi-ticket-perforated' },
                { id: 'history', nome: 'Histórico de Eventos', icon: 'bi-clock-history' },
                { id: 'favorites', nome: 'Favoritos', icon: 'bi-heart' },
                { id: 'preferences', nome: 'Preferências', icon: 'bi-gear' },
                { id: 'security', nome: 'Segurança', icon: 'bi-shield-lock' }
            ],
            states: [
                { value: 'AC', label: 'Acre' },
                { value: 'AL', label: 'Alagoas' },
                { value: 'AP', label: 'Amapá' },
                { value: 'AM', label: 'Amazonas' },
                { value: 'BA', label: 'Bahia' },
                { value: 'CE', label: 'Ceará' },
                { value: 'DF', label: 'Distrito Federal' },
                { value: 'ES', label: 'Espírito Santo' },
                { value: 'GO', label: 'Goiás' },
                { value: 'MA', label: 'Maranhão' },
                { value: 'MT', label: 'Mato Grosso' },
                { value: 'MS', label: 'Mato Grosso do Sul' },
                { value: 'MG', label: 'Minas Gerais' },
                { value: 'PA', label: 'Pará' },
                { value: 'PB', label: 'Paraíba' },
                { value: 'PR', label: 'Paraná' },
                { value: 'PE', label: 'Pernambuco' },
                { value: 'PI', label: 'Piauí' },
                { value: 'RJ', label: 'Rio de Janeiro' },
                { value: 'RN', label: 'Rio Grande do Norte' },
                { value: 'RS', label: 'Rio Grande do Sul' },
                { value: 'RO', label: 'Rondônia' },
                { value: 'RR', label: 'Roraima' },
                { value: 'SC', label: 'Santa Catarina' },
                { value: 'SP', label: 'São Paulo' },
                { value: 'SE', label: 'Sergipe' },
                { value: 'TO', label: 'Tocantins' }
            ]
            // user: {
            //     id: 1,
            //     name: 'Maria Silva',
            //     email: 'maria.silva@email.com',
            //     phone: '(11) 98765-4321',
            //     avatar: 'https://placehold.co/200x200',
            //     type: 'Cliente',
            //     memberSince: '15/05/2023',
            //     eventsAttended: 8,
            //     favoriteEvents: 12,
            //     birthdate: '1990-05-15',
            //     gender: 'female',
            //     cpf: '123.456.789-00',
            //     address: 'Rua das Flores, 123',
            //     city: 'São Paulo',
            //     state: 'SP',
            //     zipcode: '01234-567',
            //     profileCompletion: 85,
            //     emailVerified: true,
            //     phoneVerified: false,
            //     preferencesSet: true
            // },
        };
    },
    mounted() {
        this.fetchUserData();
    },
    watch: {
        activeTab(newTab) {
            if (newTab === 'history') {
                this.fetchHistoricoEventos();
            }
        }
    },
    methods: {
        async saveProfile() {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Você precisa estar logado para salvar o perfil.',
                    confirmButtonColor: '#dc3545'
                });
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const usuarioId = decodedToken.id;

                if (!usuarioId) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'ID do usuário não encontrado.',
                        confirmButtonColor: '#dc3545'
                    });
                    return;
                }

                // Preparar dados para envio
                const dadosAtualizacao = {
                    nome: this.userData.nome,
                    sobrenome: this.userData.sobrenome || '',
                    email: this.userData.email,
                    cpf: this.userData.cpf,
                    telefone: this.userData.telefone || null,
                    datanascimento: this.userData.datanascimento || null,
                    genero: this.userData.genero || null,
                    cidade: this.userData.cidade || null,
                    estado: this.userData.estado || null,
                    cep: this.userData.cep || null,
                    endereco: this.userData.endereco || null
                };

                // Atualizar no backend
                await atualizarUsuario(usuarioId, dadosAtualizacao, token);

                // Atualizar dados locais
                const dadosAtualizados = await getUsuarioById(usuarioId, token);
                
                // Mapear campos do backend para o formato esperado no frontend
                this.userData = {
                    ...dadosAtualizados,
                    telefone: dadosAtualizados.telefone || '',
                    datanascimento: dadosAtualizados.datanascimento || '',
                    genero: dadosAtualizados.genero || '',
                    cidade: dadosAtualizados.cidade || '',
                    estado: dadosAtualizados.estado || '',
                    cep: dadosAtualizados.cep || '',
                    endereco: dadosAtualizados.endereco || '',
                    // Campos para compatibilidade com o template
                    phone: dadosAtualizados.telefone || '',
                    birthdate: dadosAtualizados.datanascimento || '',
                    gender: dadosAtualizados.genero || '',
                    city: dadosAtualizados.cidade || '',
                    state: dadosAtualizados.estado || '',
                    zipcode: dadosAtualizados.cep || '',
                    address: dadosAtualizados.endereco || '',
                    // Preservar campos fictícios do template
                    eventsAttended: this.userData?.eventsAttended || 0,
                    favoriteEvents: this.userData?.favoriteEvents || 0,
                    profileCompletion: this.userData?.profileCompletion || 0,
                    emailVerified: this.userData?.emailVerified || false,
                    phoneVerified: this.userData?.phoneVerified || false,
                    preferencesSet: this.userData?.preferencesSet || false
                };

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Perfil atualizado com sucesso!',
                    timer: 2000,
                    showConfirmButton: false
                });

                this.editMode = false;
            } catch (error) {
                console.error('Erro ao salvar perfil:', error);
                let mensagemErro = 'Erro ao salvar perfil. Tente novamente.';

                if (error.response?.status === 401) {
                    mensagemErro = 'Sessão expirada. Faça login novamente.';
                    localStorage.removeItem('token');
                    this.$router.push('/auth/login');
                    return;
                } else if (error.response?.data?.error) {
                    mensagemErro = error.response.data.error;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao salvar',
                    text: mensagemErro,
                    confirmButtonColor: '#dc3545'
                });
            }
        },
        async fetchUserData() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado!');
                alert('Usuario não encontrado');
                return;
            }
            
            try {
                const decodedToken = jwtDecode(token);
                const usuarioId = decodedToken.id;
                
                if (!usuarioId) {
                    console.error('ID do usuário não encontrado!');
                    return;
                }

                const dadosUsuario = await getUsuarioById(usuarioId, token);
                
                // Mapear campos do backend para o formato esperado no frontend
                this.userData = {
                    ...dadosUsuario,
                    telefone: dadosUsuario.telefone || '',
                    datanascimento: dadosUsuario.datanascimento || '',
                    genero: dadosUsuario.genero || '',
                    cidade: dadosUsuario.cidade || '',
                    estado: dadosUsuario.estado || '',
                    cep: dadosUsuario.cep || '',
                    endereco: dadosUsuario.endereco || '',
                    // Campos para compatibilidade com o template
                    phone: dadosUsuario.telefone || '',
                    birthdate: dadosUsuario.datanascimento || '',
                    gender: dadosUsuario.genero || '',
                    city: dadosUsuario.cidade || '',
                    state: dadosUsuario.estado || '',
                    zipcode: dadosUsuario.cep || '',
                    address: dadosUsuario.endereco || '',
                    // Campos fictícios para o template
                    eventsAttended: dadosUsuario.eventsAttended || 0,
                    favoriteEvents: dadosUsuario.favoriteEvents || 0,
                    profileCompletion: dadosUsuario.profileCompletion || 0,
                    emailVerified: dadosUsuario.emailVerified || false,
                    phoneVerified: dadosUsuario.phoneVerified || false,
                    preferencesSet: dadosUsuario.preferencesSet || false
                };
                
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário: ', error);
                let mensagemErro = 'Erro ao buscar os dados do usuário. Tente novamente mais tarde.';
                
                if (error.response && error.response.status === 401) {
                    mensagemErro = 'Sessão expirada ou inválida. Faça login novamente.';
                    localStorage.removeItem('token');
                    // Opcional: redirecionar para login
                    // this.$router.push('/login');
                }
                
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: mensagemErro,
                    confirmButtonColor: '#dc3545'
                });
            }
        },
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            } catch (error) {
                return dateString;
            }
        },
        formatCurrency(value) {
            if (!value && value !== 0) return 'R$ 0,00';
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        },
        async fetchHistoricoEventos() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado!');
                return;
            }

            this.loadingHistorico = true;
            try {
                const decodedToken = jwtDecode(token);
                const usuarioId = decodedToken.id;

                if (!usuarioId) {
                    console.error('ID do usuário não encontrado!');
                    return;
                }

                // Buscar ingressos do usuário (pedidos confirmados)
                const ingressos = await getIngressosUsuario(usuarioId, token);
                
                // Filtrar apenas pedidos confirmados e mapear para o formato de histórico
                this.historicoEventos = ingressos
                    .filter(item => item.statusPagamento === 'confirmado')
                    .map(item => ({
                        pedidoId: item.pedidoId || item.id,
                        evento: {
                            id: item.Evento?.id || item.evento?.id,
                            nomeevento: item.Evento?.nomeevento || item.evento?.nomeevento || item.eventoNome,
                            datainicio: item.Evento?.dataEvento || item.Evento?.dataHora || item.evento?.datainicio,
                            datafim: item.Evento?.datafim || item.evento?.datafim,
                            local: item.Evento?.local || item.evento?.local,
                            imagemevento: item.Evento?.imagem || item.Evento?.imagemevento || item.evento?.imagemevento,
                            descricao: item.Evento?.descricao || item.evento?.descricao
                        },
                        ingresso: {
                            tipoingresso: item.tipoIngresso || item.tipo || item.ingresso?.tipoingresso,
                            preco: item.preco || item.ingresso?.preco
                        },
                        quantidade: item.quantidade || 1,
                        valorTotal: item.valorTotal || 0,
                        dataCompra: item.dataCompra || item.createdAt
                    }))
                    .sort((a, b) => {
                        // Ordenar por data de compra (mais recente primeiro)
                        const dateA = new Date(a.dataCompra);
                        const dateB = new Date(b.dataCompra);
                        return dateB - dateA;
                    });

                // Atualizar contador de eventos participados
                if (this.userData) {
                    this.userData.eventsAttended = this.historicoEventos.length;
                }
            } catch (error) {
                console.error('Erro ao buscar histórico de eventos:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Não foi possível carregar o histórico de eventos.',
                    confirmButtonColor: '#dc3545'
                });
                this.historicoEventos = [];
            } finally {
                this.loadingHistorico = false;
            }
        }
    }
};
</script>

<style>
/* Importando Bootstrap e Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");

/* Estilos personalizados baseados nas cores da logo */
:root {
    --primary-color: #7749F8;
    /* Roxo da logo */
    --secondary-color: #FF9933;
    /* Laranja da logo */
    --primary-rgb: 119, 73, 248;
    --secondary-rgb: 255, 153, 51;
}

/* Cores primárias e secundárias */
.bg-primary {
    background-color: var(--primary-color) !important;
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

.bg-secondary {
    background-color: var(--secondary-color) !important;
}

.text-secondary {
    color: var(--secondary-color) !important;
}

.btn-secondary {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
}

.btn-secondary:hover {
    background-color: #e68a2e;
    border-color: #e68a2e;
}

.bg-primary.bg-opacity-10 {
    background-color: rgba(var(--primary-rgb), 0.1) !important;
}

.bg-secondary.bg-opacity-10 {
    background-color: rgba(var(--secondary-rgb), 0.1) !important;
}

/* Estilos específicos para a página de perfil */
.list-group-item.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.hover-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Estilos para o breadcrumb */
.breadcrumb-item a {
    color: var(--primary-color);
}

.breadcrumb-item.active {
    color: var(--secondary-color);
}

/* Estilos para o cabeçalho do perfil */
.img-thumbnail {
    border: 4px solid rgba(255, 255, 255, 0.3);
}

/* Estilos para os formulários */
.form-control:focus,
.form-select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.25);
}

.form-check-input:checked {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

/* Estilos para as abas */
.nav-tabs .nav-link.active {
    color: var(--primary-color);
    border-color: #dee2e6 #dee2e6 #fff;
}

.nav-tabs .nav-link:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
}
</style>