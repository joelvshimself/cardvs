<template>
    <div class="quiz-container">
      
      <!-- Contenedor del Quiz (se muestra si no se ha enviado) -->
      <div v-if="!quizSubmitted" class="quiz-box">
        <!-- Question and description -->
        <div class="quiz-left">
          <h2>{{ quizzes[currentQuestion].question }}</h2>
          <p v-if="quizzes[currentQuestion].description">{{ quizzes[currentQuestion].description }}</p>
        </div>
  
        <!-- Options and buttons -->
        <div class="quiz-right">
          <!-- Opciones -->
          <div v-if="quizzes[currentQuestion].options" class="options">
            <div
              v-for="(option, index) in quizzes[currentQuestion].options"
              :key="index"
              class="option-box"
              :class="{ 'selected': selectedAnswer === option.text }"
              @click="selectOption(option.text)"
            >
              <label>
                <input
                  type="radio"
                  v-model="selectedAnswer"
                  :value="option.text"
                  style="display: none;" 
                />
                <span>{{ option.icon }} {{ option.text }}</span>
                <p v-if="option.subtext" class="option-subtext">{{ option.subtext }}</p>
              </label>
            </div>
          </div>
  
          <!-- Categorías de Gastos -->
          <div v-if="quizzes[currentQuestion].spendingCategories" class="spending-categories">
            <div v-for="(category, index) in quizzes[currentQuestion].spendingCategories" :key="index" class="category-box">
              <div class="category-header">
                <label>{{ category.label }}</label>
                <input type="number" v-model.number="category.amount" min="0" max="1000" class="category-input" />
              </div>
              <input type="range" v-model="category.amount" min="0" max="1000" class="category-slider" />
            </div>
          </div>
  
          <!-- Gasto Total Mensual en Tarjetas de Crédito -->
          <div v-if="currentQuestion === quizzes.length - 1" class="total-spending">
            <label>Total Monthly Credit Card Spending</label>
            <span>$ {{ totalSpend }}</span>
          </div>
  
          <!-- Botones de Navegación -->
          <div class="button-container">
            <button v-if="currentQuestion > 0" @click="previousQuestion" class="back-button">
              &larr; Go Back
            </button>
            <button v-if="currentQuestion === quizzes.length - 1" @click="submitQuiz" class="next-button">
              Save
            </button>
            <button v-else @click="nextQuestion" class="next-button">Next</button>
          </div>
        </div>
      </div>
  
      <!-- Mensaje de Agradecimiento y Tarjetas Recomendadas (se muestra después del envío) -->
      <div v-else class="thank-you-and-recommendations">
        <div class="thank-you-message">
          <h2>Thank you for answering the quiz!</h2>
        </div>
        
        <!-- Loading Spinner -->
        <div v-if="isLoading" class="loading-spinner">
          Loading your recommended card...
        </div>
        
        <!-- Recommended Cards Section -->
        <div v-if="!isLoading" class="recommended-cards" style="background: lightyellow; padding: 20px;">
          <h2>We Recommend:</h2>
          <div class="cards-container">
            <div v-for="(card, index) in recommendedCards" :key="index" class="card">
              <img :src="card.image" :alt="card.name" class="card-image" />
              <h3>{{ card.name }}</h3>
              <p>Issuer: {{ card.cardIssuer }}</p>
              <p>Annual Fee: ${{ card.annualFee }}</p>
              <a :href="card.cardUrl" target="_blank" class="learn-more">Learn More</a>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Notification for Login -->
      <div v-if="showLoginPrompt" class="login-prompt">
        <p>{{ loginMessage }}</p>
      </div>
  
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { setDoc, doc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { db } from "@/firebase"; // Asegúrate de que la ruta es correcta
  
  export default {
    data() {
      return {
        currentQuestion: 0, // Número de preguntas
        selectedAnswer: "", // Almacenar la respuesta seleccionada
        quizAnswers: [], // Almacenar respuestas de todas las preguntas
        loginMessage: "",
        showLoginPrompt: false,
        recommendedCards: [], // Almacenar las tarjetas recomendadas
        isLoading: false, // Manejar el estado de carga
        quizSubmitted: false, // Nueva propiedad
        quizzes: [
          // Tus preguntas del quiz
          {
            question: "What type of credit card are you looking for?",
            options: [
              { icon: "👤", text: "Personal" },
              { icon: "💼", text: "Business" },
              { icon: "❓", text: "Not sure" }
            ]
          },
          {
            question: "Are you comfortable with having an annual fee on your credit card?",
            options: [
              { icon: "✅", text: "Yes, I don’t mind paying an annual fee" },
              { icon: "❌", text: "No, I prefer no annual fee" },
              { icon: "⚖️", text: "Depends on the rewards" }
            ]
          },
          {
            question: "Do you plan to use your card internationally or care about foreign transaction fees?",
            options: [
              { icon: "🌍", text: "Yes, I want no foreign transaction fees" },
              { icon: "✈️", text: "No, I don’t use my card internationally" }
            ]
          },
          {
            question: "How important is a signup bonus to you?",
            options: [
              { icon: "🎁", text: "Very important" },
              { icon: "📈", text: "Somewhat important" },
              { icon: "🚫", text: "Not important" }
            ]
          },
          {
            question: "Would you prefer a card that waives the annual fee for the first year?",
            options: [
              { icon: "✅", text: "Yes, I want the first-year fee waived" },
              { icon: "❌", text: "No, I don’t mind paying the fee right away" }
            ]
          },
          {
            question: "How would you like to redeem your rewards?",
            options: [
              { icon: "💰", text: "Cash Back" },
              { icon: "✈️", text: "Economy Airfare" },
              { icon: "💼", text: "Business Airfare" },
              { icon: "🏨", text: "Hotels" },
              { icon: "❓", text: "I don't know" },
            ],
          },
          {
            question: "What is your credit score?",
            options: [
              { icon: "💳", text: "Excellent", subtext: "770-850" },
              { icon: "💳", text: "Good", subtext: "670-769" },
              { icon: "💳", text: "Fair", subtext: "600-669" },
              { icon: "💳", text: "Poor", subtext: "Under 600" },
              { icon: "💳", text: "Limited", subtext: "Less than 1 year credit history" },
              { icon: "❓", text: "I don't know" },
            ],
          },
          {
            question: "Do any of the following apply to you?",
            options: [
              { icon: "💼", text: "I own a business", subtext: "And I'm open to a business credit card" },
              { icon: "🎓", text: "I’m a student" },
              { icon: "🚫", text: "None of the above" },
            ],
          },
          {
            question: "Interested in pairing with your current cards?",
            description: "By enabling pairing, we will find you a new card that complements your current cards to maximize total rewards.",
            options: [
              { icon: "✅", text: "Yes", subtext: "I’m open to pairing with my current cards to maximize total rewards" },
              { icon: "❌", text: "No", subtext: "I will use one card for everything" },
            ],
          },
          {
            question: "Are you looking for a good intro offer or long term rewards?",
            description: "The algorithm will calculate rewards value over your desired timeframe.",
            options: [
              { icon: "💳", text: "Good Intro Offer", subtext: "Optimize rewards for the 1st year" },
              { icon: "⚖️", text: "Balanced", subtext: "Optimize rewards over 3 years" },
              { icon: "📅", text: "Long Term Rewards", subtext: "Optimize rewards over 10 years" },
            ],
          },
          {
            question: "Estimate how much you spend monthly.",
            description: "Many cards give big rewards bonuses based on how you spend. Include only spending you would put on a credit card.",
            spendingCategories: [
              { label: "Online Shopping", amount: 0 },
              { label: "Traveling", amount: 0 },
              { label: "Grocery Stores", amount: 0 },
              { label: "Restaurants", amount: 0 },
              { label: "Gas Stations", amount: 0 },
              { label: "Streaming Services", amount: 0 },
              { label: "Other (Non-Category)", amount: 0 },
            ],
          },
        ],
      };
    },
    computed: {
      // Total = suma de todas las categorías
      totalSpend() {
        if (this.quizzes[this.currentQuestion].spendingCategories) {
          return this.quizzes[this.currentQuestion].spendingCategories.reduce(
            (sum, category) => sum + Number(category.amount),
            0
          );
        }
        return 0;
      }
    },
    methods: {
      selectOption(value) {
        this.selectedAnswer = value;
      },
      nextQuestion() {
        // Guardar la respuesta para la pregunta actual
        if (this.quizzes[this.currentQuestion].spendingCategories) {
          this.quizAnswers[this.currentQuestion] = this.totalSpend;
        } else {
          this.quizAnswers[this.currentQuestion] = this.selectedAnswer;
        }
  
        this.currentQuestion++;
        this.selectedAnswer = ""; // Resetear respuesta para la siguiente
      },
      previousQuestion() {
        if (this.currentQuestion > 0) {
          this.currentQuestion--;
          this.selectedAnswer = ""; // Resetear respuesta al regresar
        }
      },
      async submitQuiz() {
        const auth = getAuth();
        const user = auth.currentUser; 
  
        if (user) {
          try {
            const userId = user.uid;
            await setDoc(doc(db, "quizAnswers", userId), {
              answers: this.quizAnswers,
              totalSpending: this.totalSpend,
              timestamp: new Date(),
              userId: userId
            });
  
            // Iniciar estado de carga
            this.isLoading = true;
  
            // Preparar parámetros de consulta basados en quizAnswers
            const params = {
              personalOrBusiness: this.quizAnswers[0],
              annualFeePreference: this.quizAnswers[1],
              internationalUse: this.quizAnswers[2],
              signupBonusImportance: this.quizAnswers[3],
              annualFeeFirstYear: this.quizAnswers[4],
              rewardsRedemption: this.quizAnswers[5],
              creditScore: this.quizAnswers[6],
              additionalInfo: this.quizAnswers[7],
              pairingPreference: this.quizAnswers[8],
              rewardsTimeframe: this.quizAnswers[9],
              totalMonthlySpending: this.quizAnswers[10],
            };
  
            // Logs para depuración
            console.log("API Request Parameters:", params);
            console.log('Clave API:', process.env.VUE_APP_RAPIDAPI_KEY);
            console.log('Host API:', process.env.VUE_APP_RAPIDAPI_HOST);
  
            // Llamada a la API de recomendaciones
            const recommendResponse = await axios.get('https://rewards-credit-card-api.p.rapidapi.com/creditcard-detail-bycard/amex-gold', {
              params: params,
              headers: {
                'X-RapidAPI-Key': process.env.VUE_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.VUE_APP_RAPIDAPI_HOST,
              }
            });
  
            // Log de la respuesta de la API
            console.log("Recommend API Response:", recommendResponse.data);
  
            // Verificar si la respuesta es un array con al menos un elemento
            if (Array.isArray(recommendResponse.data) && recommendResponse.data.length > 0) {
              // Obtener detalles completos para cada tarjeta recomendada
              const detailedCardPromises = recommendResponse.data.map(card => this.fetchCardDetails(card.cardKey));
              const detailedCards = await Promise.all(detailedCardPromises);
  
              // Filtrar cualquier tarjeta que no se haya podido obtener correctamente
              this.recommendedCards = detailedCards.filter(card => card !== null);
            } else if (typeof recommendResponse.data === 'object' && recommendResponse.data.cardKey) {
              // Si la respuesta es un solo objeto con cardKey
              const detailedCard = await this.fetchCardDetails(recommendResponse.data.cardKey);
              if (detailedCard) {
                this.recommendedCards = [detailedCard];
              }
            } else {
              alert("No card recommendation available at this time.");
            }
  
            console.log("recommendedCards length:", this.recommendedCards.length)
  
            // Log para verificar recommendedCards
            console.log("Tarjetas recomendadas:", this.recommendedCards);
  
            // Establecer quizSubmitted en true después de un envío exitoso
            this.quizSubmitted = true;
  
          } catch (error) {
            console.error("Error saving quiz answers or fetching recommended cards:", error);
  
            // Manejo de errores de la API
            if (error.response) {
              console.error("API Error Response:", error.response.data);
              alert(`Error: ${error.response.data.message || "There was an error processing your request. Please try again later."}`);
            } else if (error.request) {
              console.error("No response received from API:", error.request);
              alert("Error: No response received from the recommendation service. Please try again later.");
            } else {
              console.error("Error setting up API request:", error.message);
              alert("Error: Unable to process your request. Please try again later.");
            }
          } finally {
            this.isLoading = false;
            this.showLoginPrompt = false;
            console.log("isLoading:", this.isLoading)
          }
        } else {
          // Manejar el caso donde el usuario no está logueado
          this.loginMessage = "Please log in to save your quiz results.";
          this.showLoginPrompt = true;
        }
      },
  
      async fetchCardDetails(cardKey) {
        // Obtener los detalles de la tarjeta
        const detailsOptions = {
          method: 'GET',
          url: `https://rewards-credit-card-api.p.rapidapi.com/creditcard-detail-bycard/${encodeURIComponent(cardKey)}`,
          headers: {
            'X-RapidAPI-Key': process.env.VUE_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.VUE_APP_RAPIDAPI_HOST
          }
        };
  
        try {
          const detailsResponse = await axios.request(detailsOptions);
          console.log(`Card Details for ${cardKey}:`, detailsResponse.data);
  
          // Manejar si la respuesta es un array o un objeto
          const data = Array.isArray(detailsResponse.data) ? detailsResponse.data[0] : detailsResponse.data;
  
          console.log('Parsed Data:', data);
  
          // Verificar que los datos necesarios estén presentes
          if (data && data.cardName && data.cardUrl) {
            // Obtener la imagen de la tarjeta
            const imageOptions = {
              method: 'GET',
              url: `https://rewards-credit-card-api.p.rapidapi.com/creditcard-card-image/${encodeURIComponent(cardKey)}`,
              headers: {
                'X-RapidAPI-Key': process.env.VUE_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.VUE_APP_RAPIDAPI_HOST
              }
            };
  
            try {
              const imageResponse = await axios.request(imageOptions);
              const imageData = imageResponse.data[0];
              const imageUrl = imageData.cardImageUrl;
  
              // Corregir cardUrl si está mal formado
              let cardUrl = data.cardUrl;
              if (cardUrl.includes('-image: ')) {
                cardUrl = cardUrl.split('-image: ')[0].trim();
                console.warn(`cardUrl estaba mal formado. Se ha corregido a: ${cardUrl}`);
              }
  
              if (imageUrl) {
                return {
                  name: data.cardName,
                  cardIssuer: data.cardIssuer,
                  annualFee: data.annualFee,
                  image: imageUrl,
                  cardUrl: cardUrl,
                };
              } else {
                console.warn(`No image URL found for cardKey: ${cardKey}. Using placeholder.`);
                return {
                  name: data.cardName,
                  cardIssuer: data.cardIssuer,
                  annualFee: data.annualFee,
                  image: '/assets/placeholder_card.png',
                  cardUrl: cardUrl,
                };
              }
            } catch (imageError) {
              console.error(`Error fetching image for cardKey ${cardKey}:`, imageError);
              // Corregir cardUrl en caso de error al obtener la imagen
              let cardUrl = data.cardUrl;
              if (cardUrl.includes('-image: ')) {
                cardUrl = cardUrl.split('-image: ')[0].trim();
                console.warn(`cardUrl estaba mal formado. Se ha corregido a: ${cardUrl}`);
              }
              return {
                name: data.cardName,
                cardIssuer: data.cardIssuer,
                annualFee: data.annualFee,
                image: '/assets/placeholder_card.png',
                cardUrl: cardUrl,
              };
            }
          } else {
            console.warn(`Incomplete data for cardKey: ${cardKey}`);
            return null;
          }
        } catch (error) {
          console.error(`Error fetching details for cardKey ${cardKey}:`, error);
          return null;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .quiz-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
  }
  
  .quiz-box {
    display: flex;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 800px;
    justify-content: space-between;
    margin: 40px;
  }
  
  .quiz-left {
    flex: 1;
    padding-right: 20px;
  }
  
  .quiz-right {
    flex: 1;
  }
  
  .option-box {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer; 
  }
  
  .option-box:hover {
    background-color: #e0e0e0; 
  }
  
  .option-box.selected {
    background-color: #e0e0e0; 
  }
  
  .option-subtext {
    color: gray;
    font-size: 0.85em;
    margin-top: 5px;
  }
  
  .spending-categories {
    margin-top: 20px;
  }
  
  .category-box {
    background-color: #f5f5ff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .category-box label {
    margin-right: 10px;
    color: black;
  }
  
  .category-input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    background-color: #e0e0ff;
    width: 80px;
  }
  
  .category-slider {
    width: 100%; 
    height: 6px; 
    -webkit-appearance: none;
    background: #ccc; 
    border-radius: 5px;
    outline: none;
  }
  
  .category-slider::-webkit-slider-thumb {
    -webkit-appearance: none; 
    appearance: none;
    width: 16px; 
    height: 16px; 
    border-radius: 50%;
    background: #ff4d4d; 
    cursor: pointer; 
  }
  
  .category-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ff4d4d;
    cursor: pointer;
  }
  
  .category-slider::-ms-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ff4d4d;
    cursor: pointer;
  }
  
  .total-spending {
    margin-top: 20px;
    font-weight: bold;
    color: black;
    text-align: center; 
    display: flex;
    justify-content: center; 
    align-items: center; 
  }
  
  .total-spending span {
    margin-left: 8px; 
  }
  
  .button-container {
    display: flex;
    justify-content: space-between; 
    width: 100%;
  }
  
  .next-button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .next-button:hover {
    background-color: gray;
  }
  
  .back-button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .back-button:hover {
    background-color: gray;
  }
  
  .login-prompt {
    position: fixed;
    top: 20px;
    background-color: #ffdddd;
    padding: 10px 20px;
    border: 1px solid #ff5c5c;
    border-radius: 5px;
  }
  
  .loading-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    color: #333;
  }
  
  .recommended-cards {
    margin-top: 40px;
    text-align: center;
    width: 100%;
  }
  
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .card {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    text-align: center;
  }
  
  .card-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 15px;
  }
  
  .learn-more {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    text-decoration: none;
  }
  
  .learn-more:hover {
    background-color: #0056b3;
  }
  
  .thank-you-message {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .thank-you-message h2 {
    color: white;
  }
  </style>
  
  