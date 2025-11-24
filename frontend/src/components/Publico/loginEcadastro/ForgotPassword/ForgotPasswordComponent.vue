<template>
  <div class="p-4 p-lg-5">
    <!-- Forgot Password Form -->
    <div v-if="!emailSent">
      <h3 class="h4 mb-4 text-center">Esqueceu sua senha?</h3>
      <p class="text-muted text-center mb-4">
        Digite seu email cadastrado e enviaremos instruções para redefinir sua senha.
      </p>

      <form @submit.prevent="sendResetEmail">
        <div class="mb-3">
          <label for="forgotEmail" class="form-label">Email</label>
          <input 
            type="email" 
            class="form-control" 
            id="forgotEmail" 
            v-model="email"
            :class="{ 'is-invalid': errors.email }"
            placeholder="Digite seu email"
            required
          >
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>

        <div class="d-grid mb-3">
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ loading ? 'Enviando...' : 'Enviar instruções' }}
          </button>
        </div>
      </form>

      <div class="text-center">
        <a href="#" class="text-decoration-none" @click.prevent="goBackToLogin">
          <i class="bi bi-arrow-left me-1"></i>
          Voltar para o login
        </a>
      </div>
    </div>

    <!-- Success Message -->
    <div v-else class="text-center">
      <div class="mb-4">
        <i class="bi bi-envelope-check text-primary" style="font-size: 4rem;"></i>
      </div>
      <h3 class="h4 mb-3">Email enviado!</h3>
      <p class="text-muted mb-4">
        Enviamos instruções para redefinir sua senha para <strong>{{ email }}</strong>.
        <br>
        Verifique sua caixa de entrada e siga as instruções.
      </p>
      <div class="d-grid gap-2">
        <button class="btn btn-primary" @click="goBackToLogin">
          Voltar para o login
        </button>
        <button class="btn btn-outline-secondary" @click="resendEmail" :disabled="resendLoading">
          <span v-if="resendLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ resendLoading ? 'Reenviando...' : 'Reenviar email' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { forgotPassword } from '@/services/api';

export default {
  name: 'ForgotPasswordComponent',
  props: {
    activeTab: {
      type: String,
      default: 'login'
    }
  },
  emits: ['back-to-login'],
  data() {
    return {
      email: '',
      emailSent: false,
      loading: false,
      resendLoading: false,
      errors: {
        email: ''
      }
    };
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errors.email = 'Email é obrigatório';
        return false;
      }
      if (!emailRegex.test(this.email)) {
        this.errors.email = 'Email inválido';
        return false;
      }
      this.errors.email = '';
      return true;
    },
    async sendResetEmail() {
      if (!this.validateEmail()) {
        return;
      }

      this.loading = true;
      try {
        // Chamada à API (quando estiver implementada no backend)
        try {
          await forgotPassword(this.email);
        } catch (apiError) {
          // Se a API retornar 501 (não implementado), simula o envio
          if (apiError.response?.status === 501) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          } else {
            throw apiError;
          }
        }
        
        this.emailSent = true;
        
        Swal.fire({
          icon: 'success',
          title: 'Email enviado!',
          text: 'Verifique sua caixa de entrada para redefinir sua senha.',
          timer: 3000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Erro ao enviar email:', error);
        
        let errorMessage = 'Não foi possível enviar o email. Tente novamente mais tarde.';
        
        if (error.response?.status === 404) {
          errorMessage = 'Email não encontrado em nossa base de dados.';
        } else if (error.response?.status === 429) {
          errorMessage = 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.';
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Erro ao enviar email',
          text: errorMessage,
          confirmButtonColor: '#dc3545'
        });
      } finally {
        this.loading = false;
      }
    },
    async resendEmail() {
      this.resendLoading = true;
      try {
        // Chamada à API (quando estiver implementada no backend)
        try {
          await forgotPassword(this.email);
        } catch (apiError) {
          // Se a API retornar 501 (não implementado), simula o reenvio
          if (apiError.response?.status === 501) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          } else {
            throw apiError;
          }
        }
        
        Swal.fire({
          icon: 'success',
          title: 'Email reenviado!',
          text: 'Verifique sua caixa de entrada novamente.',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Erro ao reenviar email:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível reenviar o email. Tente novamente.',
          confirmButtonColor: '#dc3545'
        });
      } finally {
        this.resendLoading = false;
      }
    },
    goBackToLogin() {
      this.emailSent = false;
      this.email = '';
      this.errors.email = '';
      this.$emit('back-to-login');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

