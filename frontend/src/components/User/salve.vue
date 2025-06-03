<template lang="">
    <div>
                <div class="d-flex align-items-center">
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="userDropdown"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://placehold.co/100x100" alt="User Avatar" class="rounded-circle me-2" width="32"
                        height="32">
                    <span class="d-none d-sm-inline">{{ user.name }}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item active" href="#"><i class="bi bi-person me-2"></i>Meu Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-ticket-perforated me-2"></i>Meus Ingressos</a>
                    </li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-heart me-2"></i>Favoritos</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right me-2"></i>Sair</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    categories: [
                { id: 'show', name: 'Shows' },
                { id: 'festival', name: 'Festivais' },
                { id: 'teatro', name: 'Teatro' },
                { id: 'esporte', name: 'Esportes' },
                { id: 'workshop', name: 'Workshops' },
                { id: 'conferencia', name: 'Conferências' },
                { id: 'feira', name: 'Feiras' },
                { id: 'exposicao', name: 'Exposições' },
                { id: 'gastronomia', name: 'Gastronomia' }
            ],
}
</script>
<style lang="">
    
</style>