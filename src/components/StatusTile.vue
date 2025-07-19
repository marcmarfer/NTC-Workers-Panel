<template>
  <div
    @click="$emit('click')"
    :class="['p-8 rounded-lg text-center text-xl font-semibold cursor-pointer text-white filter hover:brightness-110']"
    :style="{ background: props.active ? 'linear-gradient(135deg, #f97316, #f59e0b, #d97706, #b45309, #d97706)' : 'linear-gradient(135deg, #ef4444, #dc2626, #b91c1c, #991b1b, #b91c1c)' }">
    {{ props.label }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: String,
  active: Boolean,
});
</script> 