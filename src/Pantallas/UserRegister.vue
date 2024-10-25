<template>
  <div>
    <section class="pantalla">
      <div class="text">
        <h2>Join Our Community</h2>
        <h3>Register Now</h3>
        <p>Complete the form below to start comparing credit cards and maximizing rewards.</p>
      </div>
      <div class="cards">
        <img src="@/assets/Tarjeta.png" alt="Credit Card" class="credit-card-img" />
      </div>
    </section>

    <InfoSection 
      title="What is CardVersus?"
      description="CardVersus is designed to educate users about the features and benefits of various credit cards. Whether you're just starting with your first credit card or a seasoned financial expert, CardVersus helps you compare and choose the best option for your financial needs."
    />
    
    <form @submit.prevent="registerUser" class="register-form">
      <h2>Register</h2>
      <label>Name:</label>
      <input v-model="newUser.name" type="text" required />

      <label>Email:</label>
      <input v-model="newUser.email" type="email" required />

      <label>Password:</label>
      <input v-model="newUser.password" type="password" required />

      <label>Age:</label>
      <input v-model="newUser.age" type="number" required />

      <button type="submit" class="custom-button">Register</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <button @click="registerWithGoogle" class="google-button">
      <img src="@/assets/google_logo.png" alt="Google Logo" class="google-logo" />
      <span>Register with Google</span>
    </button>

    <AboutSection />
  </div>
</template>

<script>
import InfoSection from '@/components/InfoSection.vue';
import AboutSection from '@/components/AboutSection.vue';

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "UserRegister",
  components: {
    InfoSection,
    AboutSection
  },
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
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.newUser.email,
          this.newUser.password
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: this.newUser.name
        });

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
.pantalla {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
}

.text {
  flex: 1;
  text-align: left;
  margin-left: 100px;
}

.text h2 {
  font-size: 64px;
  color: #3A49F9; /* Color del título */
  margin-bottom: 0;
}

.text h3 {
  font-size: 60px;
  background: linear-gradient(45deg, #9130F4, #4646F9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-top: 0;
}

.text p {
  font-size: 20px;
  color: #e0e0e0;
}

.cards {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.credit-card-img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
}

.register-form {
  background-color: #ffffff; /* Fondo blanco para el formulario */
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
}

.register-form h2 {
  text-align: center;
  color: #3A49F9;
  margin-bottom: 20px;
}

.register-form label {
  display: block;
  margin: 10px 0 5px;
}

.register-form input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.register-form input:focus {
  border-color: #3A49F9; /* Color del borde en foco */
  outline: none;
}

.custom-button {
  background: transparent;
  border: 2px solid;
  border-image: #3A49F9;
  padding: 15px 30px;
  font-size: 18px;
  color: #3A49F9;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.custom-button:hover {
  background:#3A49F9;
  color: white;
}

.google-button {
  background-color: #9130F4;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
}

.google-button:hover {
  background-color: #3A49F9;
}

.google-logo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.google-button span {
  font-size: 16px;
  font-weight: bold;
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
</style>




