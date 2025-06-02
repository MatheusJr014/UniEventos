<template>
    <div>
        <main>
            <!-- Auth Section -->
            <section class="py-5">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-8">
                            <div class="card border-0 shadow-sm">
                                <div class="card-body p-0">
                                    <div class="row g-0">
                                        <!-- Left Side - Image (Desktop Only) -->
                                        <div class="col-lg-5 d-none d-lg-block">
                                            <div class="h-100 bg-primary position-relative" style="min-height: 500px;">
                                                <div
                                                    class="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
                                                    <img src="https://placehold.co/600x800" alt="Eventos"
                                                        class="img-cover">
                                                    <div
                                                        class="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-75">
                                                    </div>
                                                </div>
                                                <div
                                                    class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center text-white p-4">
                                                    <!-- ADICIONAR IMAGEM PELO CHAT GPT -->

                                                </div>
                                            </div>
                                        </div>

                                        <!-- Right Side - Forms -->
                                        <div class="col-lg-7">
                                            <div class="p-1">
                                                <!-- Tabs -->
                                                <ul class="nav nav-tabs nav-fill" id="authTabs" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link"
                                                            :class="{ active: activeTab === 'login' }"
                                                            @click="isLogin = true; activeTab = 'login'" type="button">
                                                            Entrar
                                                        </button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link"
                                                            :class="{ active: activeTab === 'register' }"
                                                            @click="isLogin = false; activeTab = 'register'"
                                                            type="button">
                                                            Cadastrar
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <LoginComponent v-if="isLogin"/>
                                                <CadastroComponent v-else />
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
</template>

<script>

import LoginComponent from '@/components/loginEcadastro/LoginComponent.vue';
import CadastroComponent from '@/components/loginEcadastro/CadastroComponent.vue';
export default {
    components: {
        LoginComponent,
        CadastroComponent
    },
    data() {
        return {
            isLogin: false,
            activeTab: 'register',
            showLoginPassword: false,
            showRegisterPassword: false,
            showRegisterConfirmPassword: false,
            loginLoading: false,
            registerLoading: false,
        };
    },
    methods: {

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

/* Estilos para o breadcrumb */
.breadcrumb-item a {
    color: var(--primary-color);
}

.breadcrumb-item.active {
    color: var(--secondary-color);
}

/* Estilos para as abas */
.nav-tabs .nav-link {
    color: #6c757d;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 0.75rem 1rem;
}

.nav-tabs .nav-link:hover {
    border-color: transparent;
    color: var(--primary-color);
}

.nav-tabs .nav-link.active {
    color: var(--primary-color);
    border-color: var(--primary-color);
    background-color: transparent;
}

/* Estilos para os inputs de formulário */
.form-control:focus,
.form-select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.25);
}

.form-check-input:checked {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

/* Estilos para a imagem de fundo */
.img-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Estilos para o modal */
.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
    border-bottom: 1px solid #e9ecef;
}

.modal-footer {
    border-top: 1px solid #e9ecef;
}
</style>