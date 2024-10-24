import { createRouter, createWebHistory } from 'vue-router';
import MainScreen from '@/Pantallas/MainScreen.vue';
import CardCatalog from '@/Pantallas/CardCatalog.vue';
import ChatbotScreen from '@/Pantallas/ChatbotScreen.vue'; 
import NewsScreen from '@/Pantallas/NewsScreen.vue'; 
import ProfileScreen from '@/Pantallas/PerfilScreen.vue';
import UserRegister from '@/Pantallas/UserRegister.vue';
import UserLogin from '@/Pantallas/UserLogin.vue';
import CardComparador from '@/Pantallas/CardComparador.vue';

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
  },
  {
    path: '/register', // Nueva ruta actualizada
    name: 'UserRegister',
    component: UserRegister
  },
  {
    path: '/login', // Nueva ruta actualizada
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/cardcomparador', // Nueva ruta actualizada
    name: 'CardComparador',
    component: CardComparador
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

