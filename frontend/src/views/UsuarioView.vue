<template>
  <div>
    <!-- Header -->
    <ProfileHeader :userName="user.name" />

    <main>
      <!-- Breadcrumb -->
      <div class="bg-light py-2">
        <div class="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <a href="#" class="text-decoration-none">Início</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Meu Perfil
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Profile Header -->
      <section class="bg-primary text-white py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-3 text-center text-md-start mb-4 mb-md-0">
              <div class="position-relative d-inline-block">
                <img
                  :src="user.avatar"
                  alt="User Avatar"
                  class="rounded-circle img-thumbnail"
                  width="180"
                  height="180"
                />
                <button
                  class="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle p-2"
                  title="Alterar foto"
                >
                  <i class="bi bi-camera"></i>
                </button>
              </div>
            </div>
            <div class="col-md-9 text-center text-md-start">
              <div
                class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-3"
              >
                <div>
                  <h1 class="h2 mb-1">{{ user.name }}</h1>
                  <p class="mb-2">{{ user.email }}</p>
                  <span class="badge bg-light text-primary">{{
                    user.type
                  }}</span>
                </div>
                <div class="mt-3 mt-md-0">
                  <button class="btn btn-light" @click="editMode = !editMode">
                    <i
                      class="bi"
                      :class="editMode ? 'bi-x-lg' : 'bi-pencil'"
                    ></i>
                    {{ editMode ? "Cancelar Edição" : "Editar Perfil" }}
                  </button>
                </div>
              </div>
              <div class="row g-3 mt-2">
                <div class="col-md-4">
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-white bg-opacity-25 p-2 me-2">
                      <i class="bi bi-calendar-check text-white"></i>
                    </div>
                    <div>
                      <div class="small text-white-50">Membro desde</div>
                      <div>{{ user.memberSince }}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-white bg-opacity-25 p-2 me-2">
                      <i class="bi bi-ticket-perforated text-white"></i>
                    </div>
                    <div>
                      <div class="small text-white-50">
                        Eventos participados
                      </div>
                      <div>{{ user.eventsAttended }}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-white bg-opacity-25 p-2 me-2">
                      <i class="bi bi-heart text-white"></i>
                    </div>
                    <div>
                      <div class="small text-white-50">Eventos favoritos</div>
                      <div>{{ user.favoriteEvents }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Profile Content -->
      <section class="py-5">
        <div class="container">
          <div class="row g-4">
            <!-- Sidebar -->
            <div class="col-lg-3">
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-0">
                  <div class="list-group list-group-flush">
                    <a
                      href="#"
                      v-for="(tab, index) in tabs"
                      :key="index"
                      class="list-group-item list-group-item-action d-flex align-items-center"
                      :class="{ active: activeTab === tab.id }"
                      @click.prevent="activeTab = tab.id"
                    >
                      <i :class="`bi ${tab.icon} me-2`"></i>
                      {{ tab.name }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="card border-0 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">Verificação de Conta</h5>
                  <div class="d-flex align-items-center mb-3">
                    <div class="progress flex-grow-1 me-3" style="height: 8px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        :style="`width: ${user.profileCompletion}%`"
                        :aria-valuenow="user.profileCompletion"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span class="text-muted small"
                      >{{ user.profileCompletion }}%</span
                    >
                  </div>
                  <p class="card-text small text-muted">
                    Complete seu perfil para melhorar suas recomendações e
                    experiência na plataforma.
                  </p>
                  <div v-if="user.profileCompletion < 100">
                    <div
                      class="d-flex align-items-center text-muted mb-2 small"
                    >
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      <span>Informações básicas</span>
                    </div>
                    <div
                      class="d-flex align-items-center text-muted mb-2 small"
                    >
                      <i
                        class="bi"
                        :class="
                          user.emailVerified
                            ? 'bi-check-circle-fill text-success'
                            : 'bi-circle text-muted'
                        "
                      ></i>
                      <span>Verificar e-mail</span>
                    </div>
                    <div
                      class="d-flex align-items-center text-muted mb-2 small"
                    >
                      <i
                        class="bi"
                        :class="
                          user.phoneVerified
                            ? 'bi-check-circle-fill text-success'
                            : 'bi-circle text-muted'
                        "
                      ></i>
                      <span>Adicionar telefone</span>
                    </div>
                    <div class="d-flex align-items-center text-muted small">
                      <i
                        class="bi"
                        :class="
                          user.preferencesSet
                            ? 'bi-check-circle-fill text-success'
                            : 'bi-circle text-muted'
                        "
                      ></i>
                      <span>Definir preferências</span>
                    </div>
                  </div>
                  <div v-else class="text-center">
                    <i class="bi bi-shield-check text-success fs-1"></i>
                    <p class="small text-muted mt-2 mb-0">
                      Seu perfil está completo!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="col-lg-9">
              <!-- Personal Information -->
              <div
                v-if="activeTab === 'personal'"
                class="card border-0 shadow-sm mb-4"
              >
                <div class="card-header bg-white">
                  <h5 class="card-title mb-0">Informações Pessoais</h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent="saveProfile">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label for="name" class="form-label"
                          >Nome Completo</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          v-model="user.name"
                          :disabled="!editMode"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="email" class="form-label">Email</label>
                        <div class="input-group">
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="user.email"
                            :disabled="!editMode"
                          />
                          <span
                            v-if="user.emailVerified"
                            class="input-group-text bg-success text-white"
                            title="Email verificado"
                          >
                            <i class="bi bi-check-circle-fill"></i>
                          </span>
                          <span
                            v-else
                            class="input-group-text bg-warning text-white"
                            title="Email não verificado"
                          >
                            <i class="bi bi-exclamation-circle-fill"></i>
                          </span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label for="phone" class="form-label">Telefone</label>
                        <div class="input-group">
                          <input
                            type="tel"
                            class="form-control"
                            id="phone"
                            v-model="user.phone"
                            :disabled="!editMode"
                          />
                          <span
                            v-if="user.phoneVerified"
                            class="input-group-text bg-success text-white"
                            title="Telefone verificado"
                          >
                            <i class="bi bi-check-circle-fill"></i>
                          </span>
                          <span
                            v-else
                            class="input-group-text bg-warning text-white"
                            title="Telefone não verificado"
                          >
                            <i class="bi bi-exclamation-circle-fill"></i>
                          </span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label for="birthdate" class="form-label"
                          >Data de Nascimento</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          id="birthdate"
                          v-model="user.birthdate"
                          :disabled="!editMode"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="gender" class="form-label">Gênero</label>
                        <select
                          class="form-select"
                          id="gender"
                          v-model="user.gender"
                          :disabled="!editMode"
                        >
                          <option value="">Selecione</option>
                          <option value="male">Masculino</option>
                          <option value="female">Feminino</option>
                          <option value="other">Outro</option>
                          <option value="prefer_not_to_say">
                            Prefiro não informar
                          </option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label for="cpf" class="form-label">CPF</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cpf"
                          v-model="user.cpf"
                          :disabled="!editMode"
                        />
                      </div>
                      <div class="col-12">
                        <label for="address" class="form-label">Endereço</label>
                        <input
                          type="text"
                          class="form-control"
                          id="address"
                          v-model="user.address"
                          :disabled="!editMode"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="city" class="form-label">Cidade</label>
                        <input
                          type="text"
                          class="form-control"
                          id="city"
                          v-model="user.city"
                          :disabled="!editMode"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="state" class="form-label">Estado</label>
                        <select
                          class="form-select"
                          id="state"
                          v-model="user.state"
                          :disabled="!editMode"
                        >
                          <option value="">Selecione</option>
                          <option
                            v-for="state in states"
                            :key="state.value"
                            :value="state.value"
                          >
                            {{ state.label }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label for="zipcode" class="form-label">CEP</label>
                        <input
                          type="text"
                          class="form-control"
                          id="zipcode"
                          v-model="user.zipcode"
                          :disabled="!editMode"
                        />
                      </div>
                      <div class="col-12" v-if="editMode">
                        <button type="submit" class="btn btn-primary">
                          Salvar Alterações
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Tickets -->
              <div
                v-if="activeTab === 'tickets'"
                class="card border-0 shadow-sm mb-4"
              >
                <div
                  class="card-header bg-white d-flex justify-content-between align-items-center"
                >
                  <h5 class="card-title mb-0">Meus Ingressos</h5>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary active"
                    >
                      Ativos
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Passados
                    </button>
                  </div>
                </div>
                <div class="card-body p-0">
                  <div v-if="tickets.length === 0" class="text-center py-5">
                    <i class="bi bi-ticket-perforated text-muted fs-1"></i>
                    <p class="mt-3 mb-0 text-muted">
                      Você ainda não possui ingressos ativos.
                    </p>
                    <a href="#" class="btn btn-primary mt-3"
                      >Explorar Eventos</a
                    >
                  </div>
                  <div v-else class="list-group list-group-flush">
                    <div
                      v-for="(ticket, index) in tickets"
                      :key="index"
                      class="list-group-item p-3"
                    >
                      <div class="row g-3 align-items-center">
                        <div class="col-md-2">
                          <img
                            :src="ticket.eventImage"
                            :alt="ticket.eventName"
                            class="img-fluid rounded"
                          />
                        </div>
                        <div class="col-md-6">
                          <h6 class="mb-1">{{ ticket.eventName }}</h6>
                          <div
                            class="d-flex align-items-center text-muted mb-2 small"
                          >
                            <i class="bi bi-calendar-event me-2"></i>
                            <span>{{ ticket.date }}</span>
                          </div>
                          <div
                            class="d-flex align-items-center text-muted small"
                          >
                            <i class="bi bi-geo-alt me-2"></i>
                            <span>{{ ticket.location }}</span>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <span
                            class="badge"
                            :class="getTicketStatusClass(ticket.status)"
                            >{{ ticket.status }}</span
                          >
                          <div class="small text-muted mt-1">
                            {{ ticket.type }}
                          </div>
                        </div>
                        <div class="col-md-2 text-end">
                          <button class="btn btn-sm btn-primary mb-2 w-100">
                            Ver Ingresso
                          </button>
                          <button
                            class="btn btn-sm btn-outline-secondary w-100"
                          >
                            Transferir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Events History -->
              <div
                v-if="activeTab === 'history'"
                class="card border-0 shadow-sm mb-4"
              >
                <div class="card-header bg-white">
                  <h5 class="card-title mb-0">Histórico de Eventos</h5>
                </div>
                <div class="card-body p-0">
                  <div
                    v-if="eventsHistory.length === 0"
                    class="text-center py-5"
                  >
                    <i class="bi bi-calendar-x text-muted fs-1"></i>
                    <p class="mt-3 mb-0 text-muted">
                      Você ainda não participou de nenhum evento.
                    </p>
                    <a href="#" class="btn btn-primary mt-3"
                      >Explorar Eventos</a
                    >
                  </div>
                  <div v-else class="list-group list-group-flush">
                    <div
                      v-for="(event, index) in eventsHistory"
                      :key="index"
                      class="list-group-item p-3"
                    >
                      <div class="row g-3 align-items-center">
                        <div class="col-md-2">
                          <img
                            :src="event.image"
                            :alt="event.name"
                            class="img-fluid rounded"
                          />
                        </div>
                        <div class="col-md-7">
                          <h6 class="mb-1">{{ event.name }}</h6>
                          <div
                            class="d-flex align-items-center text-muted mb-2 small"
                          >
                            <i class="bi bi-calendar-event me-2"></i>
                            <span>{{ event.date }}</span>
                          </div>
                          <div
                            class="d-flex align-items-center text-muted small"
                          >
                            <i class="bi bi-geo-alt me-2"></i>
                            <span>{{ event.location }}</span>
                          </div>
                        </div>
                        <div class="col-md-3 text-end">
                          <button
                            class="btn btn-sm btn-outline-primary mb-2 w-100"
                          >
                            Ver Detalhes
                          </button>
                          <button
                            class="btn btn-sm btn-outline-secondary w-100"
                          >
                            Avaliar Evento
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Favorites -->
              <div
                v-if="activeTab === 'favorites'"
                class="card border-0 shadow-sm mb-4"
              >
                <div class="card-header bg-white">
                  <h5 class="card-title mb-0">Eventos Favoritos</h5>
                </div>
                <div class="card-body p-0">
                  <div
                    v-if="favoriteEvents.length === 0"
                    class="text-center py-5"
                  >
                    <i class="bi bi-heart text-muted fs-1"></i>
                    <p class="mt-3 mb-0 text-muted">
                      Você ainda não adicionou eventos aos favoritos.
                    </p>
                    <a href="#" class="btn btn-primary mt-3"
                      >Explorar Eventos</a
                    >
                  </div>
                  <div v-else>
                    <div class="row g-4 p-3">
                      <div
                        v-for="(event, index) in favoriteEvents"
                        :key="index"
                        class="col-md-6"
                      >
                        <div class="card h-100 border hover-card">
                          <div class="position-relative">
                            <img
                              :src="event.image"
                              :alt="event.name"
                              class="card-img-top"
                            />
                            <span
                              class="position-absolute top-0 end-0 badge bg-primary m-2"
                              >{{ event.category }}</span
                            >
                            <button
                              class="btn btn-sm btn-light position-absolute top-0 start-0 m-2 rounded-circle"
                              title="Remover dos favoritos"
                            >
                              <i class="bi bi-heart-fill text-danger"></i>
                            </button>
                          </div>
                          <div class="card-body">
                            <h6 class="card-title">{{ event.name }}</h6>
                            <div
                              class="d-flex align-items-center text-muted mb-2 small"
                            >
                              <i class="bi bi-calendar-event me-2"></i>
                              <span>{{ event.date }}</span>
                            </div>
                            <div
                              class="d-flex align-items-center text-muted mb-3 small"
                            >
                              <i class="bi bi-geo-alt me-2"></i>
                              <span>{{ event.location }}</span>
                            </div>
                            <div
                              class="d-flex justify-content-between align-items-center"
                            >
                              <div class="fw-bold">
                                {{
                                  event.price === 0
                                    ? "Grátis"
                                    : `R$ ${event.price.toFixed(2)}`
                                }}
                              </div>
                              <a href="#" class="btn btn-sm btn-primary"
                                >Ver Detalhes</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Preferences -->
              <div
                v-if="activeTab === 'preferences'"
                class="card border-0 shadow-sm mb-4"
              >
                <div class="card-header bg-white">
                  <h5 class="card-title mb-0">Preferências</h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent="savePreferences">
                    <div class="mb-4">
                      <label class="form-label">Categorias de Interesse</label>
                      <div class="row g-3">
                        <div
                          v-for="(category, index) in categories"
                          :key="index"
                          class="col-md-4"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              :id="`category-${index}`"
                              v-model="userPreferences.categories"
                              :value="category.id"
                              :disabled="!editMode"
                            />
                            <label
                              class="form-check-label"
                              :for="`category-${index}`"
                            >
                              {{ category.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mb-4">
                      <label class="form-label">Localização Preferida</label>
                      <div class="row g-3">
                        <div class="col-md-6">
                          <select
                            class="form-select"
                            v-model="userPreferences.preferredCity"
                            :disabled="!editMode"
                          >
                            <option value="">Selecione uma cidade</option>
                            <option
                              v-for="city in cities"
                              :key="city"
                              :value="city"
                            >
                              {{ city }}
                            </option>
                          </select>
                        </div>
                        <div class="col-md-6">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="nearbyEvents"
                              v-model="userPreferences.showNearbyEvents"
                              :disabled="!editMode"
                            />
                            <label class="form-check-label" for="nearbyEvents">
                              Mostrar eventos próximos
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mb-4">
                      <label class="form-label">Notificações</label>
                      <div class="row g-3">
                        <div class="col-md-6">
                          <div class="form-check form-switch mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="emailNotifications"
                              v-model="userPreferences.emailNotifications"
                              :disabled="!editMode"
                            />
                            <label
                              class="form-check-label"
                              for="emailNotifications"
                            >
                              Receber notificações por email
                            </label>
                          </div>
                          <div class="form-check form-switch mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="smsNotifications"
                              v-model="userPreferences.smsNotifications"
                              :disabled="!editMode"
                            />
                            <label
                              class="form-check-label"
                              for="smsNotifications"
                            >
                              Receber notificações por SMS
                            </label>
                          </div>
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="pushNotifications"
                              v-model="userPreferences.pushNotifications"
                              :disabled="!editMode"
                            />
                            <label
                              class="form-check-label"
                              for="pushNotifications"
                            >
                              Receber notificações push
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-check mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="newEventsNotification"
                              v-model="userPreferences.notifyNewEvents"
                              :disabled="!editMode"
                            />
                            <label
                              class="form-check-label"
                              for="newEventsNotification"
                            >
                              Novos eventos de interesse
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="promotionsNotification"
                              v-model="userPreferences.notifyPromotions"
                              :disabled="!editMode"
                            />
                            <label
                              class="form-check-label"
                              for="promotionsNotification"
                            >
                              Promoções e descontos
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="reminderNotification"
                              v-model="userPreferences.notifyReminders"
                              :disabled="!editMode"
                            />
                            <label
                              class="form-check-label"
                              for="reminderNotification"
                            >
                              Lembretes de eventos
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mb-4">
                      <label class="form-label">Privacidade</label>
                      <div class="form-check mb-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="publicProfile"
                          v-model="userPreferences.publicProfile"
                          :disabled="!editMode"
                        />
                        <label class="form-check-label" for="publicProfile">
                          Perfil público (outros usuários podem ver seus
                          eventos)
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="shareActivity"
                          v-model="userPreferences.shareActivity"
                          :disabled="!editMode"
                        />
                        <label class="form-check-label" for="shareActivity">
                          Compartilhar atividade nas redes sociais
                        </label>
                      </div>
                    </div>

                    <div v-if="editMode">
                      <button type="submit" class="btn btn-primary">
                        Salvar Preferências
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Security -->
              <div
                v-if="activeTab === 'security'"
                class="card border-0 shadow-sm mb-4"
              >
                <div class="card-header bg-white">
                  <h5 class="card-title mb-0">Segurança</h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent="changePassword">
                    <div class="mb-4">
                      <h6>Alterar Senha</h6>
                      <div class="row g-3">
                        <div class="col-md-12">
                          <label for="currentPassword" class="form-label"
                            >Senha Atual</label
                          >
                          <input
                            type="password"
                            class="form-control"
                            id="currentPassword"
                            v-model="securityForm.currentPassword"
                            :disabled="!editMode"
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="newPassword" class="form-label"
                            >Nova Senha</label
                          >
                          <input
                            type="password"
                            class="form-control"
                            id="newPassword"
                            v-model="securityForm.newPassword"
                            :disabled="!editMode"
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="confirmPassword" class="form-label"
                            >Confirmar Nova Senha</label
                          >
                          <input
                            type="password"
                            class="form-control"
                            id="confirmPassword"
                            v-model="securityForm.confirmPassword"
                            :disabled="!editMode"
                          />
                        </div>
                      </div>
                      <div class="mt-2 small text-muted">
                        A senha deve ter pelo menos 8 caracteres e incluir
                        letras maiúsculas, minúsculas, números e símbolos.
                      </div>
                    </div>

                    <div class="mb-4">
                      <h6>Verificação em Duas Etapas</h6>
                      <div class="form-check form-switch mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="twoFactorAuth"
                          v-model="securityForm.twoFactorEnabled"
                          :disabled="!editMode"
                        />
                        <label class="form-check-label" for="twoFactorAuth">
                          Ativar verificação em duas etapas
                        </label>
                      </div>
                      <p class="small text-muted">
                        A verificação em duas etapas adiciona uma camada extra
                        de segurança à sua conta. Além da senha, você precisará
                        fornecer um código enviado para seu telefone ou email.
                      </p>
                      <button
                        v-if="editMode && securityForm.twoFactorEnabled"
                        type="button"
                        class="btn btn-outline-primary btn-sm"
                      >
                        Configurar Verificação
                      </button>
                    </div>

                    <div class="mb-4">
                      <h6>Sessões Ativas</h6>
                      <div class="list-group mb-3">
                        <div
                          v-for="(session, index) in activeSessions"
                          :key="index"
                          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <div class="d-flex align-items-center">
                              <i
                                :class="`bi ${getDeviceIcon(
                                  session.device
                                )} me-2`"
                              ></i>
                              <div>
                                <div>{{ session.device }}</div>
                                <div class="small text-muted">
                                  {{ session.location }} •
                                  {{ session.lastActive }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            v-if="session.current"
                            class="badge bg-primary border-0"
                          >
                            Sessão Atual
                          </button>
                          <button
                            v-else
                            type="button"
                            class="btn btn-sm btn-outline-danger"
                            @click="terminateSession(index)"
                          >
                            Encerrar
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm"
                        @click="terminateAllSessions"
                      >
                        Encerrar Todas as Sessões
                      </button>
                    </div>

                    <div class="mb-4">
                      <h6>Histórico de Login</h6>
                      <div class="table-responsive">
                        <table class="table table-hover">
                          <thead class="table-light">
                            <tr>
                              <th>Data e Hora</th>
                              <th>Dispositivo</th>
                              <th>Localização</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(login, index) in loginHistory"
                              :key="index"
                            >
                              <td>{{ login.datetime }}</td>
                              <td>{{ login.device }}</td>
                              <td>{{ login.location }}</td>
                              <td>
                                <span
                                  class="badge"
                                  :class="
                                    login.success ? 'bg-success' : 'bg-danger'
                                  "
                                >
                                  {{ login.success ? "Sucesso" : "Falha" }}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div v-if="editMode">
                      <button type="submit" class="btn btn-primary">
                        Salvar Alterações
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="py-5 bg-white border-top">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-3 col-md-6">
            <div class="mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoConecta-SNoUxrSWP8iTB6IvwaQcweuJEgUJxa.png"
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
                <a href="#" class="nav-link p-0 text-muted small"
                  >Criar Evento</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Vender Ingressos</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-muted small"
                  >Ferramentas</a
                >
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
  </div>
</template>

<script>
import ProfileHeader from "../components/HeaderProfileComponents.vue";
export default {
  name: "PerfilUsuario",
  components: {
    ProfileHeader,
  },
  data() {
    return {
      editMode: false,
      activeTab: "personal",
      tabs: [
        { id: "personal", name: "Informações Pessoais", icon: "bi-person" },
        { id: "tickets", name: "Meus Ingressos", icon: "bi-ticket-perforated" },
        {
          id: "history",
          name: "Histórico de Eventos",
          icon: "bi-clock-history",
        },
        { id: "favorites", name: "Favoritos", icon: "bi-heart" },
        { id: "preferences", name: "Preferências", icon: "bi-gear" },
        { id: "security", name: "Segurança", icon: "bi-shield-lock" },
      ],
      user: {
        id: 1,
        name: "Maria Silva",
        email: "maria.silva@email.com",
        phone: "(11) 98765-4321",
        avatar: "https://placehold.co/200x200",
        type: "Cliente",
        memberSince: "15/05/2023",
        eventsAttended: 8,
        favoriteEvents: 12,
        birthdate: "1990-05-15",
        gender: "female",
        cpf: "123.456.789-00",
        address: "Rua das Flores, 123",
        city: "São Paulo",
        state: "SP",
        zipcode: "01234-567",
        profileCompletion: 85,
        emailVerified: true,
        phoneVerified: false,
        preferencesSet: true,
      },
      states: [
        { value: "AC", label: "Acre" },
        { value: "AL", label: "Alagoas" },
        { value: "AP", label: "Amapá" },
        { value: "AM", label: "Amazonas" },
        { value: "BA", label: "Bahia" },
        { value: "CE", label: "Ceará" },
        { value: "DF", label: "Distrito Federal" },
        { value: "ES", label: "Espírito Santo" },
        { value: "GO", label: "Goiás" },
        { value: "MA", label: "Maranhão" },
        { value: "MT", label: "Mato Grosso" },
        { value: "MS", label: "Mato Grosso do Sul" },
        { value: "MG", label: "Minas Gerais" },
        { value: "PA", label: "Pará" },
        { value: "PB", label: "Paraíba" },
        { value: "PR", label: "Paraná" },
        { value: "PE", label: "Pernambuco" },
        { value: "PI", label: "Piauí" },
        { value: "RJ", label: "Rio de Janeiro" },
        { value: "RN", label: "Rio Grande do Norte" },
        { value: "RS", label: "Rio Grande do Sul" },
        { value: "RO", label: "Rondônia" },
        { value: "RR", label: "Roraima" },
        { value: "SC", label: "Santa Catarina" },
        { value: "SP", label: "São Paulo" },
        { value: "SE", label: "Sergipe" },
        { value: "TO", label: "Tocantins" },
      ],
      tickets: [
        {
          id: 1,
          eventName: "Festival de Música Verão 2023",
          eventImage: "https://placehold.co/600x400",
          date: "15-17 Dez 2023",
          location: "Praia de Copacabana, Rio de Janeiro",
          type: "Passaporte - 3 Dias",
          status: "Confirmado",
          code: "FEST2023-12345",
        },
        {
          id: 2,
          eventName: "Show de Rock Nacional",
          eventImage: "https://placehold.co/600x400",
          date: "22 Nov 2023",
          location: "Arena Multiuso, São Paulo",
          type: "Ingresso Inteira",
          status: "Pendente",
          code: "ROCK2023-67890",
        },
      ],
      eventsHistory: [
        {
          id: 1,
          name: "Conferência de Tecnologia",
          image: "https://placehold.co/600x400",
          date: "5-7 Jun 2023",
          location: "Centro de Convenções, Belo Horizonte",
        },
        {
          id: 2,
          name: "Workshop de Fotografia",
          image: "https://placehold.co/600x400",
          date: "18 Abr 2023",
          location: "Galeria de Arte, Curitiba",
        },
        {
          id: 3,
          name: "Peça de Teatro: Hamlet",
          image: "https://placehold.co/600x400",
          date: "10 Mar 2023",
          location: "Teatro Municipal, São Paulo",
        },
      ],
      favoriteEvents: [
        {
          id: 1,
          name: "Festival de Jazz",
          image: "https://placehold.co/600x400",
          date: "10-12 Jan 2024",
          location: "Parque da Cidade, Brasília",
          category: "Festival",
          price: 120.0,
        },
        {
          id: 2,
          name: "Feira Gastronômica",
          image: "https://placehold.co/600x400",
          date: "3-5 Dez 2023",
          location: "Parque Ibirapuera, São Paulo",
          category: "Feira",
          price: 0,
        },
        {
          id: 3,
          name: "Exposição de Arte Moderna",
          image: "https://placehold.co/600x400",
          date: "15 Dez 2023 - 15 Jan 2024",
          location: "Museu de Arte, Rio de Janeiro",
          category: "Exposição",
          price: 30.0,
        },
        {
          id: 4,
          name: "Campeonato de Futebol Amador",
          image: "https://placehold.co/600x400",
          date: "25-26 Nov 2023",
          location: "Estádio Municipal, Salvador",
          category: "Esporte",
          price: 15.0,
        },
      ],
      categories: [
        { id: "show", name: "Shows" },
        { id: "festival", name: "Festivais" },
        { id: "teatro", name: "Teatro" },
        { id: "esporte", name: "Esportes" },
        { id: "workshop", name: "Workshops" },
        { id: "conferencia", name: "Conferências" },
        { id: "feira", name: "Feiras" },
        { id: "exposicao", name: "Exposições" },
        { id: "gastronomia", name: "Gastronomia" },
      ],
      cities: [
        "São Paulo",
        "Rio de Janeiro",
        "Belo Horizonte",
        "Salvador",
        "Brasília",
        "Curitiba",
        "Fortaleza",
        "Recife",
        "Porto Alegre",
      ],
      userPreferences: {
        categories: ["show", "festival", "teatro"],
        preferredCity: "São Paulo",
        showNearbyEvents: true,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        notifyNewEvents: true,
        notifyPromotions: true,
        notifyReminders: true,
        publicProfile: false,
        shareActivity: false,
      },
      securityForm: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactorEnabled: false,
      },
      activeSessions: [
        {
          device: "Windows PC - Chrome",
          location: "São Paulo, Brasil",
          lastActive: "Agora",
          current: true,
        },
        {
          device: "iPhone - Safari",
          location: "São Paulo, Brasil",
          lastActive: "2 horas atrás",
          current: false,
        },
        {
          device: "Android - Chrome",
          location: "Rio de Janeiro, Brasil",
          lastActive: "1 dia atrás",
          current: false,
        },
      ],
      loginHistory: [
        {
          datetime: "08/11/2023 14:30",
          device: "Windows PC - Chrome",
          location: "São Paulo, Brasil",
          success: true,
        },
        {
          datetime: "05/11/2023 09:15",
          device: "iPhone - Safari",
          location: "São Paulo, Brasil",
          success: true,
        },
        {
          datetime: "01/11/2023 18:45",
          device: "Android - Chrome",
          location: "Rio de Janeiro, Brasil",
          success: true,
        },
        {
          datetime: "28/10/2023 22:10",
          device: "Desconhecido",
          location: "Lisboa, Portugal",
          success: false,
        },
      ],
    };
  },
  methods: {
    saveProfile() {
      // Implementar lógica para salvar o perfil
      alert("Perfil salvo com sucesso!");
      this.editMode = false;
    },
    savePreferences() {
      // Implementar lógica para salvar preferências
      alert("Preferências salvas com sucesso!");
      this.editMode = false;
    },
    changePassword() {
      // Implementar lógica para alterar senha
      alert("Senha alterada com sucesso!");
      this.securityForm.currentPassword = "";
      this.securityForm.newPassword = "";
      this.securityForm.confirmPassword = "";
      this.editMode = false;
    },
    getTicketStatusClass(status) {
      switch (status) {
        case "Confirmado":
          return "bg-success";
        case "Pendente":
          return "bg-warning";
        case "Cancelado":
          return "bg-danger";
        default:
          return "bg-secondary";
      }
    },
    getDeviceIcon(device) {
      if (device.includes("Windows") || device.includes("PC")) {
        return "bi-laptop";
      } else if (device.includes("iPhone")) {
        return "bi-phone";
      } else if (device.includes("Android")) {
        return "bi-phone";
      } else {
        return "bi-question-circle";
      }
    },
    terminateSession(index) {
      // Implementar lógica para encerrar sessão
      this.activeSessions.splice(index, 1);
      alert("Sessão encerrada com sucesso!");
    },
    terminateAllSessions() {
      // Implementar lógica para encerrar todas as sessões exceto a atual
      this.activeSessions = this.activeSessions.filter(
        (session) => session.current
      );
      alert("Todas as outras sessões foram encerradas com sucesso!");
    },
  },
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

/* Estilos específicos para a página de perfil */
.list-group-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Estilos para o breadcrumb */
.breadcrumb-item a {
  color: var(--primary-color);
}

.breadcrumb-item.active {
  color: var(--secondary-color);
}

/* Estilos para o cabeçalho do perfil */
.img-thumbnail {
  border: 4px solid rgba(255, 255, 255, 0.3);
}

/* Estilos para os formulários */
.form-control:focus,
.form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.25);
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

/* Estilos para as abas */
.nav-tabs .nav-link.active {
  color: var(--primary-color);
  border-color: #dee2e6 #dee2e6 #fff;
}

.nav-tabs .nav-link:hover {
  border-color: #e9ecef #e9ecef #dee2e6;
}
</style>
