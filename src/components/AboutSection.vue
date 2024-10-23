<template>
    <section class="about-section">
      <h2>Discover CardVersus</h2>
      <p>Explore the benefits of comparing credit cards and making informed financial decisions.</p>
  
      <div class="about-columns">
        <ColumnCard 
          title="Card Catalog" 
          description="Browse through a vast collection of available credit cards, each with detailed benefits and drawbacks. Our catalog features a diverse range of cards from cashback rewards to travel perks, low-interest rates to high credit limits. Whether you are looking to maximize your savings, earn more rewards, or build credit, we have the right card to suit your financial goals. Our recommendations are tailored to help you find the card that best matches your spending habits and financial needs."
          link="/card-catalog"  
        />
        <ColumnCard 
          title="News Updates" 
          description="Stay updated with the latest news from the banking world, including exclusive offers, changes in interest rates, and financial trends. Our news section provides insights into the best times to apply for credit cards, how to take advantage of limited-time promotions, and tips on improving your credit score. We keep you informed on the latest developments so you can make timely and strategic decisions when it comes to your financial planning."
          link="/news" 
        />
        <ColumnCard 
          title="Chatbot Assistance" 
          description="Have specific questions? Our chatbot is here to guide you through every step of choosing the best credit card. Whether you're searching for cards with the lowest fees, highest cashback, or the best travel perks, our chatbot tailors its advice to your unique financial situation. Ask about eligibility requirements, how to improve your credit score to qualify for premium cards, or compare the features of different cards on the market. Let us help you make the most informed decision."
          link="/chatbot"  
        />
      </div>
    </section>
  </template>
  
  <script>
  import ColumnCard from '@/components/ColumnCard.vue';
  
  export default {
    name: 'AboutSection',
    components: {
      ColumnCard
    }
  };
  </script>
  
  <style scoped>
  .about-section {
    width: 100%;
    background-color: #121139;
    color: #fff;
    padding: 50px 20px;
    text-align: center;
  }
  
  .about-section h2 {
    font-size: 32px;
    color: #fafafa;
    margin-bottom: 20px;
  }
  
  .about-section p {
    font-size: 18px;
    color: #e0e0e0;
    margin-bottom: 40px;
  }
  
  .about-columns {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
  }
  </style>
  