<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import StatusTile from '@/components/StatusTile.vue';
import GoBackButton from '@/components/GoBackButton.vue';
import RepairCompletionModal from '@/components/RepairCompletionModal.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statuses = [
  { value: 'reception', label: 'En recepción' },
  { value: 'diagnosing', label: 'Diagnóstico' },
  { value: 'in_repair', label: 'En reparación' },
  { value: 'finished', label: 'Finalizada' },
];

const currentStatus = ref('');
const isLoaded      = ref(false);
const isCompletionModalOpen = ref(false);
const pendingStatus        = ref(null);
const loadingCompletion    = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/repair-orders/${id}`);
    currentStatus.value = response.data.status;
  } catch (e) {
    console.error('Error fetching order', e);
    alert('Error al cargar el estado de la orden');
  } finally {
    isLoaded.value = true;
  }
});

const updateStatus = (status) => {
  if (status === 'finished') {
    pendingStatus.value = status;
    isCompletionModalOpen.value = true;
    return;
  }
  sendStatusUpdate({ status });
};

const sendStatusUpdate = async ({ status, sendEmail = false }) => {
  loadingCompletion.value = true;
  try {
    const payload = { status };
    if (status === 'finished') {
      payload.send_completion_email = sendEmail;
    }
    await axios.patch(`${API_BASE_URL}/api/repair-orders/${id}`, payload);
    router.push({ name: 'orders' });
  } catch (e) {
    console.error('Error updating status', e);
    alert('Error al actualizar el estado');
  } finally {
    loadingCompletion.value = false;
    isCompletionModalOpen.value = false;
  }
};

const cancelCompletion = () => {
  isCompletionModalOpen.value = false;
};

const confirmCompletion = (sendEmail) => {
  sendStatusUpdate({ status: pendingStatus.value, sendEmail });
};
</script> 

<template>
  <GoBackButton @click="router.back()">Volver</GoBackButton>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Actualizar Estado de la Orden</h1>
    <div v-if="isLoaded" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <StatusTile
        v-for="status in statuses"
        :key="status.value"
        :label="status.label"
        :active="status.value === currentStatus"
        @click="updateStatus(status.value)"
      />
    </div>
  </div>
  
  <RepairCompletionModal
    v-if="isCompletionModalOpen"
    :loading="loadingCompletion"
    @cancel="cancelCompletion"
    @confirm="confirmCompletion"
  />
</template>