<template>
    <div class="min-vh-100 bg-light">
        
        <AdminComponent />
        <FooterComponents/>
    </div>
</template>
<script>
import FooterComponents from '@/components/Publico/FooterComponents.vue';
import AdminComponent from '@/components/admin/AdminComponent.vue';


export default {
    components:{
        AdminComponent, 
        FooterComponents
    }
}
</script>
<style>
    
</style>