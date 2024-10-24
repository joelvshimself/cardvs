<template>
    <div class="quiz-container">
      <div class="quiz-box">
        <!-- Question and description -->
        <div class="quiz-left">
          <h2>{{ quizzes[currentQuestion].question }}</h2>
          <p v-if="quizzes[currentQuestion].description">{{ quizzes[currentQuestion].description }}</p>
        </div>
  
        <!-- Options and buttons -->
        <div class="quiz-right">
          <!-- Options -->
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
                <p v-if="option.subtext" class="option-subtext">{{ option.subtext }}</p> <!-- Subtext below option -->
              </label>
            </div>
          </div>
  
          <!-- Spending Categories -->
          <div v-if="quizzes[currentQuestion].spendingCategories" class="spending-categories">
            <div v-for="(category, index) in quizzes[currentQuestion].spendingCategories" :key="index" class="category-box">
              <div class="category-header">
                <label>{{ category.label }}</label>
                <input type="number" v-model.number="category.amount" min="0" max="1000" class="category-input" />
              </div>
              <input type="range" v-model="category.amount" min="0" max="1000" class="category-slider" />
            </div>
          </div>
  
          <!-- Total Monthly Credit Card Spending -->
          <div v-if="currentQuestion === quizzes.length - 1" class="total-spending">
            <label>Total Monthly Credit Card Spending</label>
            <span>$ {{ totalSpend }}</span>
          </div>
  
          <!-- Next and Go Back Buttons -->
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
  
      <!-- Notification for Login -->
      <div v-if="showLoginPrompt" class="login-prompt">
        <p>{{ loginMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>

  import { setDoc, doc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { db } from "@/firebase"; // Firebase config
  
  export default {
    data() {
      return {
        currentQuestion: 0, // Number of questions
        selectedAnswer: "", // Store the selected answer
        quizAnswers: [], // Store answers for all questions
        loginMessage: "",
        showLoginPrompt: false,
        quizzes: [
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
              { label: "Apple", amount: 0 },
              { label: "Apple Pay", amount: 0 },
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
      // Total = sum of all categories
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
        // Save the answer for the current question
        if (this.quizzes[this.currentQuestion].spendingCategories) {
          this.quizAnswers[this.currentQuestion] = this.totalSpend;
        } else {
          this.quizAnswers[this.currentQuestion] = this.selectedAnswer;
        }
  
        this.currentQuestion++;
        this.selectedAnswer = ""; // Reset answer for the next 
      },
      previousQuestion() {
        this.currentQuestion--;
        this.selectedAnswer = ""; // Reset answer when go back
      },
      async submitQuiz() {
        const auth = getAuth();
        const user = auth.currentUser; 
  
        if (user) {
          this.showLoginPrompt = true;
  
          try {
            const userId = user.uid;
            await setDoc(doc(db, "quizAnswers", userId), {
              answers: this.quizAnswers,
              totalSpending: this.totalSpend,
              timestamp: new Date(),
              userId: userId
            });
            alert("Quiz answers saved successfully! Thank you for completing the quiz!");
            window.location.href = "/";

          } catch (error) {
            console.error("Error saving quiz answers: ", error);
          }
          setTimeout(() => {
            this.showLoginPrompt = false;
          }, 1000);
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
  </style>