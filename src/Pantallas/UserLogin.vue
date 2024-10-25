<template>
  <div class="login-page">
    <div class="spacer"></div> <!-- Spacer añadido -->
    <div class="login-container">
      <div class="left-section">
        <h2>Hello, <span>welcome!</span></h2>
        <form @submit.prevent="login" class="login-form">
          <label>Email address</label>
          <input v-model="user.email" type="email" placeholder="name@mail.com" required />

          <label>Password</label>
          <input v-model="user.password" type="password" placeholder="••••••••" required />

          <div class="form-options">
            <a href="#">Forgot password?</a> <!-- Eliminado "Remember me" -->
          </div>

          <button type="submit" class="login-button">Login</button>
        </form>

        <button @click="loginWithGoogle" class="google-button">
          <img src="@/assets/google_logo.png" alt="Google Logo" class="google-logo" />
          <span>Log in with Google</span>
        </button>

        <p class="signup-link">
          Don't have an account?
          <router-link to="/register">Sign up</router-link>
        </p>
      </div>

      <div class="right-section">
        <!-- Aquí está la sección derecha con el fondo de color -->
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default {
  name: "UserLogin",
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
      this.errorMessage = ''; 

      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.user.email, this.user.password);
        console.log('Authenticated user:', userCredential.user);
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = "Error logging in: " + error.message;
      }
    },
    async loginWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      this.errorMessage = ''; 

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Logged in with Google:', user);
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = "Error logging in with Google: " + error.message;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121139;
}

.spacer {
  height: 50px; /* Espacio entre el header y el contenido */
}

.login-container {
  display: flex;
  width: 90%;
  max-width: 1200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
}

.left-section {
  flex: 1;
  background-color: #fff;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.left-section h2 {
  font-size: 36px;
  font-weight: bold;
  color: #4646F9;
}

.left-section h2 span {
  color: #9130F4;
}

.login-form {
  margin-top: 20px;
}

.login-form label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.login-form input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.login-form input:focus {
  border-color: #3A49F9;
}

.form-options {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #3A49F9;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #2c3e50;
}

.google-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9130F4;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  margin: 20px 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.google-logo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.google-button:hover {
  background-color: #3A49F9;
}

.signup-link {
  margin-top: 20px;
  text-align: center;
}

.signup-link a {
  color: #3A49F9;
  text-decoration: underline;
}

.right-section {
  flex: 1;
  background: linear-gradient(45deg, #9130F4, #4646F9);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
