<template>
  <div class="perfil-page">
    <div class="spacer"></div>
    <div class="profile-container">
      <div class="left-section">
        <h2>Profile</h2>
        <p class="subtitle">Your profile information</p>

        <div class="user-info">
          <p><strong>Name:</strong> {{ user.displayName || 'Please set your name in settings' }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>UID:</strong> {{ user.uid }}</p>
        </div>

        <!-- Botón para cambiar el nombre de usuario -->
        <div class="edit-name-section">
          <input v-model="newDisplayName" placeholder="New username" />
          <button @click="updateDisplayName" class="custom-button">Change Name</button>
        </div>

        <!-- Botón para cerrar sesión -->
        <div class="logout-section">
          <button @click="logout" class="custom-button logout-button">Logout</button>
        </div>

        <!-- Botón para eliminar la cuenta -->
        <div class="delete-account-section">
          <button @click="deleteAccount" class="custom-button delete-button">Delete Account</button>
        </div>
      </div>

      <div class="right-section">
        <!-- Fondo decorativo a la derecha -->
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut, deleteUser, updateProfile } from "firebase/auth";

export default {
  name: 'PerfilScreen',
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121139;
}

.spacer {
  height: 50px;
}

.profile-container {
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

.subtitle {
  font-size: 16px;
  color: #4A4A4A;
  margin-top: 10px;
  margin-bottom: 20px;
}

.user-info {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: left;
}

.user-info p {
  margin: 10px 0;
}

.edit-name-section {
  margin: 15px 0;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #3A49F9;
  outline: none;
}

.custom-button {
  width: 200px; /* Misma anchura que Delete Account */
  padding: 10px;
  background-color: #3A49F9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: inline-block; /* Asegura que todos los botones mantengan su tamaño */
}

.custom-button:hover {
  background-color: #2c3e50;
}

.logout-button {
  background-color: #2E8B57;
}

.logout-button:hover {
  background-color: #1d6a46;
}

.logout-section {
  margin-top: 10px;
}

.delete-account-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.delete-button {
  background-color: #FF4D4D;
}

.delete-button:hover {
  background-color: #e64545;
}

.right-section {
  flex: 1;
  background: linear-gradient(45deg, #9130F4, #4646F9);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
