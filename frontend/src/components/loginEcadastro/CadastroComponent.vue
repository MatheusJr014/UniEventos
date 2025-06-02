<template>
  <div class="p-4 p-lg-4">

    <!-- Register Form -->
    <div v-if="activeTab === 'register'">
      <h3 class="h4 mb-4 text-center">Crie sua conta</h3>

      <!-- Social Register Buttons -->
      <div class="d-grid gap-2 mb-4">
        <button class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
          <i class="bi bi-google"></i> Cadastrar com Google
        </button>
        <button class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
          <i class="bi bi-facebook"></i> Cadastrar com Facebook
        </button>
      </div>

      <div class="position-relative my-4">
        <hr>
        <div class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">ou</div>
      </div>

      <!-- Register Form -->
      <form @submit.prevent="register">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="registerFirstName" class="form-label">Nome</label>
            <input type="text" class="form-control" id="registerFirstName" v-model="registerForm.firstName"
              :class="{ 'is-invalid': registerErrors.firstName }" required>
            <div class="invalid-feedback">{{ registerErrors.firstName }}</div>
          </div>
          <div class="col-md-6">
            <label for="registerLastName" class="form-label">Sobrenome</label>
            <input type="text" class="form-control" id="registerLastName" v-model="registerForm.lastName"
              :class="{ 'is-invalid': registerErrors.lastName }" required>
            <div class="invalid-feedback">{{ registerErrors.lastName }}</div>
          </div>
          <div class="col-12">
            <label for="registerEmail" class="form-label">Email</label>
            <input type="email" class="form-control" id="registerEmail" v-model="registerForm.email"
              :class="{ 'is-invalid': registerErrors.email }" required>
            <div class="invalid-feedback">{{ registerErrors.email }}</div>
          </div>
          <div class="col-md-6">
            <label for="registerPassword" class="form-label">Senha</label>
            <div class="input-group">
              <input :type="showRegisterPassword ? 'text' : 'password'" class="form-control" id="registerPassword"
                v-model="registerForm.password" :class="{ 'is-invalid': registerErrors.password }" required>
              <button class="btn btn-outline-secondary" type="button"
                @click="showRegisterPassword = !showRegisterPassword">
                <i class="bi" :class="showRegisterPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
              <div class="invalid-feedback">{{ registerErrors.password }}</div>
            </div>
            <div class="form-text">
              A senha deve ter pelo menos 8 caracteres, incluindo letras e números.
            </div>
          </div>
          <div class="col-md-6">
            <label for="registerConfirmPassword" class="form-label">Confirmar Senha</label>
            <div class="input-group">
              <input :type="showRegisterConfirmPassword ? 'text' : 'password'" class="form-control"
                id="registerConfirmPassword" v-model="registerForm.confirmPassword"
                :class="{ 'is-invalid': registerErrors.confirmPassword }" required>
              <button class="btn btn-outline-secondary" type="button"
                @click="showRegisterConfirmPassword = !showRegisterConfirmPassword">
                <i class="bi" :class="showRegisterConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
              <div class="invalid-feedback">{{ registerErrors.confirmPassword }}</div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="termsCheck" v-model="registerForm.agreeTerms"
                :class="{ 'is-invalid': registerErrors.agreeTerms }" required>
              <label class="form-check-label" for="termsCheck">
                Concordo com os <a href="#" class="text-decoration-none">Termos de Serviço</a> e <a href="#"
                  class="text-decoration-none">Política de Privacidade</a>
              </label>
              <div class="invalid-feedback">{{ registerErrors.agreeTerms }}</div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="newsletterCheck" v-model="registerForm.newsletter">
              <label class="form-check-label" for="newsletterCheck">
                Desejo receber emails sobre eventos e promoções
              </label>
            </div>
          </div>
          <div class="col-12">
            <div class="d-grid">
              <button type="submit" class="btn btn-primary" :disabled="registerLoading">
                <span v-if="registerLoading" class="spinner-border spinner-border-sm me-2" role="status"
                  aria-hidden="true"></span>
                {{ registerLoading ? 'Cadastrando...' : 'Cadastrar' }}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div class="mt-4 text-center">
        <p class="mb-0 text-muted">
          Já tem uma conta?
          <a href="#" class="text-decoration-none" @click.prevent="activeTab = 'login'">Entrar</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CadastroComponent',
  data() {
    return {
      activeTab: 'register',
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        newsletter: true
      },
      registerErrors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: ''
      },
    };
  },
  methods: {
    register() {
      // Reset errors
      this.registerErrors = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: ''
      };

      // Validate form
      let isValid = true;

      if (!this.registerForm.firstName) {
        this.registerErrors.firstName = 'O nome é obrigatório';
        isValid = false;
      }

      if (!this.registerForm.lastName) {
        this.registerErrors.lastName = 'O sobrenome é obrigatório';
        isValid = false;
      }

      if (!this.registerForm.email) {
        this.registerErrors.email = 'O email é obrigatório';
        isValid = false;
      } else if (!this.validateEmail(this.registerForm.email)) {
        this.registerErrors.email = 'Por favor, insira um email válido';
        isValid = false;
      }

      if (!this.registerForm.password) {
        this.registerErrors.password = 'A senha é obrigatória';
        isValid = false;
      } else if (this.registerForm.password.length < 8) {
        this.registerErrors.password = 'A senha deve ter pelo menos 8 caracteres';
        isValid = false;
      } else if (!this.validatePassword(this.registerForm.password)) {
        this.registerErrors.password = 'A senha deve conter letras e números';
        isValid = false;
      }

      if (!this.registerForm.confirmPassword) {
        this.registerErrors.confirmPassword = 'Por favor, confirme sua senha';
        isValid = false;
      } else if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.registerErrors.confirmPassword = 'As senhas não coincidem';
        isValid = false;
      }

      if (!this.registerForm.agreeTerms) {
        this.registerErrors.agreeTerms = 'Você deve concordar com os termos de serviço';
        isValid = false;
      }

      if (!isValid) return;

      // Submit form
      this.registerLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.registerLoading = false;

        // Show success message
        this.successModalTitle = 'Cadastro realizado com sucesso';
        this.successModalMessage = 'Enviamos um email de confirmação para ' + this.registerForm.email;
        this.showSuccessModal = true;

        // Switch to login tab after 2 seconds
        setTimeout(() => {
          this.activeTab = 'login';
        }, 2000);
      }, 1500);
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    validatePassword(password) {
      // Password must contain at least one letter and one number
      return /[A-Za-z]/.test(password) && /[0-9]/.test(password);
    }
  }
}
</script>
<style lang="">

</style>