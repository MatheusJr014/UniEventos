<template>
  <section class="py-5 bg-light">
    <div class="container">
      <h2 class="h3 fw-bold mb-4">Eventos Relacionados</h2>
      <div class="row g-4">
        <div
          v-for="(relatedEvent, index) in relatedEvents"
          :key="index"
          class="col-md-6 col-lg-4"
        >
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="position-relative">
              <img
                :src="relatedEvent.image"
                :alt="relatedEvent.title"
                class="card-img-top"
              />
              <span
                class="position-absolute top-0 end-0 badge bg-primary m-2"
                >{{ relatedEvent.category }}</span
              >
            </div>
            <div class="card-body">
              <h5 class="card-title fw-bold">{{ relatedEvent.title }}</h5>
              <div class="d-flex align-items-center text-muted mb-2">
                <i class="bi bi-calendar-event me-2"></i>
                <span>{{ relatedEvent.date }}</span>
              </div>
              <div class="d-flex align-items-center text-muted mb-3">
                <i class="bi bi-geo-alt me-2"></i>
                <span>{{ relatedEvent.location }}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bold">
                  {{
                    relatedEvent.price === 0
                      ? "Grátis"
                      : `R$ ${relatedEvent.price.toFixed(2)}`
                  }}
                </div>
                <a href="#" class="btn btn-sm btn-secondary">Ver Detalhes</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "RelatedEvents",
  props: {
    relatedEvents: {
      type: Array,
      required: true,
    },
  },
};
</script>
