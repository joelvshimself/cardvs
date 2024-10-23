<template>
    <section class="info-section">
      <div class="info-card">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'InfoSection',
    props: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  };
  </script>
  <style scoped>
  .info-section {
    width: 100%;
    background-color: #121139; 
    color: white;
    padding: 50px 20px;
    text-align: center;
  }
  
  .info-card {
    background-color: white;
    padding: 50px;
    border-radius: 15px;
    max-width: 1000px;
    margin: 0 auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .info-card h2 {
    font-size: 32px;
    color: #4646f9;
  }
  
  .info-card p {
    font-size: 18px;
    color: #333;
    margin-top: 20px;
  }
  </style>
  