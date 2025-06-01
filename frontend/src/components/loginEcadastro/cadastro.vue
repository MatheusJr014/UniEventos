<template>
  <div>
    <!-- Header -->
    <header class="sticky-top bg-white border-bottom">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light py-2">
          <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoConecta-SNoUxrSWP8iTB6IvwaQcweuJEgUJxa.png" alt="Conecta Eventos Logo" height="40" class="me-2">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
              <div class="d-flex">
                <a href="#" class="btn btn-primary active">Entrar</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <!-- Breadcrumb -->
      <div class="bg-light py-2">
        <div class="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#" class="text-decoration-none">Início</a></li>
              <li class="breadcrumb-item active" aria-current="page">{{ activeTab === 'login' ? 'Entrar' : 'Cadastrar' }}</li>
            </ol>
          </nav>
        </div>
      </div>

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
                        <div class="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
                          <img src="https://placehold.co/600x800" alt="Eventos" class="img-cover">
                          <div class="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-75"></div>
                        </div>
                        <div class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center text-white p-4">
                          <h2 class="h3 fw-bold mb-4">{{ activeTab === 'login' ? 'Bem-vindo de volta!' : 'Junte-se a nós!' }}</h2>
                          <p class="mb-4">
                            {{ activeTab === 'login' 
                              ? 'Acesse sua conta para descobrir os melhores eventos e experiências incríveis.' 
                              : 'Crie sua conta e comece a explorar os melhores eventos e experiências incríveis.' }}
                          </p>
                          <div class="d-flex flex-column gap-3 mt-4">
                            <div class="d-flex align-items-center">
                              <div class="rounded-circle bg-white p-2 me-3">
                                <i class="bi bi-ticket-perforated text-primary"></i>
                              </div>
                              <div>Acesso a eventos exclusivos</div>
                            </div>
                            <div class="d-flex align-items-center">
                              <div class="rounded-circle bg-white p-2 me-3">
                                <i class="bi bi-bell text-primary"></i>
                              </div>
                              <div>Notificações personalizadas</div>
                            </div>
                            <div class="d-flex align-items-center">
                              <div class="rounded-circle bg-white p-2 me-3">
                                <i class="bi bi-percent text-primary"></i>
                              </div>
                              <div>Descontos e promoções</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Right Side - Forms -->
                    <div class="col-lg-7">
                      <div class="p-4 p-lg-5">
                        <!-- Tabs -->
                        <ul class="nav nav-tabs nav-fill mb-4" id="authTabs" role="tablist">
                          <li class="nav-item" role="presentation">
                            <button 
                              class="nav-link" 
                              :class="{ active: activeTab === 'login' }" 
                              @click="activeTab = 'login'"
                              type="button"
                            >
                              Entrar
                            </button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button 
                              class="nav-link" 
                              :class="{ active: activeTab === 'register' }" 
                              @click="activeTab = 'register'"
                              type="button"
                            >
                              Cadastrar
                            </button>
                          </li>
                        </ul>

                        <!-- Login Form -->
                        <div v-if="activeTab === 'login'">
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
                              <input 
                                type="email" 
                                class="form-control" 
                                id="loginEmail" 
                                v-model="loginForm.email" 
                                :class="{ 'is-invalid': loginErrors.email }"
                                required
                              >
                              <div class="invalid-feedback">{{ loginErrors.email }}</div>
                            </div>
                            <div class="mb-3">
                              <div class="d-flex justify-content-between">
                                <label for="loginPassword" class="form-label">Senha</label>
                                <a href="#" class="text-decoration-none small" @click.prevent="showForgotPassword = true">Esqueceu a senha?</a>
                              </div>
                              <div class="input-group">
                                <input 
                                  :type="showLoginPassword ? 'text' : 'password'" 
                                  class="form-control" 
                                  id="loginPassword" 
                                  v-model="loginForm.password" 
                                  :class="{ 'is-invalid': loginErrors.password }"
                                  required
                                >
                                <button 
                                  class="btn btn-outline-secondary" 
                                  type="button"
                                  @click="showLoginPassword = !showLoginPassword"
                                >
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
                              <button 
                                type="submit" 
                                class="btn btn-primary" 
                                :disabled="loginLoading"
                              >
                                <span v-if="loginLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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
                                <input 
                                  type="text" 
                                  class="form-control" 
                                  id="registerFirstName" 
                                  v-model="registerForm.firstName" 
                                  :class="{ 'is-invalid': registerErrors.firstName }"
                                  required
                                >
                                <div class="invalid-feedback">{{ registerErrors.firstName }}</div>
                              </div>
                              <div class="col-md-6">
                                <label for="registerLastName" class="form-label">Sobrenome</label>
                                <input 
                                  type="text" 
                                  class="form-control" 
                                  id="registerLastName" 
                                  v-model="registerForm.lastName" 
                                  :class="{ 'is-invalid': registerErrors.lastName }"
                                  required
                                >
                                <div class="invalid-feedback">{{ registerErrors.lastName }}</div>
                              </div>
                              <div class="col-12">
                                <label for="registerEmail" class="form-label">Email</label>
                                <input 
                                  type="email" 
                                  class="form-control" 
                                  id="registerEmail" 
                                  v-model="registerForm.email" 
                                  :class="{ 'is-invalid': registerErrors.email }"
                                  required
                                >
                                <div class="invalid-feedback">{{ registerErrors.email }}</div>
                              </div>
                              <div class="col-md-6">
                                <label for="registerPassword" class="form-label">Senha</label>
                                <div class="input-group">
                                  <input 
                                    :type="showRegisterPassword ? 'text' : 'password'" 
                                    class="form-control" 
                                    id="registerPassword" 
                                    v-model="registerForm.password" 
                                    :class="{ 'is-invalid': registerErrors.password }"
                                    required
                                  >
                                  <button 
                                    class="btn btn-outline-secondary" 
                                    type="button"
                                    @click="showRegisterPassword = !showRegisterPassword"
                                  >
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
                                  <input 
                                    :type="showRegisterConfirmPassword ? 'text' : 'password'" 
                                    class="form-control" 
                                    id="registerConfirmPassword" 
                                    v-model="registerForm.confirmPassword" 
                                    :class="{ 'is-invalid': registerErrors.confirmPassword }"
                                    required
                                  >
                                  <button 
                                    class="btn btn-outline-secondary" 
                                    type="button"
                                    @click="showRegisterConfirmPassword = !showRegisterConfirmPassword"
                                  >
                                    <i class="bi" :class="showRegisterConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                                  </button>
                                  <div class="invalid-feedback">{{ registerErrors.confirmPassword }}</div>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="form-check">
                                  <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    id="termsCheck" 
                                    v-model="registerForm.agreeTerms"
                                    :class="{ 'is-invalid': registerErrors.agreeTerms }"
                                    required
                                  >
                                  <label class="form-check-label" for="termsCheck">
                                    Concordo com os <a href="#" class="text-decoration-none">Termos de Serviço</a> e <a href="#" class="text-decoration-none">Política de Privacidade</a>
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
                                  <button 
                                    type="submit" 
                                    class="btn btn-primary" 
                                    :disabled="registerLoading"
                                  >
                                    <span v-if="registerLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Forgot Password Modal -->
    <div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true" v-if="showForgotPassword">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="forgotPasswordModalLabel">Recuperar Senha</h5>
            <button type="button" class="btn-close" @click="showForgotPassword = false"></button>
          </div>
          <div class="modal-body">
            <p>Digite seu email para receber um link de recuperação de senha.</p>
            <form @submit.prevent="recoverPassword">
              <div class="mb-3">
                <label for="recoveryEmail" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="recoveryEmail" 
                  v-model="forgotPasswordForm.email" 
                  :class="{ 'is-invalid': forgotPasswordError }"
                  required
                >
                <div class="invalid-feedback">{{ forgotPasswordError }}</div>
              </div>
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  :disabled="forgotPasswordLoading"
                >
                  <span v-if="forgotPasswordLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ forgotPasswordLoading ? 'Enviando...' : 'Enviar Link de Recuperação' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true" v-if="showSuccessModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">{{ successModalTitle }}</h5>
            <button type="button" class="btn-close" @click="showSuccessModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-4">
              <div class="rounded-circle bg-success bg-opacity-25 p-3 d-inline-flex mb-3">
                <i class="bi bi-check-circle fs-1 text-success"></i>
              </div>
              <p>{{ successModalMessage }}</p>
            </div>
            <div class="d-grid">
              <button type="button" class="btn btn-primary" @click="showSuccessModal = false">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="py-5 bg-white border-top">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-3 col-md-6">
            <div class="mb-4">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoConecta-SNoUxrSWP8iTB6IvwaQcweuJEgUJxa.png" alt="Conecta Eventos Logo" height="40" class="mb-3">
              <p class="text-muted small">
                A melhor plataforma para encontrar e promover eventos no Brasil.
              </p>
            </div>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5 class="fw-bold mb-3 small text-uppercase">Eventos</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Todos os Eventos</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Eventos Gratuitos</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Eventos Online</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Eventos Próximos</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5 class="fw-bold mb-3 small text-uppercase">Organizadores</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Criar Evento</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Vender Ingressos</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Ferramentas</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Preços</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5 class="fw-bold mb-3 small text-uppercase">Empresa</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Sobre Nós</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Carreiras</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Blog</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Contato</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="fw-bold mb-3 small text-uppercase">Legal</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Termos de Serviço</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Política de Privacidade</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Política de Cookies</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small">Acessibilidade</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 mt-4 border-top">
          <p class="text-muted small">
            &copy; {{ new Date().getFullYear() }} Conecta Eventos. Todos os direitos reservados.
          </p>
          <div class="d-flex gap-3">
            <a href="#" class="text-muted">
              <i class="bi bi-facebook"></i>
              <span class="visually-hidden">Facebook</span>
            </a>
            <a href="#" class="text-muted">
              <i class="bi bi-instagram"></i>
              <span class="visually-hidden">Instagram</span>
            </a>
            <a href="#" class="text-muted">
              <i class="bi bi-twitter"></i>
              <span class="visually-hidden">Twitter</span>
            </a>
            <a href="#" class="text-muted">
              <i class="bi bi-youtube"></i>
              <span class="visually-hidden">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LoginCadastro',
  data() {
    return {
      activeTab: 'login',
      showLoginPassword: false,
      showRegisterPassword: false,
      showRegisterConfirmPassword: false,
      loginLoading: false,
      registerLoading: false,
      forgotPasswordLoading: false,
      showForgotPassword: false,
      showSuccessModal: false,
      successModalTitle: '',
      successModalMessage: '',
      
      loginForm: {
        email: '',
        password: '',
        rememberMe: false
      },
      loginErrors: {
        email: '',
        password: ''
      },
      
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
      
      forgotPasswordForm: {
        email: ''
      },
      forgotPasswordError: ''
    };
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
    
    recoverPassword() {
      // Reset error
      this.forgotPasswordError = '';
      
      // Validate form
      if (!this.forgotPasswordForm.email) {
        this.forgotPasswordError = 'O email é obrigatório';
        return;
      } else if (!this.validateEmail(this.forgotPasswordForm.email)) {
        this.forgotPasswordError = 'Por favor, insira um email válido';
        return;
      }
      
      // Submit form
      this.forgotPasswordLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.forgotPasswordLoading = false;
        this.showForgotPassword = false;
        
        // Show success message
        this.successModalTitle = 'Email enviado';
        this.successModalMessage = 'Enviamos um link de recuperação de senha para ' + this.forgotPasswordForm.email;
        this.showSuccessModal = true;
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
};
</script>

<style>
/* Importando Bootstrap e Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");

/* Estilos personalizados baseados nas cores da logo */
:root {
  --primary-color: #7749F8; /* Roxo da logo */
  --secondary-color: #FF9933; /* Laranja da logo */
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