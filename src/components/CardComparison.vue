<template>
  <div class="comparison-container">
    <h2>Compare Cards</h2>
    <div v-if="selectedCards.length === 0">
      <p>No cards selected for comparison.</p>
    </div>
    <div v-else>
      <!-- Nombres de las tarjetas -->
      <div class="row card-names">
        <div class="attribute"> Name of Card :</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info card-name">
          {{ card.cardName }}
        </div>
      </div>

      <!-- Imágenes de las tarjetas -->
      <div class="row card-images">
        <div class="attribute"> Appearance:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info card-image">
          <img :src="getCardImage(card.cardKey)" alt="Card Image" class="comparison-card-img" />
        </div>
      </div>

      <!-- Atributos y tarjetas -->
      <div class="row">
        <div class="attribute">Issuer:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info">{{ card.cardIssuer || 'N/A' }}</div>
      </div>
      <div class="row">
        <div class="attribute">Card Type:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info">{{ card.cardType || 'N/A' }}</div>
      </div>
      <div class="row">
        <div class="attribute">Annual Fee:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info">
          ${{ typeof card.annualFee === 'number' ? card.annualFee : 'N/A' }}
        </div>
      </div>
      <div class="row">
        <div class="attribute">Foreign Transaction Fee:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info">
          ${{ typeof card.fxFee === 'number' ? card.fxFee : 'N/A' }}
        </div>
      </div>
      <div class="row">
        <div class="attribute">Credit Range:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info">{{ card.creditRange || 'N/A' }}</div>
      </div>
      <div class="row">
        <div class="attribute">Signup Bonus:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info">{{ card.signupBonusDesc || 'N/A' }}</div>
      </div>
      <div class="row">
        <div class="attribute">Benefits:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info">
          <div v-if="card.benefit && card.benefit.length > 0">
            <ul>
              <li v-for="(benefit, index) in card.benefit" :key="index">
                <strong>{{ benefit.benefitTitle }}:</strong> {{ benefit.benefitDesc }}
              </li>
            </ul>
          </div>
          <div v-else>
            N/A
          </div>
        </div>
      </div>
      <div class="row">
        <div class="attribute">Spend Bonus Categories:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info">
          <div v-if="card.spendBonusCategory && card.spendBonusCategory.length > 0">
            <ul>
              <li v-for="(category, index) in card.spendBonusCategory" :key="index">
                <strong>{{ category.spendBonusCategoryName }}:</strong> {{ category.spendBonusDesc }}
              </li>
            </ul>
          </div>
          <div v-else>
            N/A
          </div>
        </div>
      </div>
      <div class="row">
        <div class="attribute">Annual Spend Benefits:</div>
        <div v-for="card in selectedCards" :key="card.cardKey" class="card-info">
          <div v-if="card.annualSpend && card.annualSpend.length > 0">
            <ul>
              <li v-for="(annualSpend, index) in card.annualSpend" :key="index">
                {{ annualSpend.annualSpendDesc }}
              </li>
            </ul>
          </div>
          <div v-else>
            N/A
          </div>
        </div>
      </div>

      <!-- Botón para limpiar comparación -->
      <button @click="clearComparison" class="clear-comparison-button">Clear Comparison</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'CardComparison',
    computed: {
      ...mapGetters(['comparisonCards', 'getCardImage']),
      selectedCards() {
        return this.comparisonCards;
      },
    },
    methods: {
      ...mapActions(['clearComparison']),
    },
  };
</script>

<style scoped>
.comparison-container {
  margin: 0;
  padding: 20px;
  background-color: #121139;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: white;
}

h2 {
  text-align: center;
  color: #fff;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}

.attribute {
  font-weight: bold;
  color: #b39ddb; /* Color morado */
  flex-basis: 25%;
}

.card-info {
  flex-basis: 25%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 3px;
  
}

.card-name {
  font-size: 1.1em;
  font-weight: bold;
  color: #ffffff;
}

.card-image img {
  max-width: 150px;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.clear-comparison-button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.clear-comparison-button:hover {
  background-color: #e60000;
}

/* Responsive Design */
@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .card-info {
    width: 100%;
  }

  .clear-comparison-button {
    width: 100%;
  }
}
</style>
