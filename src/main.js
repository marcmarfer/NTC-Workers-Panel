import { createApp } from 'vue'
import './style.css'
import axios from 'axios';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
import App from './App.vue'
import router from './router.js';

createApp(App)
  .use(router)
  .mount('#app')
