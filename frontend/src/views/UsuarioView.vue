<template>
    <div class="min-vh-100 bg-light">
        <NavBarComponents />
        <PerfilUsuario />
        <FooterComponents/>
    </div>
</template>
<script>
import NavBarComponents from '@/components/Publico/NavBarComponents.vue';
import PerfilUsuario from '@/components/User/UserComponent.vue';
import FooterComponents from '@/components/Publico/FooterComponents.vue';


export default {
    components:{
        PerfilUsuario, 
        FooterComponents,
        NavBarComponents
    }
}
</script>
<style>
    
</style>