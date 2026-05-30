<template>
  <UCard class="w-full h-full flex flex-col shadow-sm hover:shadow-md transition-shadow" :ui="{
    root: 'h-full flex flex-col',
    body: 'flex-1 flex flex-col p-5'
  }">
    <NuxtImg :src="service.image" :alt="service.title" format="webp" sizes="sm:100vw md:50vw lg:400px"
      class="w-full h-48 object-cover rounded-lg mb-4 shrink-0 bg-gray-100 dark:bg-gray-800" loading="lazy" />

    <UBadge color="primary" variant="soft" class="mb-3 self-start">
      {{ service.category }}
    </UBadge>

    <h3 class="text-xl font-bold mb-2 shrink-0">
      {{ service.title }}
    </h3>

    <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 flex-1 h-12"> {{ service.description }}
    </p>

    <UButton :to="{
      path: '/',
      query: { servicio: service.id },
      hash: '#contacto'
    }" label="Contáctanos" block class="mt-auto shrink-0" />
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  service: {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
  }
}

const props = defineProps<Props>();
</script>