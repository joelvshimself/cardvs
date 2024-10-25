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
      
      <!-- Botón para cambiar el nombre de usuario -->
      <div class="edit-name-section">
        <input v-model="newDisplayName" placeholder="New username" />
        <button @click="updateDisplayName" class="change-name-button">Change Name</button>
      </div>

      <!-- Botón para eliminar la cuenta -->
      <div class="delete-account-section">
        <button @click="deleteAccount" class="delete-account-button">Delete Account</button>
      </div>

      <!-- Botón para cerrar sesión -->
      <div class="logout-section">
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut, deleteUser, updateProfile } from "firebase/auth";
import InfoSection from '@/components/InfoSection.vue';

export default {
  name: 'PerfilScreen',
  components: {
    InfoSection
  },
  data() {
    return {
      user: null,
      newDisplayName: ''
    };
  },
  created() {
    const auth = getAuth();
    this.user = auth.currentUser;
  },
  methods: {
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.$router.push('/login');
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    async updateDisplayName() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (this.newDisplayName.trim() === '') {
        alert('Please enter a valid name');
        return;
      }
      try {
        await updateProfile(user, { displayName: this.newDisplayName });
        this.user.displayName = this.newDisplayName;
        alert('Username updated successfully');
        this.newDisplayName = '';
      } catch (error) {
        console.error("Error updating username:", error);
        alert('Failed to update username');
      }
    },
    async deleteAccount() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        try {
          await deleteUser(user);
          alert('Account deleted successfully');
          this.$router.push('/login');
        } catch (error) {
          console.error("Error deleting account:", error);
          alert('Failed to delete account. Please log in again and try.');
        }
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
  background-color: #f0f4ff; 
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

.edit-name-section {
  margin: 15px 0;
}

input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.change-name-button, .delete-account-button, .logout-button {
  background-color: #3A49F9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.change-name-button:hover, .delete-account-button:hover, .logout-button:hover {
  background-color: #2c3e50;
}

.delete-account-button {
  background-color: #FF4D4D;
}

.delete-account-button:hover {
  background-color: #e64545;
}

.delete-account-section {
  margin-top: 20px; 
}

.logout-section {
  margin-top: 40px; 
}

.logout-button {
  background-color: #2E8B57;
}
</style>


  
