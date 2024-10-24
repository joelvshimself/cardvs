<template>
  <header class="fixed-header">
    <h1>CardVersus</h1>
    <nav class="nav-links">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/card-catalog">Card Catalog</router-link></li>
        <li><router-link to="/news">News</router-link></li>
        <!-- Solo muestra "Chatbot" y "Card Comparador" si el usuario está autenticado -->
        <li v-if="isLoggedIn"><router-link to="/chatbot">Chatbot</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/cardcomparador">Card Comparador</router-link></li>
        <!-- Solo muestra el botón de Profile si el usuario está autenticado -->
        <li v-if="isLoggedIn"><router-link to="/profile">Profile</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/login">Login/Register</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      isLoggedIn: false // Controla si el usuario está logueado
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user; // Actualiza el estado en función de si hay un usuario autenticado
    });
  }
};
</script>

<style scoped>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #121139;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}

.fixed-header h1 {
  font-size: 30px;
  color: #fafafa;
  margin: 0;
}

.nav-links ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

.nav-links ul li {
  display: inline-block;
}

.nav-links ul li a {
  color: #fafafa;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

.nav-links ul li a:hover {
  color: #918ef4;
}
</style>


  