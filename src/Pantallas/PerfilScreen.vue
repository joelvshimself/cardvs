<template>
  <div class="perfil-page">
    <div class="spacer"></div>
    <InfoSection 
      title="Profile" 
      description="Your profile information"
    />
    
    <div class="user-info">
      <p><strong>Name:</strong> {{ user.displayName || 'Please set your name in settings' }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>UID:</strong> {{ user.uid }}</p>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import InfoSection from '@/components/InfoSection.vue';

export default {
  name: 'PerfilScreen',
  components: {
    InfoSection
  },
  data() {
    return {
      user: null // Here we will store user information
    };
  },
  created() {
    const auth = getAuth();
    this.user = auth.currentUser; // Get the authenticated user
  },
  methods: {
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.$router.push('/login'); // Redirect the user to the login page
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  }
};
</script>

<style scoped>
.perfil-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f4ff; /* Background similar to other screens */
  min-height: 100vh;
  padding: 20px;
}

.user-info {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: left;
  margin-top: 20px;
}

.user-info p {
  margin: 10px 0;
}

.logout-button {
  background-color: #3A49F9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #2c3e50;
}
</style>

  
