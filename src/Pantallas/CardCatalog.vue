<template>
    <div>
      <InfoSection 
        title="Card Catalog" 
        description="Browse through a vast collection of available credit cards. Explore cashback rewards, travel perks, and interest rates to find the card that best matches your needs."
        class="spaced-section" 
      />
      <CardComparison />
    <CardList />
    </div>
  </template>
  
  <script>
  import InfoSection from '@/components/InfoSection.vue';
  import CardList from '@/components/CardList.vue';
  import CardComparison from '@/components/CardComparison.vue';
  
  export default {
    name: 'CardCatalogScreen',
    components: {
      InfoSection,
      CardList,
      CardComparison,
    }
  };
  </script>
  
  <style scoped>
  .spaced-section {
    margin-top: 50px; 
  }
  </style>
  