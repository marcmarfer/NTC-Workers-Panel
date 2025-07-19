<script setup>
import { ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["row-click"]);

const currentPage = ref(1);

const getTotalItems = () => props.data.length;
const getTotalPages = () => Math.ceil(getTotalItems() / props.itemsPerPage);

const getStartIndex = () => (currentPage.value - 1) * props.itemsPerPage;
const getEndIndex = () => Math.min(getStartIndex() + props.itemsPerPage, getTotalItems());

const getNestedValue = (obj, path) => {
  return path
    .split(".")
    .reduce((current, key) => (current ? current[key] : undefined), obj);
};

const getPaginatedData = () => {
  return props.data.slice(getStartIndex(), getEndIndex());
};

const getDisplayedPages = () => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= getTotalPages(); i++) {
    if (
      i === 1 ||
      i === getTotalPages() ||
      (i >= currentPage.value - delta && i <= currentPage.value + delta)
    ) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < getTotalPages()) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  if (typeof page === "number") {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="min-w-full border-collapse rounded-lg overflow-hidden">
      <thead class="bg-red-500">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            class="px-6 py-3 text-left text-xs text-white font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          @click="emit('row-click', item)"
          v-for="item in getPaginatedData()"
          :key="item.id"
          class="cursor-pointer hover:bg-gray-50 border-b border-gray-200"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-3 whitespace-nowrap text-sm text-gray-900"
          >
            {{
              column.formatter
                ? column.formatter(getNestedValue(item, column.key))
                : getNestedValue(item, column.key)
            }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div
      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    >
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          Anterior
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage >= getTotalPages()"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage >= getTotalPages() }"
        >
          Siguiente
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Mostrando
            <span class="font-medium">{{ getStartIndex() + 1 }}</span>
            a
            <span class="font-medium">{{ getEndIndex() }}</span>
            de
            <span class="font-medium">{{ getTotalItems() }}</span>
            resultados
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            >
              <span class="sr-only">Anterior</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              v-for="page in getDisplayedPages()"
              :key="page"
              @click="goToPage(page)"
              :class="[
                currentPage === page
                  ? 'z-10 bg-gray-50 border-gray-300 text-gray-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage >= getTotalPages()"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage >= getTotalPages() }"
            >
              <span class="sr-only">Siguiente</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
