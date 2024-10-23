<template>
    <div>
      <InfoSection 
        title="Card Catalog" 
        description="Browse through a vast collection of available credit cards. Explore cashback rewards, travel perks, and interest rates to find the card that best matches your needs."
        class="spaced-section" 
      />
    </div>
  </template>
  
  <script>
  import InfoSection from '@/components/InfoSection.vue';
  
  export default {
    name: 'CardCatalogScreen',
    components: {
      InfoSection
    }
  };
  </script>
  
  <style scoped>
  .spaced-section {
    margin-top: 50px; 
  }
  </style>
  