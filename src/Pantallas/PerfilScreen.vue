<template>
  <div>
    <div class="spacer"></div>
    <InfoSection 
      title="Perfil" 
      description="HOOOOO hola soy German Y te apuesto una manzana a que respiras cada dia"
    />
  </div>
</template>

<script>
import InfoSection from '@/components/InfoSection.vue';

export default {
  name: 'PerfilScreen',
  components: {
    InfoSection
  }
};
</script>

<style scoped>
.spacer {
  height: 50px; 
}
</style>
