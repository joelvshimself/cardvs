<template>
    <div>
      <div class="spacer"></div>
      <InfoSection 
        title="Card Comparador" 
        description="Need help choosing the best credit card? Our Comparador can guide you through the options based on your unique preferences. Get personalized recommendations instantly."
      />
    </div>
  </template>
  
  <script>
  import InfoSection from '@/components/InfoSection.vue';
  
  export default {
    name: 'CardComparador',
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
  