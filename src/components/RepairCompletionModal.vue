<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50" @click="$emit('cancel')"></div>
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 z-10 max-h-[80vh] overflow-y-auto overscroll-contain">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Finalizar Reparación</h2>
        <button @click="$emit('cancel')" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p>¿Deseas marcar la reparación como finalizada y enviar el correo de reparación completada?</p>
      <div class="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <LightButton type="button" class="flex-1" @click="$emit('cancel')">No</LightButton>
        <LightButton type="button" class="flex-1" @click="$emit('confirm', false)" :disabled="loading">Finalizar sin correo</LightButton>
        <DarkButton type="button" class="flex-1" @click="$emit('confirm', true)" :disabled="loading">{{ loading ? 'Actualizando...' : 'Finalizar y enviar correo' }}</DarkButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import LightButton from '@/components/LightButton.vue';
import DarkButton from '@/components/DarkButton.vue';

const props = defineProps({
  loading: { type: Boolean, default: false }
});
const emits = defineEmits(['cancel', 'confirm']);
</script> 