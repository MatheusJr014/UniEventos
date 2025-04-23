<template>
  <div class="min-vh-100 bg-light">
    <NavBarComponents />
    <HomeComponents />
    <CardsComponents />
    <FooterComponents />
  </div>
</template>


<script>
import FooterComponents from '@/components/Publico/FooterComponents.vue';
import HomeComponents from '@/components/Publico/HomeComponents.vue';
import CardsComponents from '@/components/Publico/CardsComponents.vue';
import NavBarComponents from '@/components/Publico/NavBarComponents.vue';

export default {
  components: {
    NavBarComponents,
    CardsComponents,
    HomeComponents,
    FooterComponents
  },
};


</script>
