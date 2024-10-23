<template>
    <div>
      <div class="spacer"></div>
      <InfoSection 
        title="News Updates" 
        description="Stay informed with the latest news from the financial world. Get insights on the best times to apply for new credit cards, and learn about exclusive offers and deals."
      />
    </div>
  </template>
  
  <script>
  import InfoSection from '@/components/InfoSection.vue';
  
  export default {
    name: 'NewsScreen',
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
  