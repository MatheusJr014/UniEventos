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
                                            <div>{{ userData.createdAt }}</div>
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
                                                        v-model="userData.phone" :disabled="!editMode">
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
                                                    v-model="userData.birthdate" :disabled="!editMode">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="gender" class="form-label">Gênero</label>
                                                <select class="form-select" id="gender" v-model="userData.gender"
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
                                                    v-model="userData.address" :disabled="!editMode">
                                            </div>
                                            <div class="col-md-4">
                                                <label for="city" class="form-label">Cidade</label>
                                                <input type="text" class="form-control" id="city" v-model="userData.city"
                                                    :disabled="!editMode">
                                            </div>
                                            <div class="col-md-4">
                                                <label for="state" class="form-label">Estado</label>
                                                <select class="form-select" id="state" v-model="userData.state"
                                                    :disabled="!editMode">
                                                    <option value="">Selecione</option>
                                                    <option v-for="state in states" :key="state.value"
                                                        :value="state.value">{{ state.label }}</option>
                                                </select>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="zipcode" class="form-label">CEP</label>
                                                <input type="text" class="form-control" id="zipcode"
                                                    v-model="userData.zipcode" :disabled="!editMode">
                                            </div>
                                            <div class="col-12" v-if="editMode">
                                                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                                            </div>
                                        </div>
                                    </form>
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
import { getUsuarioById } from '@/services/api';
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
            tabs: [
                { id: 'personal', nome: 'Informações Pessoais', icon: 'bi-person' },
                { id: 'tickets', nome: 'Meus Ingressos', icon: 'bi-ticket-perforated' },
                { id: 'history', nome: 'Histórico de Eventos', icon: 'bi-clock-history' },
                { id: 'favorites', nome: 'Favoritos', icon: 'bi-heart' },
                { id: 'preferences', nome: 'Preferências', icon: 'bi-gear' },
                { id: 'security', nome: 'Segurança', icon: 'bi-shield-lock' }
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
    methods: {
        saveProfile() {
            // Implementar lógica para salvar o perfil
            alert('Perfil salvo com sucesso!');
            this.editMode = false;
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

                this.userData = await getUsuarioById(usuarioId, token);
                
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