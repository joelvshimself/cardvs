<template>
  <div class="news-page">
    <div class="spacer"></div>
    <InfoSection 
      title="News Updates" 
      description="Stay informed with the latest news from the financial world. Get insights on the best times to apply for new credit cards, and learn about exclusive offers and deals."
    />

    <!-- Sección de noticias bancarias -->
    <div class="news-container">
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="loading" class="loading">Loading...</div>
      
      <div v-else class="news-list">
        <div v-for="(article, index) in articles" :key="index" class="news-item">
          <img v-if="article.urlToImage" :src="article.urlToImage" alt="News image" class="news-image"/>
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
          <a :href="article.url" target="_blank" class="read-more">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoSection from '@/components/InfoSection.vue';
import axios from 'axios';

export default {
  name: 'NewsScreen',
  components: {
    InfoSection
  },
  data() {
    return {
      articles: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchBankingNews();
  },
  methods: {
    async fetchBankingNews() {
      const apiKey = 'e68134e0c72b470aaf156ecb142e9fc7'; 
      const url = `https://newsapi.org/v2/top-headlines?category=business&apiKey=${apiKey}`;

      try {
        const response = await axios.get(url);
        
        if (response.data.status === 'ok' && response.data.articles) {
          this.articles = response.data.articles;
        } else {
          this.error = 'No news available at the moment.';
        }
        
        this.loading = false;
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            this.error = 'Invalid API key. Please check your API key and try again.';
          } else if (error.response.status === 429) {
            this.error = 'Too many requests. You have reached your API limit.';
          } else {
            this.error = 'Error fetching the news. Please try again later.';
          }
        } else {
          this.error = 'Network error. Please check your connection.';
        }
        this.loading = false;
      }
    },
  }
};
</script>

<style scoped>
/* Asegurarse de que todo el fondo de la página sea oscuro */
.news-page {
  background-color: #121139;
  min-height: 100vh; /* Asegura que la página cubra toda la ventana */
}

.spacer {
  height: 50px;
}

/* Estilos para las noticias */
.news-container {
  margin: 20px;
  background-color: #121139; /* Fondo oscuro en la sección de noticias */
  padding: 20px;
}

.news-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Mostrar 4 noticias por fila */
  gap: 20px;
}

.news-item {
  background: linear-gradient(145deg, #1e1e3a, #080819);
  padding: 20px;
  border-radius: 15px;
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.news-item h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.news-item p {
  font-size: 14px;
  margin-bottom: 15px;
}

.read-more {
  color: #4d3cff;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.news-image {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.loading {
  color: gray;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}
</style>
