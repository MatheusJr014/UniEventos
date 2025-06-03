<template>
  <div>
    <header class="sticky-top bg-white border-bottom">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light py-2">
          <div class="container-fluid">
            <router-link to="/" class="navbar-brand d-flex align-items-center" href="#">
              <img src="../../assets/logo.svg" alt="Conecta Eventos Logo" height="115" class="me-2">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/lista/eventos">Eventos</a>
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
              <div class="d-flex" v-if="!isLoggedIn">
                <a href="/login" class="btn me-2 d-none d-sm-inline">Entrar</a>
                <a href="/login" class="btn btn-primary">Cadastrar</a>
              </div>
              <div class="d-flex align-items-center" v-else>
                <div class="dropdown">
                  <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="userDropdown"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://placehold.co/100x100" alt="User Avatar" class="rounded-circle me-2" width="32"
                      height="32">
                    <span class="d-none d-sm-inline">{{ userData.nome }}</span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item active" href="/perfil/"><i class="bi bi-person me-2"></i>Meu Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-ticket-perforated me-2"></i>Meus Ingressos</a>
                    </li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-heart me-2"></i>Favoritos</a></li>
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#" @click="logout"><i class="bi bi-box-arrow-right me-2"></i>Sair</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>
<script>
import { jwtDecode } from 'jwt-decode';


export default {
  data() {
    return {
      isLoggedIn: false,
      userData: {},
      userProfileImage: "https://placehold.co/100/f8f9fa/6c757d?text=JS", // Imagem padrão
    };

  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          this.userData = {
            id: decodedToken.Id,
            nome: decodedToken.nome || "Usuario"
          };
          this.isLoggedIn = true;
        } catch (error) {
          console.error("Erro ao decodificar o Token: ", error);
          this.isLoggedIn = false;
        }
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.userData = {},
        this.$router.push("/login")
    }
  }
}
</script>

<style></style>