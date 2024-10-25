<template>
    <div class="comparison-container">
      <h2>Compare Cards</h2>
      <div v-if="selectedCards.length === 0">
        <p>No cards selected for comparison.</p>
      </div>
      <div v-else>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th v-for="card in selectedCards" :key="card.cardKey">{{ card.cardName }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Issuer</td>
              <td v-for="card in selectedCards" :key="card.cardKey">{{ card.cardIssuer || 'N/A' }}</td>
            </tr>
            <tr>
              <td>Card Type</td>
              <td v-for="card in selectedCards" :key="card.cardKey">{{ card.cardType|| 'N/A' }}</td>
            </tr>
            <tr>
              <td>Annual Fee</td>
              <td v-for="card in selectedCards" :key="card.cardKey">
                ${{ typeof card.annualFee === 'number' ? card.annualFee : 'N/A' }}
              </td>
            </tr>
            <tr>
              <td>Foreign Transaction Fee</td>
              <td v-for="card in selectedCards" :key="card.cardKey">
                ${{ typeof card.fxFee === 'number' ? card.fxFee : 'N/A' }}
              </td>
            </tr>
            <tr>
              <td>Credit Range</td>
              <td v-for="card in selectedCards" :key="card.creditRange">{{ card.creditRange || 'N/A' }}</td>
            </tr>
            <tr>
              <td>Signup Bonus</td>
              <td v-for="card in selectedCards" :key="card.cardKey">{{ card.signupBonusDesc || 'N/A' }}</td>
            </tr>
            <tr>
              <td>Benefits</td>
              <td v-for="card in selectedCards" :key="card.cardKey">
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
              </td>
            </tr>
            <tr>
              <td>Spend Bonus Categories</td>
              <td v-for="card in selectedCards" :key="card.cardKey">
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
              </td>
            </tr>
            <tr>
              <td>Annual Spend Benefits</td>
              <td v-for="card in selectedCards" :key="card.cardKey">
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
              </td>
            </tr>
            <!-- Add more detailed rows as needed -->
          </tbody>
        </table>
        <button @click="clearComparison" class="clear-comparison-button">Clear Comparison</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'CardComparison',
    computed: {
      ...mapGetters(['comparisonCards']),
      selectedCards() {
        return this.comparisonCards;
      },
    },
    data() {
      return {
        showDetails: true, // State variable to toggle details
      };
    },
    methods: {
      ...mapActions(['removeCardFromComparison', 'clearComparison']),
      toggleDetails() {
        this.showDetails = !this.showDetails;
      },
    },
  };
  </script>
  
  <style scoped>
  .comparison-container {
    margin: 20px 0;
    overflow-x: auto; /* Allows horizontal scrolling on smaller screens */
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto; /* Allows columns to size based on content */
  }
  
  .comparison-table th,
  .comparison-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
  }
  
  .comparison-table th:first-child,
  .comparison-table td:first-child {
    white-space: nowrap; /* Prevents text from wrapping */
    width: 150px; /* Adjust this value as needed to fit the longest attribute */
    background-color: #f4f4f4;
  }
  
  .toggle-details-button {
    padding: 8px 16px;
    cursor: pointer;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    margin-bottom: 10px; /* Space between button and table */
  }
  
  .toggle-details-button:hover {
    background-color: #369870;
  }
  
  .clear-comparison-button {
    padding: 8px 16px;
    cursor: pointer;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    margin-top: 10px; /* Space between table and button */
  }
  
  .clear-comparison-button:hover {
    background-color: #e60000;
  }
  
  /* Responsive Design Enhancements */
  @media (max-width: 768px) {
    .comparison-table th,
    .comparison-table td {
      padding: 8px;
    }
  
    .toggle-details-button,
    .clear-comparison-button {
      width: 100%;
      box-sizing: border-box;
    }
  }
  </style>