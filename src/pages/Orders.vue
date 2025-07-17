<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  router.push({ name: 'login' });
};

const orders = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const resp = await axios.get(`${API_BASE_URL}/api/repair-orders`);
    orders.value = resp.data;
  } catch (e) {
    error.value = 'Error al cargar órdenes';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <button @click="logout" class="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
      Cerrar sesión
    </button>
    <h1>Órdenes</h1>
    <div v-if="loading">Cargando órdenes...</div>
    <div v-else-if="error" style="color: red">{{ error }}</div>
    <ul v-else>
      <li v-for="order in orders" :key="order.id">
        {{ order.id }} - {{ order.client_name || order.customer_name || 'Cliente desconocido' }} - {{ order.status }}
      </li>
    </ul>
  </div>
</template> 