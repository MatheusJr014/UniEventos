<template>
  <div class="col-lg-4">
    <div
      class="card border-0 shadow-sm mb-4 sticky-top"
      style="top: 90px; z-index: 10"
    >
      <div class="card-body">
        <h3 class="h5 fw-bold mb-3">Ingressos</h3>

        <div class="mb-4">
          <div
            v-for="(ticket, index) in tickets"
            :key="index"
            class="card mb-3 border"
          >
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <div>
                  <h6 class="mb-1">{{ ticket.name }}</h6>
                  <p class="text-muted small mb-0">{{ ticket.description }}</p>
                </div>
                <span
                  class="badge"
                  :class="ticket.available ? 'bg-success' : 'bg-danger'"
                >
                  {{ ticket.available ? "Disponível" : "Esgotado" }}
                </span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bold">R$ {{ ticket.price.toFixed(2) }}</div>
                <div class="input-group input-group-sm" style="width: 110px">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    :disabled="!ticket.available || ticket.quantity <= 0"
                    @click="$emit('decrement', index)"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    class="form-control text-center"
                    :value="ticket.quantity"
                    readonly
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    :disabled="!ticket.available"
                    @click="$emit('increment', index)"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <div class="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>R$ {{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Taxa de serviço</span>
            <span>R$ {{ serviceFee.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>R$ {{ total.toFixed(2) }}</span>
          </div>
        </div>

        <button class="btn btn-primary w-100 mb-3" :disabled="subtotal <= 0">
          Comprar Ingressos
        </button>

        <div
          class="d-flex align-items-center justify-content-center text-muted small"
        >
          <i class="bi bi-shield-check me-2"></i>
          <span>Compra 100% segura</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBarEvent",
  props: {
    tickets: {
      type: Array,
      required: true,
      default: () => [],
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    serviceFee: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
};
</script>
