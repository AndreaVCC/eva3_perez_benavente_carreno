<template>
    <section id="servicios" class="py-16">
        <UContainer class="max-w-6xl">
            <div class="text-center mb-10">
                <UBadge color="primary" variant="soft" class="mb-3">
                    <UIcon name="i-lucide-layout-grid" class="w-4 h-4 text-primary" /> Servicios
                </UBadge>

                <h2 class="text-3xl font-bold">
                    Soluciones para emprendedores
                </h2>
            </div>

            <div v-if="pendingServices" class="text-center text-gray-500 py-8">
                Cargando servicios...
            </div>

            <div v-else-if="errorServices" class="text-center text-red-500 py-8">
                Ocurrió un error al cargar los servicios.
            </div>

            <UCarousel v-else v-slot="{ item }" :items="services || []"
                :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 flex' }" :options="{ align: 'start', loop: true }"
                arrows class="w-full mx-auto">
                <div class="p-4 w-full h-full">
                    <ServiceCard :key="item.id" :service="item" />
                </div>
            </UCarousel>

        </UContainer>
    </section>
</template>

<script setup lang="ts">
interface Servicio {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
}

const { data: services, pending: pendingServices, error: errorServices } = await useFetch<Servicio[]>('/api/services', {
    lazy: true
})
</script>