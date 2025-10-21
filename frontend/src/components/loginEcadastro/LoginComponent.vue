<template>
    <div>
        <!-- Login Form -->
        <div class="p-4 p-lg-5">
            <h3 class="h4 mb-4 text-center">Acesse sua conta</h3>
            <!-- Social Login Buttons -->
            <div class="d-grid gap-2 mb-4">
                <button class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
                    <i class="bi bi-google"></i> Entrar com Google
                </button>
                <button class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
                    <i class="bi bi-facebook"></i> Entrar com Facebook
                </button>
            </div>

            <div class="position-relative my-4">
                <hr>
                <div class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">ou</div>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="submit">
                <div class="mb-3">
                    <label for="loginEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="loginEmail" v-model="email"
                        required>
                    <!-- <div class="invalid-feedback">{{ loginErrors.email }}</div> -->
                </div>
                <div class="mb-3">
                    <div class="d-flex justify-content-between">
                        <label for="loginPassword" class="form-label">Senha</label>
                        <a href="#" class="text-decoration-none small"
                            @click.prevent="showForgotPassword = true">Esqueceu a senha?</a>
                    </div>
                    <div class="input-group">
                        <input :type="showLoginPassword ? 'text' : 'password'" class="form-control" id="loginPassword"
                            v-model="senha" required>
                        <button class="btn btn-outline-secondary" type="button"
                            @click="showLoginPassword = !showLoginPassword">
                            <i class="bi" :class="showLoginPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                        </button>
                        <!-- <div class="invalid-feedback">{{ loginErrors.password }}</div> -->
                    </div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="rememberMe">
                    <label class="form-check-label" for="rememberMe">Lembrar de mim</label>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary" :disabled="loginLoading">
                        <span v-if="loginLoading" class="spinner-border spinner-border-sm me-2" role="status"
                            aria-hidden="true"></span>
                        {{ loginLoading ? 'Entrando...' : 'Entrar' }}
                    </button>
                </div>
            </form>

            <div class="mt-4 text-center">
                <p class="mb-0 text-muted">
                    Não tem uma conta?
                    <a href="#" class="text-decoration-none" @click.prevent="activeTab = 'register'">Cadastre-se</a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>

import Swal from 'sweetalert2';

export default {
    name: 'LoginComponent',
    data() {
        return {
            loginLoading: false,
            email: '',
            senha: ''    
        }
    },
    methods: {
        async submit() {
            this.loginLoading = true;

            const payload = { 
                email: this.email,
                senha: this.senha
            }; 
            
            try {
                const res = await loginUsuario(payload);
                
                const token = res.token;  
                if (token) {
                    localStorage.setItem('token', token); // Salva o token no localStorage
                    Swal.fire({
                        icon: 'success',
                        title: 'Login realizado!',
                        text: 'Entrando...',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        this.$router.push('/'); // Redireciona após login
                    });
                } else {
                    throw new Error('Token não recebido na resposta.');
                }
            }catch(error){
                console.error('Erro na requisição:', error);
                
                if (error.response?.status === 401) {
                    error.message = 'Credenciais inválidas. Verifique seu email ou senha.';
                }
                
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no login',
                    text: error.message || 'Ocorreu um erro ao tentar fazer login. Tente novamente.',
                    confirmButtonColor: '#dc3545'
                });
            } finally {
                this.loginLoading = false; 
            }
        },
    }
}
</script>
<style lang="">

</style>