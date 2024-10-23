<template>
  <div id="app">
    <FixedHeader />  <!-- Barra fija -->
    <router-view />   <!-- Aquí se mostrarán las pantallas según la ruta -->
    <FooterSection /> <!-- Footer que siempre estará presente -->
  </div>
</template>

<script>
import FixedHeader from './components/FixedHeader.vue';
import FooterSection from './components/FooterSection.vue';

export default {
  name: 'App',
  components: {
    FixedHeader,
    FooterSection
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: #121139; /* Fondo oscuro en todas las pantallas */
}
</style>
