<template>
  <div class="register-page">
    <div class="spacer"></div> <!-- Spacer añadido -->
    <div class="register-container">
      <div class="left-section">
        <h2>Join Our Community</h2>
        <p class="subtitle">Complete the form below to start comparing credit cards and maximizing rewards.</p>
        <form @submit.prevent="registerUser" class="register-form">
          <label>Name</label>
          <input v-model="newUser.name" type="text" placeholder="Enter your name" required />

          <label>Email</label>
          <input v-model="newUser.email" type="email" placeholder="name@mail.com" required />

          <label>Password</label>
          <input v-model="newUser.password" type="password" placeholder="••••••••" required />

          <label>Age</label>
          <input v-model="newUser.age" type="number" placeholder="Your age" required />

          <button type="submit" class="custom-button">Register</button>
        </form>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button @click="registerWithGoogle" class="google-button">
          <img src="@/assets/google_logo.png" alt="Google Logo" class="google-logo" />
          <span>Register with Google</span>
        </button>

        <p class="login-link">
          Already have an account?
          <router-link to="/login">Log in here</router-link>
        </p>
      </div>

      <div class="right-section">
        <!-- Aquí está la sección derecha con el fondo de color -->
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "UserRegister",
  data() {
    return {
      newUser: {
        name: '',
        email: '',
        password: '',
        age: 0
      },
      errorMessage: ''
    };
  },
  methods: {
    async registerUser() {
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.newUser.email, this.newUser.password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: this.newUser.name });

        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: this.newUser.name,
          email: this.newUser.email,
          age: this.newUser.age
        });

        this.$router.push('/profile');
      } catch (error) {
        this.errorMessage = "Error registering user: " + error.message;
      }
    },
    async registerWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Guarda los datos del usuario en Firestore
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          email: user.email
        });

        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = "Error with Google registration: " + error.message;
      }
    }
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121139;
}

.spacer {
  height: 50px; /* Espacio entre el header y el contenido */
}

.register-container {
  display: flex;
  width: 90%;
  max-width: 1200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  margin-top: 90px;
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

.subtitle {
  font-size: 16px; 
  color: #4A4A4A;
  margin-top: 10px; /* Ajuste del espacio entre el título y el subtítulo */
  margin-bottom: 20px;
}

.register-form {
  margin-top: 20px;
}

.register-form label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.register-form input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.register-form input:focus {
  border-color: #3A49F9;
}

.custom-button {
  width: 100%;
  padding: 12px;
  background-color: #3A49F9;
  color: #fff;
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
  padding: 10px;
  border: 1px solid red;
  border-radius: 5px;
  background-color: rgba(255, 0, 0, 0.1); /* Fondo para mensajes de error */
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

.login-link {
  margin-top: 20px;
  text-align: center;
}

.login-link a {
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
