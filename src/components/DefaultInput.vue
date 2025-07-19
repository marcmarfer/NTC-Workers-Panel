<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: 1,
  },
  isTextarea: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(event) {
  emit("update:modelValue", event.target.value);
}

function getInputClasses() {
  return [
    "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
    props.error ? "border-red-500" : "border-gray-300",
    props.readonly ? "bg-gray-50" : "",
  ].join(" ");
}
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <textarea
        v-if="isTextarea"
        :id="id"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
        :required="required"
        :rows="rows"
        :readonly="readonly"
        :class="getInputClasses()"
      ></textarea>

      <input
        v-else
        :id="id"
        :type="type"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
        :required="required"
        :readonly="readonly"
        :class="getInputClasses()"
      />

      <slot name="suffix" />
    </div>

    <div v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</div>
  </div>
</template>