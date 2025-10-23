<template>
    <div class="min-vh-100 bg-light">
        <NavBarComponents />
        <MainComponent />
        <FooterComponents/>
    </div>
</template>
<script>
import NavBarComponents from "@/components/Publico/common/NavBarComponents.vue";
import MainComponent from '@/components/Publico/loginEcadastro/MainComponent.vue';
import FooterComponents from '@/components/Publico/common/FooterComponents.vue';


export default {
    components:{
        MainComponent,
        FooterComponents,
        NavBarComponents
    }
}
</script>
<style>
    
</style>