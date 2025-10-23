<template>
  <div class="min-vh-100 bg-light">
    <NavBarComponents />
    <HomeComponents />
    <CardsComponents />
    <FooterComponents />
  </div>
</template>


<script>
import FooterComponents from '@/components/Publico/common/FooterComponents.vue';
import HomeComponents from '@/components/Publico/Home/HomeComponents.vue';
import CardsComponents from '@/components/Publico/Home/CardsComponents.vue';
import NavBarComponents from '@/components/Publico/common/NavBarComponents.vue';

export default {
  components: {
    NavBarComponents,
    CardsComponents,
    HomeComponents,
    FooterComponents
  },
};


</script>
