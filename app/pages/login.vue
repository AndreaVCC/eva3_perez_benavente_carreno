<template>
  <div class="min-h-[85vh] flex items-center justify-center w-full bg-gradient-to-br from-primary-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-4">
    
    <UCard class="w-full max-w-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800 rounded-2xl">
      
      <template #header>
        <div class="text-center pb-2">
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary flex items-center justify-center rounded-full mx-auto mb-4">
            <UIcon name="i-lucide-shield-check" class="w-8 h-8" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Acceso Administrativo
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Ingresa tus credenciales para gestionar el contenido
          </p>
        </div>
      </template>

      <form @submit.prevent="login" class="space-y-6">
        
        <UFormField label="Usuario">
  <UInput 
    v-model="form.user" 
    size="xl" 
    icon="i-lucide-user" 
    placeholder="Ej: admin" 
    class="w-full"
  />
</UFormField>
        
        <UFormField label="Contraseña">
          <UInput 
            v-model="form.pass" 
            type="password" 
            size="xl" 
            icon="i-lucide-lock" 
            placeholder="••••••••" 
            class="w-full"
          />
        </UFormField>
        
        <div class="pt-2">
          <UButton 
            type="submit" 
            size="xl" 
            block 
            color="primary"
            class="w-full font-bold transition-transform hover:scale-[1.02]"
          >
            Ingresar al panel
          </UButton>
        </div>

      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAuthStore } from '~/stores/auth' 

const form = reactive({ user: '', pass: '' })
const authStore = useAuthStore()

const login = () => {
  if (form.user === 'admin' && form.pass === '1234') {
    authStore.login()
    navigateTo('/admin')
  } else {
    alert('Credenciales incorrectas')
  }
}
</script>