<template>
    <div>
      <div class="spacer"></div>
      <InfoSection 
        title="Chatbot Assistance" 
        description="Need help choosing the best credit card? Our chatbot can guide you through the options based on your unique preferences. Get personalized recommendations instantly."
      />
    </div>
  </template>
  
  <script>
  import InfoSection from '@/components/InfoSection.vue';
  
  export default {
    name: 'ChatbotScreen',
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
  