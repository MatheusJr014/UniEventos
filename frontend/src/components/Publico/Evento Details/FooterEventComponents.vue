<template>
  <footer class="py-5 bg-white border-top">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-3 col-md-6">
          <div class="mb-4">
            <img
              src="../assets/logoConecta.png"
              alt="Conecta Eventos Logo"
              height="40"
              class="mb-3"
            />
            <p class="text-muted small">
              A melhor plataforma para encontrar e promover eventos no Brasil.
            </p>
          </div>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5 class="fw-bold mb-3 small text-uppercase">Eventos</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-muted small"
                >Todos os Eventos</a
              >
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-muted small"
                >Eventos Gratuitos</a
              >
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-muted small"
                >Eventos Online</a
              >
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-muted small"
                >Eventos Próximos</a
              >
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
              <a href="#" class="nav-link p-0 text-muted small"
                >Vender Ingressos</a
              >
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
              <a href="#" class="nav-link p-0 text-muted small"
                >Termos de Serviço</a
              >
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-muted small"
                >Política de Privacidade</a
              >
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-muted small"
                >Política de Cookies</a
              >
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-muted small"
                >Acessibilidade</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div
        class="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 mt-4 border-top"
      >
        <p class="text-muted small">
          &copy; {{ new Date().getFullYear() }} Conecta Eventos. Todos os
          direitos reservados.
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
</template>

<script>
export default {
  name: "EventFooter",
  props: {},
};
</script>
