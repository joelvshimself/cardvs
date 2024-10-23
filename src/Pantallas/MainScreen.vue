<template>
    <div>
      <section class="pantalla">
        <div class="text">
          <h2>Find Your Perfect</h2>
          <h3>Credit Card</h3>
          <p>Compare the best credit cards, maximize rewards, and grow your wealth.</p>
          <button @click="takeQuiz" class="custom-button">Take the Quiz</button>
        </div>
        <div class="cards">
          <img src="@/assets/Tarjeta.png" alt="Credit Card" class="credit-card-img" />
        </div>
      </section>
      <InfoSection 
        title="What is CardVersus?"
        description="CardVersus is designed to educate users about the features and benefits of various credit cards. Whether you're just starting with your first credit card or a seasoned financial expert, CardVersus helps you compare and choose the best option for your financial needs."
      />
      <AboutSection />
    </div>
  </template>
  
  <script>
  import InfoSection from '@/components/InfoSection.vue';
  import AboutSection from '@/components/AboutSection.vue';
  
  export default {
    name: 'MainScreen',
    components: {
      InfoSection,
      AboutSection,
    },
    methods: {
      takeQuiz() {
        console.log('Quiz clicked!');
      }
    }
  };
  </script>
  <style>
  .pantalla {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 80px auto;
  }
  
  .text {
    flex: 1;
    text-align: left;
    margin-left: 100px;
  }
  
  .text h2 {
    font-size: 64px;
    color: #ffffff;
    margin-bottom: 0;
  }
  
  .text h3 {
    font-size: 60px;
    background: linear-gradient(45deg, #9130F4, #4646F9);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-top: 0;
  }
  
  .text p {
    font-size: 20px;
    color: #e0e0e0;
  }
  
  .custom-button {
    background: transparent;
    border: 2px solid;
    border-image: linear-gradient(45deg, #12113933, #3A49F9) 1;
    padding: 15px 30px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    border-radius: 10px;
    margin-top: 10px;
    transition: all 0.3s ease;
  }
  
  .custom-button:hover {
    background: linear-gradient(45deg, #12113933, #3A49F9);
    color: white;
  }
  
  .credit-card-img {
    max-width: 100%;
    height: auto;
    border-radius: 15px;
  }
  </style>
  