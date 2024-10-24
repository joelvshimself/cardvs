<template>
  <div v-if="isLoggedIn">
    <div class="spacer"></div>
    <InfoSection 
      title="Card Comparador" 
      description="Need help choosing the best credit card? Our Comparador can guide you through the options based on your unique preferences. Get personalized recommendations instantly."
    />
    <CardComparison />
    <CardList />
  </div>
  <div v-else>
    <p>Please log in to access the Card Comparador.</p>
  </div>
</template>

<script>
import InfoSection from '@/components/InfoSection.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CardList from '@/components/CardList.vue';
import CardComparison from '@/components/CardComparison.vue';

export default {
  name: 'CardComparador',
  components: {
    InfoSection,
    CardList,
    CardComparison,
  },
  data() {
    return {
      isLoggedIn: false // Estado para verificar si el usuario está logueado
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true; // Si el usuario está autenticado
      } else {
        this.isLoggedIn = false; // Si no está autenticado, lo rediriges al login
        this.$router.push('/login');
      }
    });
  }
};
</script>

<style scoped>
.spacer {
  height: 50px; 
}
</style>
