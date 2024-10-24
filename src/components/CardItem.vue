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
      <p><strong>Card Type:</strong> {{ card.cardType || 'N/A' }}</p>
      <p><strong>Annual Fee:</strong> ${{ typeof card.annualFee === 'number' ? card.annualFee : 'N/A' }}</p>
      <p><strong>Foreign Transaction Fee:</strong> ${{ typeof card.fxFee === 'number' ? card.fxFee : 'N/A' }}</p>
      <p><strong>Credit Range:</strong> {{ card.creditRange || 'N/A' }}</p>
      <button @click="toggleComparison">
        {{ isSelected ? 'Remove from Comparison' : 'Add to Comparison' }}
      </button>
      <button @click="toggleDetails">
        {{ showDetails ? 'Hide Details' : 'Show Details' }}
      </button>
      <div v-if="showDetails">
        <!-- Benefits, if available -->
        <p v-if="card.benefit && card.benefit.length > 0"><strong>Benefits:</strong></p>
        <ul v-if="card.benefit && card.benefit.length > 0">
          <li v-for="(benefit, index) in card.benefit" :key="index">
            <strong>{{ benefit.benefitTitle }}:</strong> {{ benefit.benefitDesc }}
          </li>
        </ul>
        <!-- Spend bonus categories, if available -->
        <p v-if="card.spendBonusCategory && card.spendBonusCategory.length > 0"><strong>Spend Bonus Categories:</strong></p>
        <ul v-if="card.spendBonusCategory && card.spendBonusCategory.length > 0">
          <li v-for="(category, index) in card.spendBonusCategory" :key="index">
            <strong>{{ category.spendBonusCategoryName }}:</strong> {{ category.spendBonusDesc }}
          </li>
        </ul>
        <!-- Annual spend descriptions, if available -->
        <p v-if="card.annualSpend && card.annualSpend.length > 0"><strong>Annual Spend Benefits:</strong></p>
        <ul v-if="card.annualSpend && card.annualSpend.length > 0">
          <li v-for="(annualSpend, index) in card.annualSpend" :key="index">
            {{ annualSpend.annualSpendDesc }}
          </li>
        </ul>
      </div>
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
      toggleDetails() {
        this.showDetails = !this.showDetails;
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
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin: 10px;
    text-align: left;
    width: 400px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .card-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
  }
  .image-placeholder {
    width: 100%;
    height: 150px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    border-radius: 4px;
  }
  
  h3 {
    margin: 10px 0 5px 0;
    font-size: 1.2em;
  }
  
  p {
    margin: 5px 0;
    font-size: 0.9em;
  }
  
  button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #369870;
  }
  
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 5px;
  }
  </style>