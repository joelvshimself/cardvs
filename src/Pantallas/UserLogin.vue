<template>
  <div>
    <section class="pantalla">
      <div class="text">
        <h2>Iniciar Sesión</h2>
        <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
      </div>
      <div class="form-container">
        <form @submit.prevent="iniciarSesion">
          <label>Correo:</label>
          <input v-model="usuario.correo" type="email" required />

          <label>Contraseña:</label>
          <input v-model="usuario.password" type="password" required />

          <button type="submit">Iniciar Sesión</button>
        </form>
        <p v-if="mensajeError" class="error">{{ mensajeError }}</p>
        <p>¿No tienes una cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
      </div>
    </section>
    <InfoSection 
      title="Bienvenido a CardVersus"
      description="Aquí puedes comparar y elegir la mejor tarjeta de crédito para tus necesidades."
    />
  </div>
</template>

<script>
// Importa Firebase Auth
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import InfoSection from '@/components/InfoSection.vue';

export default {
  name: "UserLogin",
  components: {
    InfoSection
  },
  data() {
    return {
      usuario: {
        correo: '',
        password: ''
      },
      mensajeError: ''
    };
  },
  methods: {
    async iniciarSesion() {
      const auth = getAuth();
      this.mensajeError = ''; // Reiniciar mensaje de error

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.usuario.correo,
          this.usuario.password
        );
        // Inicio de sesión exitoso
        console.log('Usuario autenticado:', userCredential.user);
        this.$router.push('/'); // Redirigir a la pantalla principal o dashboard
      } catch (error) {
        this.mensajeError = "Error al iniciar sesión: " + error.message;
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
  color: #ffffff;
  margin-bottom: 0;
}

.text p {
  font-size: 20px;
  color: #e0e0e0;
}

.form-container {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: 400px;
  margin-right: 100px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3A49F9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2c3e50;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

p {
  text-align: center;
  margin-top: 10px;
  color: #555;
}
</style>
