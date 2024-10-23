<template>
  <div>
    <section class="pantalla">
      <div class="text">
        <h2>Registro de Usuarios</h2>
        <p>Completa el formulario a continuación para unirte a nuestra comunidad.</p>
      </div>
      <div class="cards">
        <img src="@/assets/Tarjeta.png" alt="Credit Card" class="credit-card-img" />
      </div>
    </section>

    <InfoSection 
      title="Únete a nosotros"
      description="Al registrarte, podrás acceder a múltiples beneficios y comparar las mejores opciones de tarjetas de crédito."
    />
    
    <form @submit.prevent="registrarUsuario" class="register-form">
      <label>Nombre:</label>
      <input v-model="nuevoUsuario.nombre" type="text" required />

      <label>Correo:</label>
      <input v-model="nuevoUsuario.correo" type="email" required />

      <label>Contraseña:</label>
      <input v-model="nuevoUsuario.password" type="password" required />

      <label>Edad:</label>
      <input v-model="nuevoUsuario.edad" type="number" required />

      <button type="submit" class="custom-button">Registrar</button>
      <p v-if="mensajeError">{{ mensajeError }}</p>
    </form>
  </div>
</template>

<script>
// Importa Firebase Auth y Firestore
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import InfoSection from '@/components/InfoSection.vue';

export default {
  name: "UserRegister",
  components: {
    InfoSection
  },
  data() {
    return {
      nuevoUsuario: {
        nombre: '',
        correo: '',
        password: '',
        edad: 0
      },
      mensajeError: ''
    };
  },
  methods: {
    async registrarUsuario() {
      const auth = getAuth();

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.nuevoUsuario.correo,
          this.nuevoUsuario.password
        );
        const user = userCredential.user;

        await addDoc(collection(db, "usuarios"), {
          uid: user.uid,
          nombre: this.nuevoUsuario.nombre,
          correo: this.nuevoUsuario.correo,
          edad: this.nuevoUsuario.edad
        });

        this.$router.push('/login');
      } catch (error) {
        this.mensajeError = "Error al registrar el usuario: " + error.message;
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
  margin-top: 20px;
}

.register-form label {
  display: block;
  margin: 10px 0 5px;
}

.register-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.custom-button {
  background: transparent;
  border: 2px solid;
  border-image: linear-gradient(45deg, #12113933, #3A49F9) 1;
  padding: 15px 30px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.custom-button:hover {
  background: linear-gradient(45deg, #12113933, #3A49F9);
  color: white;
}
</style>

