import { createRouter, createWebHistory } from 'vue-router';
import MainScreen from '@/Pantallas/MainScreen.vue';
import CardCatalog from '@/Pantallas/CardCatalog.vue';
import ChatbotScreen from '@/Pantallas/ChatbotScreen.vue'; 
import NewsScreen from '@/Pantallas/NewsScreen.vue'; 
import ProfileScreen from '@/Pantallas/PerfilScreen.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainScreen
  },
  {
    path: '/card-catalog',
    name: 'CardCatalog',
    component: CardCatalog
  },
  {
    path: '/news',
    name: 'NewsScreen',
    component: NewsScreen
  },
  {
    path: '/chatbot',
    name: 'ChatbotScreen',
    component: ChatbotScreen
  },
  {
    path: '/profile',
    name: 'ProfileScreen',
    component: ProfileScreen
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
