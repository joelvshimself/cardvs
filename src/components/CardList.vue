<template>
  <div class="card-list-container">
    <div class="search-section">
      <h2>Select the cards you’d like to compare</h2>
      <div class="search-box">
        <input
          type="text"
          v-model="searchTerm"
          @keyup.enter="performSearch"
          placeholder="Search card name"
          class="search-input"
        />
        <button @click="performSearch">Search</button>
      </div>
    </div>

    <div v-if="loading">Loading cards...</div>
    <div v-else-if="cards && cards.length === 0">
      <p>No cards found.</p>
    </div>
    <div v-else-if="cards">
      <div class="card-list">
        <CardItem
          v-for="card in paginatedCards"
          :key="card.cardKey"
          :card="card"
        />
      </div>
      <div v-if="totalPages > 1" class="pagination-controls">
        <button @click="prevPage" :disabled="isFirstPage">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="isLastPage">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from './CardItem.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CardList',
  components: {
    CardItem,
  },
  data() {
    return {
      searchTerm: '',
      currentPage: 1,
      cardsPerPage: 3,
    };
  },
  computed: {
    ...mapState(['cards']),
    loading() {
      return this.cards === null;
    },
    totalPages() {
      return this.cards ? Math.ceil(this.cards.length / this.cardsPerPage) : 0;
    },
    paginatedCards() {
      if (!this.cards) return [];
      const start = (this.currentPage - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;
      return this.cards.slice(start, end);
    },
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    ...mapActions(['searchCards']),
    performSearch() {
      if (this.searchTerm.trim() !== '') {
        this.searchCards(this.searchTerm.trim());
        this.currentPage = 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
.card-list-container {
  background-color: #121139; /* Color de fondo aplicado a todo el contenedor */
  padding: 20px;
  border-radius: 1px;
  color: white; /* Color de texto claro */
}

.search-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  width: 300px;
  padding: 8px;
  margin-right: 10px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #369870;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination-controls {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-controls button {
  margin: 0 10px;
}

.pagination-controls span {
  font-size: 1em;
}
</style>
