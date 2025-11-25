<template>
    <div class="min-vh-100 bg-light">
      <!-- Header -->
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="#">
            <div class="d-flex align-items-center">
              <svg width="32" height="32" viewBox="0 0 32 32" class="me-2">
                <circle cx="16" cy="16" r="14" fill="#8B5CF6"/>
                <path d="M12 14c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.5-.8 2.8-2 3.5v2.5c0 .6-.4 1-1 1s-1-.4-1-1v-2.5c-1.2-.7-2-2-2-3.5z" fill="white"/>
              </svg>
              <span class="fw-bold" style="color: #8B5CF6;">Conecta</span>
              <span class="fw-bold" style="color: #F97316;">Eventos</span>
            </div>
          </a>
        </div>
      </nav>
  
      <!-- Progress Steps -->
      <div class="bg-white border-bottom py-3">
        <div class="container">
          <div class="d-flex align-items-center justify-content-center">
            <div class="d-flex align-items-center">
              <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
              </div>
              <span class="ms-2 small text-success fw-semibold">Ingressos</span>
            </div>
            <div class="border-top mx-3" style="width: 60px;"></div>
            <div class="d-flex align-items-center">
              <div class="rounded-circle text-white d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; background-color: #8B5CF6;">
                <span class="small">2</span>
              </div>
              <span class="ms-2 small fw-semibold" style="color: #8B5CF6;">Pagamento</span>
            </div>
            <div class="border-top mx-3" style="width: 60px;"></div>
            <div class="d-flex align-items-center">
              <div class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                <span class="small">3</span>
              </div>
              <span class="ms-2 small text-muted">Confirmação</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="container my-5">
        <div class="row g-4">
          <!-- Left Column - Forms -->
          <div class="col-lg-7">
            <!-- Personal Information -->
            <div class="card shadow-sm border-0 mb-4">
              <div class="card-body p-4">
                <h4 class="fw-bold mb-4">Informações Pessoais</h4>
                
                <form>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">Nome Completo</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="personalInfo.fullName"
                        placeholder="Digite seu nome completo"
                        required
                      >
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">CPF</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="personalInfo.cpf"
                        placeholder="000.000.000-00"
                        maxlength="14"
                        required
                      >
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">E-mail</label>
                      <input 
                        type="email" 
                        class="form-control" 
                        v-model="personalInfo.email"
                        placeholder="seu@email.com"
                        required
                      >
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">Telefone</label>
                      <input 
                        type="tel" 
                        class="form-control" 
                        v-model="personalInfo.phone"
                        placeholder="(00) 00000-0000"
                        maxlength="15"
                        required
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
  
            <!-- Payment Method -->
            <div class="card shadow-sm border-0">
              <div class="card-body p-4">
                <h4 class="fw-bold mb-4">Forma de Pagamento</h4>
                
                <!-- Payment Method Selector -->
                <div class="d-flex gap-2 mb-4">
                  <button 
                    type="button"
                    class="btn flex-fill py-3"
                    :class="paymentMethod === 'credit' ? 'btn-primary' : 'btn-outline-secondary'"
                    @click="paymentMethod = 'credit'"
                    style="background-color: #8B5CF6; border-color: #8B5CF6;"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" class="me-2">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                      <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                    </svg>
                    Cartão de Crédito
                  </button>
                  <button 
                    type="button"
                    class="btn btn-outline-secondary flex-fill py-3"
                    :class="paymentMethod === 'pix' ? 'btn-primary' : 'btn-outline-secondary'"
                    @click="paymentMethod = 'pix'"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" class="me-2">
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                    PIX
                  </button>
                </div>
  
                <!-- Credit Card Form -->
                <div v-if="paymentMethod === 'credit'">
                  <div class="row g-3">
                    <div class="col-12">
                      <label class="form-label fw-semibold">Número do Cartão</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="creditCard.number"
                        placeholder="0000 0000 0000 0000"
                        maxlength="19"
                        required
                      >
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-semibold">Nome no Cartão</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="creditCard.name"
                        placeholder="Como está escrito no cartão"
                        required
                      >
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">Validade</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="creditCard.expiry"
                        placeholder="MM/AA"
                        maxlength="5"
                        required
                      >
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">CVV</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="creditCard.cvv"
                        placeholder="000"
                        maxlength="4"
                        required
                      >
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-semibold">Parcelas</label>
                      <select class="form-select" v-model="creditCard.installments">
                        <option value="1">1x de R$ {{ formatPrice(orderTotal) }} sem juros</option>
                        <option value="2">2x de R$ {{ formatPrice(orderTotal / 2) }} sem juros</option>
                        <option value="3">3x de R$ {{ formatPrice(orderTotal / 3) }} sem juros</option>
                        <option value="4">4x de R$ {{ formatPrice(orderTotal / 4) }} sem juros</option>
                        <option value="5">5x de R$ {{ formatPrice(orderTotal / 5) }} sem juros</option>
                        <option value="6">6x de R$ {{ formatPrice(orderTotal / 6) }} sem juros</option>
                      </select>
                    </div>
                  </div>
                </div>
  
                <!-- PIX Information -->
                <div v-if="paymentMethod === 'pix'" class="text-center py-4">
                  <div class="alert alert-info mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" class="me-2">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    Após confirmar a compra, você receberá um QR Code PIX para realizar o pagamento
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Right Column - Order Summary -->
          <div class="col-lg-5">
            <div class="card shadow-sm border-0 sticky-top" style="top: 20px;">
              <div class="card-body p-4">
                <h4 class="fw-bold mb-4">Resumo do Pedido</h4>
                
                <!-- Event Info -->
                <div class="mb-4 pb-4 border-bottom">
                  <span class="badge mb-2" style="background-color: #8B5CF6;">Tecnologia</span>
                  <h5 class="fw-bold mb-2">Palestra de IA</h5>
                  <div class="text-muted small mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="me-1">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    19 de novembro de 2025 - 19:00
                  </div>
                  <div class="text-muted small">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="me-1">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    Auditório Principal
                  </div>
                </div>
  
                <!-- Tickets List -->
                <div class="mb-4">
                  <h6 class="fw-semibold mb-3">Ingressos Selecionados</h6>
                  <div v-for="ticket in selectedTickets" :key="ticket.id" class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <div class="fw-semibold">{{ ticket.name }}</div>
                      <div class="text-muted small">{{ ticket.quantity }}x R$ {{ formatPrice(ticket.price) }}</div>
                    </div>
                    <div class="fw-bold">
                      R$ {{ formatPrice(ticket.quantity * ticket.price) }}
                    </div>
                  </div>
                </div>
  
                <!-- Price Breakdown -->
                <div class="border-top pt-3">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Subtotal</span>
                    <span>R$ {{ formatPrice(subtotal) }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Taxa de serviço</span>
                    <span>R$ {{ formatPrice(serviceFee) }}</span>
                  </div>
                  <div class="d-flex justify-content-between fw-bold fs-5 mb-4 pb-3 border-bottom">
                    <span>Total</span>
                    <span style="color: #8B5CF6;">R$ {{ formatPrice(orderTotal) }}</span>
                  </div>
  
                  <!-- Complete Purchase Button -->
                  <button 
                    class="btn btn-lg w-100 text-white mb-3" 
                    style="background-color: #8B5CF6;"
                    @click="completePurchase"
                    :disabled="isProcessing"
                  >
                    <span v-if="!isProcessing">Finalizar Compra</span>
                    <span v-else>
                      <span class="spinner-border spinner-border-sm me-2"></span>
                      Processando...
                    </span>
                  </button>
  
                  <div class="text-center">
                    <small class="text-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="me-1">
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                        <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      Compra 100% segura e criptografada
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const paymentMethod = ref('credit')
  const isProcessing = ref(false)
  
  const personalInfo = ref({
    fullName: '',
    cpf: '',
    email: '',
    phone: ''
  })
  
  const creditCard = ref({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: '1'
  })
  
  const selectedTickets = ref([
    { id: 1, name: 'Pista', price: 50.00, quantity: 1 },
    { id: 2, name: 'VIP', price: 150.00, quantity: 1 }
  ])
  
  const subtotal = computed(() => {
    return selectedTickets.value.reduce((sum, ticket) => {
      return sum + (ticket.price * ticket.quantity)
    }, 0)
  })
  
  const serviceFee = computed(() => {
    return 20.00
  })
  
  const orderTotal = computed(() => {
    return subtotal.value + serviceFee.value
  })
  
  const formatPrice = (value) => {
    return value.toFixed(2).replace('.', ',')
  }
  
  const completePurchase = () => {
    isProcessing.value = true
    
    setTimeout(() => {
      isProcessing.value = false
      alert('Compra realizada com sucesso! Você receberá um e-mail com os detalhes.')
    }, 2000)
  }
  </script>
  
  <style scoped>
  .form-control:focus,
  .form-select:focus {
    border-color: #8B5CF6;
    box-shadow: 0 0 0 0.2rem rgba(139, 92, 246, 0.25);
  }
  
  .btn-primary {
    background-color: #8B5CF6;
    border-color: #8B5CF6;
  }
  
  .btn-primary:hover {
    background-color: #7C3AED;
    border-color: #7C3AED;
  }
  
  .card {
    border-radius: 12px;
  }
  
  .form-control,
  .form-select {
    border-radius: 8px;
    padding: 0.75rem;
  }
  
  @media (max-width: 991px) {
    .sticky-top {
      position: relative !important;
    }
  }
  </style>
  