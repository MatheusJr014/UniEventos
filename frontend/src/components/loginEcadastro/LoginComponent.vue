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
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="loginEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="loginEmail" v-model="loginForm.email"
                        :class="{ 'is-invalid': loginErrors.email }" required>
                    <div class="invalid-feedback">{{ loginErrors.email }}</div>
                </div>
                <div class="mb-3">
                    <div class="d-flex justify-content-between">
                        <label for="loginPassword" class="form-label">Senha</label>
                        <a href="#" class="text-decoration-none small"
                            @click.prevent="showForgotPassword = true">Esqueceu a senha?</a>
                    </div>
                    <div class="input-group">
                        <input :type="showLoginPassword ? 'text' : 'password'" class="form-control" id="loginPassword"
                            v-model="loginForm.password" :class="{ 'is-invalid': loginErrors.password }" required>
                        <button class="btn btn-outline-secondary" type="button"
                            @click="showLoginPassword = !showLoginPassword">
                            <i class="bi" :class="showLoginPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                        </button>
                        <div class="invalid-feedback">{{ loginErrors.password }}</div>
                    </div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="rememberMe" v-model="loginForm.rememberMe">
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
export default {
    name: 'LoginComponent',
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
                rememberMe: false
            },
            loginErrors: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        login() {
            // Reset errors
            this.loginErrors = {
                email: '',
                password: ''
            };

            // Validate form
            let isValid = true;

            if (!this.loginForm.email) {
                this.loginErrors.email = 'O email é obrigatório';
                isValid = false;
            } else if (!this.validateEmail(this.loginForm.email)) {
                this.loginErrors.email = 'Por favor, insira um email válido';
                isValid = false;
            }

            if (!this.loginForm.password) {
                this.loginErrors.password = 'A senha é obrigatória';
                isValid = false;
            }

            if (!isValid) return;

            // Submit form
            this.loginLoading = true;

            // Simulate API call
            setTimeout(() => {
                this.loginLoading = false;

                // Show success message
                this.successModalTitle = 'Login realizado com sucesso';
                this.successModalMessage = 'Você será redirecionado para a página inicial.';
                this.showSuccessModal = true;

                // Redirect to home page after 2 seconds
                setTimeout(() => {
                    // In a real app, this would redirect to the home page
                    console.log('Redirect to home page');
                }, 2000);
            }, 1500);
        },
    }
}
</script>
<style lang="">

</style>