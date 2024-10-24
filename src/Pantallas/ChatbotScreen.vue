<template>
  <div v-if="isLoggedIn" class="chat-container">
    <header class="top-bar"> <!-- Barra superior fija -->
      <h1>Chat</h1>
    </header>
    
    <div class="chat-messages-container">
      <div class="chat-messages" ref="chatMessages">
        <div v-for="(msg, index) in chatHistory" :key="index" class="chat-message" :class="msg.isUser ? 'user-message' : 'bot-message'">
          <p>{{ msg.text }}</p>
        </div>
      </div>
    </div>

    <div class="chat-input-container"> <!-- Entrada de texto fija -->
      <input v-model="question" type="text" placeholder="Ingresa tu mensaje" class="chat-input" @keyup.enter="sendQuestion"/>
      <button @click="sendQuestion" class="send-button">
        <span class="arrow-up">&#8679;</span>
      </button>
    </div>
  </div>
  <div v-else>
    <p>Por favor, inicia sesión para acceder al chat.</p>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      question: '',
      chatHistory: [],
      isLoggedIn: false // Estado para verificar si el usuario está logueado
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true; // Usuario autenticado
      } else {
        this.isLoggedIn = false; // Usuario no autenticado, redirigir a login
        this.$router.push('/login');
      }
    });
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      const chatMessages = this.$refs.chatMessages;
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    },
    async sendQuestion() {
      if (this.question.trim() === '') return;

      this.chatHistory.push({ text: this.question, isUser: true });

      try {
        const res = await fetch('https://apicardvs.onrender.com/api/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question: this.question })
        });
        const data = await res.json();
        this.chatHistory.push({ text: data.response, isUser: false });
      } catch (error) {
        console.error('Error:', error);
        this.chatHistory.push({ text: 'Error sending the request.', isUser: false });
      }

      this.question = '';
    }
  }
};
</script>

<style scoped>
/* Contenedor principal del chat */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(145deg, #1e1e3a, #080819);
  color: white;
}

/* Barra superior fija */
.top-bar {
  background-color: #121212;
  color: white;
  padding: 0px;
  text-align: center;
  font-size: 24px;
}

/* Contenedor de mensajes, que será el área scrolleable */
.chat-messages-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* Estilo para los mensajes */
.chat-messages {
  display: flex;
  flex-direction: column;
}

.chat-message {
  max-width: 70%;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 20px;
  word-wrap: break-word;
  border: 2px solid #4d3cff;
}

.user-message {
  align-self: flex-end;
  background-color: #fff;
  color: #000;
  border-radius: 20px 20px 0 20px;
}

.bot-message {
  align-self: flex-start;
  background-color: transparent;
  border-radius: 20px 20px 20px 0;
}

/* Contenedor de la entrada de texto */
.chat-input-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 30px;
  margin: 20px;
}

.chat-input {
  flex-grow: 1;
  padding: 15px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
  background-color: transparent;
  color: #000;
}

.send-button {
  background-color: #4d3cff;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
}

.send-button:hover {
  background-color: #372cbf;
}

.arrow-up {
  font-size: 24px;
}
</style>

