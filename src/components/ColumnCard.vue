<template>
    <router-link :to="link" class="column">
      <h3>{{ title }}</h3>
      <p class="description">{{ description }}</p>
      <img src="@/assets/arrow.png" alt="Arrow" class="arrow-icon" />
    </router-link>
  </template>
  
  <script>
  export default {
    name: 'ColumnCard',
    props: {
      title: String,
      description: String,
      link: String // Nueva prop para la ruta
    }
  };
  </script>
  
  <style scoped>
  .column {
    background-color: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: 300px;
    height: 380px;
    text-align: left;
    cursor: pointer;
    position: relative;
    transition: background 0.3s ease, color 0.3s ease;
    display: block; /* Hace que el router-link actúe como un bloque completo */
    text-decoration: none; /* Eliminar el subrayado del enlace */
  }
  
  .column:hover {
    background: #4646f9;
    color: #ffffff;
  }
  
  .column h3 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #4646f9;
  }
  
  .column:hover h3 {
    color: white;
  }
  
  .description {
    font-size: 18px;
    color: #333;
    text-decoration: none; /* Asegura que el texto no tenga subrayado */
  }
  
  .column:hover .description {
    color: white;
  }
  
  /* Estilos para la imagen de la flecha */
  .arrow-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 45px;
    height: auto;
  }
  </style>
  