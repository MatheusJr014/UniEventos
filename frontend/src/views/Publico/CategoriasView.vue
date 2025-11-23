<template>
  <div class="min-vh-100 bg-light">
    <NavBarComponents />
    
    <main>
      <!-- Breadcrumb -->
      <div class="bg-light py-2">
        <div class="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none">Início</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Categorias
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="bg-primary text-white py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-8 mx-auto text-center">
              <h1 class="display-5 fw-bold mb-3">Explore por Categorias</h1>
              <p class="lead mb-0">
                Descubra eventos incríveis organizados por categoria e encontre exatamente o que você procura
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Grid Section -->
      <section class="py-5">
        <div class="container">
          <div class="row g-4">
            <!-- Música -->
            <div class="col-md-6 col-lg-4">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Música' } }" 
                class="text-decoration-none"
              >
                <div class="card border-0 shadow-sm h-100 hover-card category-card">
                  <div class="card-body p-4 text-center">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                      <i class="bi bi-music-note-beamed text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-2">Música</h3>
                    <p class="text-muted mb-3">
                      Shows, festivais, concertos e apresentações musicais de todos os estilos
                    </p>
                    <span class="badge bg-primary">Ver Eventos</span>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- Esportes -->
            <div class="col-md-6 col-lg-4">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Esporte' } }" 
                class="text-decoration-none"
              >
                <div class="card border-0 shadow-sm h-100 hover-card category-card">
                  <div class="card-body p-4 text-center">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                      <i class="bi bi-trophy text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-2">Esportes</h3>
                    <p class="text-muted mb-3">
                      Competições, jogos, maratonas e eventos esportivos de todas as modalidades
                    </p>
                    <span class="badge bg-primary">Ver Eventos</span>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- Teatro -->
            <div class="col-md-6 col-lg-4">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Teatro' } }" 
                class="text-decoration-none"
              >
                <div class="card border-0 shadow-sm h-100 hover-card category-card">
                  <div class="card-body p-4 text-center">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                      <i class="bi bi-mask text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-2">Teatro</h3>
                    <p class="text-muted mb-3">
                      Peças teatrais, espetáculos, comédias e apresentações artísticas
                    </p>
                    <span class="badge bg-primary">Ver Eventos</span>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- Tecnologia -->
            <div class="col-md-6 col-lg-4">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Tecnologia' } }" 
                class="text-decoration-none"
              >
                <div class="card border-0 shadow-sm h-100 hover-card category-card">
                  <div class="card-body p-4 text-center">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                      <i class="bi bi-laptop text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-2">Tecnologia</h3>
                    <p class="text-muted mb-3">
                      Palestras, workshops, hackathons e eventos de inovação tecnológica
                    </p>
                    <span class="badge bg-primary">Ver Eventos</span>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- Gastronomia -->
            <div class="col-md-6 col-lg-4">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Gastronomia' } }" 
                class="text-decoration-none"
              >
                <div class="card border-0 shadow-sm h-100 hover-card category-card">
                  <div class="card-body p-4 text-center">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                      <i class="bi bi-cup-hot text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-2">Gastronomia</h3>
                    <p class="text-muted mb-3">
                      Festivais gastronômicos, degustações, workshops de culinária e eventos food
                    </p>
                    <span class="badge bg-primary">Ver Eventos</span>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- Arte e Cultura -->
            <div class="col-md-6 col-lg-4">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Arte' } }" 
                class="text-decoration-none"
              >
                <div class="card border-0 shadow-sm h-100 hover-card category-card">
                  <div class="card-body p-4 text-center">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                      <i class="bi bi-palette text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-2">Arte e Cultura</h3>
                    <p class="text-muted mb-3">
                      Exposições, galerias, museus e eventos culturais diversos
                    </p>
                    <span class="badge bg-primary">Ver Eventos</span>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- Workshops -->
            <div class="col-md-6 col-lg-4">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Workshop' } }" 
                class="text-decoration-none"
              >
                <div class="card border-0 shadow-sm h-100 hover-card category-card">
                  <div class="card-body p-4 text-center">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                      <i class="bi bi-lightbulb text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-2">Workshops</h3>
                    <p class="text-muted mb-3">
                      Cursos práticos, oficinas e workshops de aprendizado
                    </p>
                    <span class="badge bg-primary">Ver Eventos</span>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- Conferências -->
            <div class="col-md-6 col-lg-4">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Conferência' } }" 
                class="text-decoration-none"
              >
                <div class="card border-0 shadow-sm h-100 hover-card category-card">
                  <div class="card-body p-4 text-center">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                      <i class="bi bi-mic-fill text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-2">Conferências</h3>
                    <p class="text-muted mb-3">
                      Seminários, palestras, congressos e eventos corporativos
                    </p>
                    <span class="badge bg-primary">Ver Eventos</span>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- Festivais -->
            <div class="col-md-6 col-lg-4">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Festival' } }" 
                class="text-decoration-none"
              >
                <div class="card border-0 shadow-sm h-100 hover-card category-card">
                  <div class="card-body p-4 text-center">
                    <div class="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                      <i class="bi bi-people-fill text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-2">Festivais</h3>
                    <p class="text-muted mb-3">
                      Festivais multiculturais, de música, arte e entretenimento
                    </p>
                    <span class="badge bg-primary">Ver Eventos</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Categories Section -->
      <section class="py-5 bg-white">
        <div class="container">
          <div class="row mb-4">
            <div class="col-12 text-center">
              <h2 class="h3 fw-bold mb-3">Categorias Mais Procuradas</h2>
              <p class="text-muted">As categorias que estão em alta no momento</p>
            </div>
          </div>
          <div class="row g-3">
            <div class="col-6 col-md-4 col-lg-2">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Música' } }" 
                class="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
              >
                <i class="bi bi-music-note-beamed mb-2" style="font-size: 1.5rem;"></i>
                <span class="small">Música</span>
              </router-link>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Esporte' } }" 
                class="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
              >
                <i class="bi bi-trophy mb-2" style="font-size: 1.5rem;"></i>
                <span class="small">Esportes</span>
              </router-link>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Tecnologia' } }" 
                class="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
              >
                <i class="bi bi-laptop mb-2" style="font-size: 1.5rem;"></i>
                <span class="small">Tecnologia</span>
              </router-link>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Gastronomia' } }" 
                class="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
              >
                <i class="bi bi-cup-hot mb-2" style="font-size: 1.5rem;"></i>
                <span class="small">Gastronomia</span>
              </router-link>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Teatro' } }" 
                class="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
              >
                <i class="bi bi-mask mb-2" style="font-size: 1.5rem;"></i>
                <span class="small">Teatro</span>
              </router-link>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
              <router-link 
                :to="{ name: 'listaDeEvento', query: { categoria: 'Workshop' } }" 
                class="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
              >
                <i class="bi bi-lightbulb mb-2" style="font-size: 1.5rem;"></i>
                <span class="small">Workshops</span>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-5 bg-gradient text-white">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto text-center">
              <h2 class="h3 fw-bold mb-3">Não encontrou o que procura?</h2>
              <p class="lead mb-4">
                Explore todos os eventos disponíveis ou entre em contato conosco
              </p>
              <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <router-link to="/eventos" class="btn btn-light btn-lg">
                  <i class="bi bi-calendar-event me-2"></i>
                  Ver Todos os Eventos
                </router-link>
                <router-link to="/contato" class="btn btn-outline-light btn-lg">
                  <i class="bi bi-envelope me-2"></i>
                  Entre em Contato
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <FooterComponents />
  </div>
</template>

<script>
import NavBarComponents from '@/components/Publico/common/NavBarComponents.vue';
import FooterComponents from '@/components/Publico/common/FooterComponents.vue';

export default {
  name: 'CategoriasView',
  components: {
    NavBarComponents,
    FooterComponents
  }
};
</script>

<style>
/* Importando Bootstrap e Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");

/* Estilos personalizados baseados nas cores da logo */
:root {
  --primary-color: #7749f8; /* Roxo da logo */
  --secondary-color: #ff9933; /* Laranja da logo */
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

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
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

/* Gradiente para seções especiais */
.bg-gradient {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  ) !important;
}

/* Estilos para o breadcrumb */
.breadcrumb-item a {
  color: var(--primary-color);
}

.breadcrumb-item.active {
  color: var(--secondary-color);
}

/* Cards com hover */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.category-card {
  color: inherit;
}

.category-card:hover {
  color: inherit;
}

.category-card:hover .badge {
  background-color: var(--secondary-color) !important;
}

/* Estilos para botões outline light */
.btn-outline-light {
  color: white;
  border-color: white;
}

.btn-outline-light:hover {
  background-color: white;
  border-color: white;
  color: var(--primary-color);
}
</style>

