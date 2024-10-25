<template>
  <div class="card-item">
    <img
      v-if="cardImageUrl"
      :src="cardImageUrl"
      :alt="card.cardName"
      class="card-image"
      @error="handleImageError"
      loading="lazy"
    />
    <div v-else class="image-placeholder">
      Loading image...
    </div>
    <h3>{{ card.cardName }}</h3>
    <p><strong>Issuer:</strong> {{ card.cardIssuer || 'N/A' }}</p>
    <p><strong>Annual Fee:</strong> ${{ typeof card.annualFee === 'number' ? card.annualFee : 'N/A' }}</p>
    <button @click="toggleComparison">
      {{ isSelected ? 'Remove from Comparison' : 'Add to Comparison' }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import placeholderCard from '@/assets/placeholder_card.png';

export default {
  name: 'CardItem',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDetails: false,
      imageError: false,
    };
  },
  computed: {
    ...mapGetters(['comparisonCards', 'getCardImage']),
    isSelected() {
      return this.comparisonCards.some(
        (selectedCard) => selectedCard.cardKey === this.card.cardKey
      );
    },
    cardImageUrl() {
      return this.imageError ? placeholderCard : this.getCardImage(this.card.cardKey);
    },
  },
  methods: {
    ...mapActions(['addCardToComparison', 'removeCardFromComparison', 'fetchCardImage']),
    async toggleComparison() {
      if (this.isSelected) {
        this.removeCardFromComparison(this.card.cardKey);
      } else {
        await this.addCardToComparison(this.card.cardKey);
      }
    },
    handleImageError() {
      this.imageError = true;
    },
  },
  created() {
    if (!this.cardImageUrl) {
      this.fetchCardImage(this.card.cardKey);
    }
  },
};
</script>

<style scoped>
.card-item {
  background-color: white; /* Color de fondo para el item de la tarjeta */
  color: black; /* Color de texto oscuro */
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  text-align: center;
  width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  cursor: pointer;
  background-color: #3A49F9;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #3A49F9;
}
</style>
