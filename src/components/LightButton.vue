<template>
    <button
      :disabled="disabled"
      class="bg-transparent text-gray-800 py-2 px-4 border border-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <slot />
    </button>
</template>
  
<script setup>
  defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
  });
</script>