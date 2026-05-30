<template>
  <header class="sticky top-0 z-50 flex flex-col w-full">

    <!-- BARRA PRINCIPAL -->
    <div class="border-b border-gray-200/70 bg-white/85 backdrop-blur-md dark:border-gray-800/70 dark:bg-gray-950/85">
      <UContainer class="h-16 flex items-center justify-between gap-4">

        <NuxtLink to="/#inicio" class="flex items-center gap-2">
          <NuxtImg src="../../images/logos/cropped-logo-cdn-2021.png" alt="Logo Centro de Negocios" class="h-10 w-auto"
            format="webp" />
        </NuxtLink>

        <nav class="hidden lg:flex items-center justify-center flex-1">
          <UNavigationMenu :items="items" variant="link" :ui="{
            list: 'gap-1',
            link: 'text-sm font-medium px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800'
          }" />
        </nav>

        <div class="flex items-center gap-2">
          <UColorModeButton variant="ghost" color="neutral" />

          <UButton to="/#contacto" label="Contáctanos" size="sm" color="primary"
            class="hidden sm:inline-flex rounded-full" />

          <UButton icon="i-lucide-menu" variant="ghost" color="neutral" class="lg:hidden" aria-label="Abrir menú"
            @click="isOpen = true" />
        </div>
      </UContainer>
    </div>

  </header>

  <!-- MENÚ MÓVIL -->
  <USlideover v-model:open="isOpen" title="Menú">
    <template #body>
      <nav class="flex flex-col gap-2">
        <UButton v-for="item in items" :key="item.label" :to="item.to" :icon="item.icon" :label="item.label"
          variant="ghost" color="neutral" block class="justify-start" @click="isOpen = false" />

        <USeparator class="my-3" />

        <UButton to="/#contacto" label="Contáctanos" icon="i-lucide-mail" color="primary" block
          @click="isOpen = false" />
      </nav>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const isOpen = ref(false)
const route = useRoute()

const items = [
  { label: 'Inicio', to: '/#inicio', icon: 'i-lucide-home' },
  { label: 'Nosotros', to: '/#nosotros', icon: 'i-lucide-users' },
  { label: 'Servicios', to: '/#servicios', icon: 'i-lucide-layout-grid' },
  { label: 'Testimonios', to: '/#testimonios', icon: 'i-lucide-star' },
  { label: 'FAQ', to: '/#faq', icon: 'i-lucide-help-circle' }
]
</script>