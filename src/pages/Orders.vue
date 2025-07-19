<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import OrdersTable from '@/components/OrdersTable.vue';

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

function filteredOrders() {
  return orders.value.filter(o => o.status !== 'finished');
}

const columns = [
  { key: 'id', label: 'ID'},
  { key: 'client.name',                      label: 'Cliente'  },
  { key: 'repairs.0.vehicle.brand.name',     label: 'Marca'    },
  { key: 'repairs.0.vehicle.model.name',     label: 'Modelo'   },
  { key: 'repairs.0.vehicle.plate_number',   label: 'Matrícula'},
  { key: 'status', label: 'Estado'},
];

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
    <button @click="logout" class="bg-red-500 text-white py-2 px-4 ml-4 mt-4 rounded-lg hover:bg-red-700 whitespace-nowrap">
      Cerrar sesión
    </button>
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Órdenes de Reparación</h1>
      <div v-if="loading">Cargando órdenes...</div>
      <div v-else-if="error" style="color: red">{{ error }}</div>
      <div v-else>
        <OrdersTable
          :data="filteredOrders()"
          :columns="columns"
          :items-per-page="10"
        />
      </div>
    </div>
  </div>
</template> 