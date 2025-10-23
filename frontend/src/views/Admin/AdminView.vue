<template>
    <div class="min-vh-100 bg-light">
        <AdminComponent />
        <FooterComponents/>
    </div>
</template>
<script>
import FooterComponents from '@/components/Publico/common/FooterComponents.vue';
import AdminComponent from '@/components/Admin/AdminComponent.vue';


export default {
    components:{
        AdminComponent, 
        FooterComponents
    }
}
</script>
<style>
    
</style>