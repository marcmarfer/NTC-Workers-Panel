<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import DefaultInput from '@/components/DefaultInput.vue';

const email = ref('');
const password = ref('');
const remember = ref(false);
const processing = ref(false);
const errors = ref({});
const router = useRouter();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const submit = async () => {
  processing.value = true;
  errors.value = {};
  try {
    const resp = await axios.post(`${API_BASE_URL}/api/login`, {
      email: email.value,
      password: password.value,
    });
    const token = resp.data.token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    router.push({ name: 'orders' });
  } catch (e) {
    if (e.response) {
      if (e.response.status === 422) {
        errors.value = e.response.data.errors;
      } else if (e.response.status === 403) {
        errors.value = { general: 'Esa cuenta no es válida para acceder' };
      } else if (e.response.status === 401) {
        errors.value = { general: 'Las credenciales no son validas' };
      } else {
        errors.value = { general: 'Error al iniciar sesión' };
      }
    } else {
      errors.value = { general: 'Error al iniciar sesión' };
    }
  } finally {
    processing.value = false;
    password.value = '';
  }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-96 p-4">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-gray-800">NTC Workers Panel</h1>
                <p class="text-gray-600 mt-2">Inicia sesión en tu cuenta</p>
            </div>

            <div v-if="errors.general" class="mb-4 p-4 bg-red-100 rounded-lg text-red-700 text-sm">
                {{ errors.general }}
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <DefaultInput
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="Email"
                    required
                    :error="errors.email"
                />

                <DefaultInput
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="Contraseña"
                    required
                    :error="errors.password"
                />

                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <input type="checkbox" class="rounded border-gray-300 text-red-600" v-model="remember" />
                        <span class="ml-2 text-sm text-gray-600">Recordarme</span>
                    </label>
                </div>

                <button type="submit"
                    class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    :disabled="processing">
                    {{ processing ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                </button>
            </form>
        </div>
    </div>
</template>