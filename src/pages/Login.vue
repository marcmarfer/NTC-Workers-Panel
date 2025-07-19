<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import DefaultInput from '@/components/DefaultInput.vue';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
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
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    placeholder="Contraseña"
                    required
                    :error="errors.password"
                >
                    <template #suffix>
                        <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.958 9.958 0 012.083-3.23M6.343 6.343A9.955 9.955 0 0112 5c4.45 0 8.219 2.89 9.485 6.843M3 3l18 18"/>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                        </button>
                    </template>
                </DefaultInput>

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