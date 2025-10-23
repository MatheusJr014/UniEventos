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
      <form @submit.prevent="saveCadastroUser">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="registerFirstName" class="form-label">Nome</label>
            <input type="text" class="form-control" id="registerFirstName" v-model="registerForm.nome"
              :class="{ 'is-invalid': registerErrors.nome }" required>
            <div class="invalid-feedback">{{ registerErrors.nome }}</div>
          </div>
          <div class="col-md-6">
            <label for="registerSobrenome" class="form-label">Sobrenome</label>
            <input type="text" class="form-control" id="registerLastName" v-model="registerForm.sobrenome"
              :class="{ 'is-invalid': registerErrors.sobrenome }" required>
            <div class="invalid-feedback">{{ registerErrors.sobrenome }}</div>
          </div>
          <div class="col-md-6">
            <label for="registerCPF" class="form-label">CPF</label>
            <input type="text" class="form-control" id="registerLastName" v-model="registerForm.cpf"
              :class="{ 'is-invalid': registerErrors.cpf }" required>
            <div class="invalid-feedback">{{ registerErrors.cpf }}</div>
          </div>
          <div class="col-md-6">
            <label for="registerConsumer" class="form-label">Cargo</label>
            <select v-model="registerForm.tipouser" class="form-select" id="registerConsumer"
              :class="{ 'is-invalid': registerErrors.tipouser }" required>
              <option disabled value="">Selecione...</option>
              <option :value="1">Organizador</option>
              <option :value="0">Espectador</option>
            </select>
            <div class="invalid-feedback">{{ registerErrors.tipouser }}</div>
          </div>
          <!-- <div class="col-md-6">
            <label for="registerLastName" class="form-label">Sobrenome</label>
            <input type="text" class="form-control" id="registerLastName" v-model="registerForm.lastName"
              :class="{ 'is-invalid': registerErrors.lastName }" required>
            <div class="invalid-feedback">{{ registerErrors.lastName }}</div>
          </div> -->
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
                v-model="registerForm.senha" :class="{ 'is-invalid': registerErrors.senha }" required>
              <button class="btn btn-outline-secondary" type="button"
                @click="showRegisterPassword = !showRegisterPassword">
                <i class="bi" :class="showRegisterPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
              <div class="invalid-feedback">{{ registerErrors.senha }}</div>
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
            <!-- <div class="form-check">
              <input class="form-check-input" type="checkbox" id="termsCheck" v-model="registerForm.agreeTerms"
                :class="{ 'is-invalid': registerErrors.agreeTerms }" required>
              <label class="form-check-label" for="termsCheck">
                Concordo com os <a href="#" class="text-decoration-none">Termos de Serviço</a> e <a href="#"
                  class="text-decoration-none">Política de Privacidade</a>
              </label>
              <div class="invalid-feedback">{{ registerErrors.agreeTerms }}</div>
            </div> -->
          </div>
          <div class="col-12">
            <!-- <div class="form-check">
              <input class="form-check-input" type="checkbox" id="newsletterCheck" v-model="registerForm.newsletter">
              <label class="form-check-label" for="newsletterCheck">
                Desejo receber emails sobre eventos e promoções
              </label>
            </div> -->
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
import Swal from 'sweetalert2';
import axios from 'axios';
import { validateNome, validateCPF, validateConfirmPassword, validateSenha, validateEmail } from '@/assets/validate';
import { criarUsuario } from '@/services/api';

export default {
  name: 'CadastroComponent',
  data() {
    return {
      activeTab: 'register',
      registerForm: {
        nome: '',
        sobrenome: '',
        email: '',
        cpf: '',
        tipouser: '',
        senha: '',
        confirmPassword: ''
      },
      registerErrors: {
        nome: '',
        sobrenome: '', 
        email: '',
        cpf: '',
        tipouser: '',
        senha: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    validateNome() {
      this.registerErrors.nome = validateNome(this.registerForm.nome);
    },
    validateEmail() {
      this.registerErrors.email = validateEmail(this.registerForm.email);
    },
    validateSenha() {
      this.registerErrors.senha = validateSenha(this.registerForm.senha, this.registerForm.confirmPassword);
    },
    validateConfirmPassword() {
      this.registerErrors.confirmPassword = validateConfirmPassword(this.registerForm.confirmPassword, this.registerForm.senha);
    },
    validateCPF() {
      this.registerErrors.cpf = validateCPF(this.registerForm.cpf);
    },
    validateForm() {
      this.validateNome();
      this.validateEmail();
      this.validateSenha();
      this.validateConfirmPassword();
      this.validateCPF();

      if (Object.values(this.registerErrors).some(error => error)) {
        Swal.fire({
          icon: 'error',
          title: 'Erro no preenchimento',
          text: 'Por favor, corrija os campos destacados antes de continuar.',
        });
        return false;
      }
      return true;
    },
    async saveCadastroUser() {
      if (!this.validateForm()) {
        Swal.fire({
          icon: 'error',
          title: 'Erro no cadastro',
          text: 'Por favor, preencha os campos corretamente.',
          confirmButtonColor: '#dc3545'
        });
        return;
      }
      this.registerLoading = true;
      try {
        await criarUsuario({
          nome: this.registerForm.nome,
          sobrenome: this.registerForm.sobrenome,
          email: this.registerForm.email,
          cpf: this.registerForm.cpf,
          tipouser: this.registerForm.tipouser,
          senha: this.registerForm.senha
        });

        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'Você será redirecionado para a tela de login.',
          timer: 3000,
          showConfirmButton: false
        }).then(() => {
          location.reload();
        });
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro no cadastro',
          text: 'Não foi possível realizar o cadastro. Tente novamente mais tarde.',
          confirmButtonColor: '#dc3545'
        });
      } finally {
        this.registerLoading = false;
      }
    }
  }
}
</script>
<style lang="">

</style>