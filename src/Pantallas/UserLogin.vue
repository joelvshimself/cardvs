<template>
  <div class="login-page">
    <section class="pantalla">
      <div class="text">
        <h2>Log in here</h2>
        <p>Enter your credentials to access your account.</p>
      </div>
      <div class="form-container">
        <form @submit.prevent="login">
          <label>Email:</label>
          <input v-model="user.email" type="email" required />

          <label>Password:</label>
          <input v-model="user.password" type="password" required />

          <button type="submit" class="custom-button">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p>
          Don't have an account?
          <router-link to="/register" class="register-link">Register here</router-link>
        </p>
      </div>
    </section>
    <InfoSection 
      title="Welcome to CardVersus"
      description="Here you can compare and choose the best credit card for your needs."
    />
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import InfoSection from '@/components/InfoSection.vue';

export default {
  name: "UserLogin",
  components: {
    InfoSection
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      const auth = getAuth();
      this.errorMessage = ''; // Reset error message

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        // Successful login
        console.log('Authenticated user:', userCredential.user);
        this.$router.push('/'); // Redirect to the main screen or dashboard
      } catch (error) {
        this.errorMessage = "Error logging in: " + error.message;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  background-color: #f0f4ff; /* Fondo claro que complementa los colores del MainScreen */
  min-height: 115vh; /* Ocupa todo el alto de la pantalla */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra verticalmente */
}

.pantalla {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto; /* Ajuste del margen */
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco con opacidad */
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.text {
  flex: 1;
  text-align: left;
  margin-left: 20px; /* Menos margen para que se vea más limpio */
}

.text h2 {
  font-size: 48px;
  color: #3A49F9; /* Color del título */
  margin-bottom: 10px;
}

.text p {
  font-size: 18px;
  color: #4A4A4A; /* Color gris oscuro */
}

.form-container {
  flex: 1;
  max-width: 400px;
  margin-right: 20px; /* Menos margen */
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #3A49F9; /* Color del borde en foco */
  outline: none;
}

.custom-button {
  width: 100%;
  padding: 10px;
  background-color: #3A49F9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: #2c3e50;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.register-link {
  color: #3A49F9; /* Mismo color que el título */
  text-decoration: underline; /* Subrayar el enlace */
}
</style>



