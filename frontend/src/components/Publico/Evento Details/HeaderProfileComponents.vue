<template>
  <header class="sticky-top bg-white border-bottom">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light py-2">
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center" href="#">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoConecta-SNoUxrSWP8iTB6IvwaQcweuJEgUJxa.png"
              alt="Conecta Eventos Logo"
              height="40"
              class="me-2"
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
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
            <div class="d-flex align-items-center">
              <div class="dropdown">
                <a
                  href="#"
                  class="d-flex align-items-center text-decoration-none dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://placehold.co/100x100"
                    alt="User Avatar"
                    class="rounded-circle me-2"
                    width="32"
                    height="32"
                  />
                  <span class="d-none d-sm-inline">{{ userName }}</span>
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <a class="dropdown-item active" href="#"
                      ><i class="bi bi-person me-2"></i>Meu Perfil</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><i class="bi bi-ticket-perforated me-2"></i>Meus
                      Ingressos</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><i class="bi bi-heart me-2"></i>Favoritos</a
                    >
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><i class="bi bi-box-arrow-right me-2"></i>Sair</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  name: "ProfileHeader",
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
};
</script>
