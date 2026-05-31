<template>
    <section id="testimonios" class="py-16 bg-primary-500 dark:bg-gray-900" aria-labelledby="titulo-testimonios">
        <UContainer>
            <div class="text-center mb-8">
                <UBadge color="primary" variant="soft" class="mb-3" aria-hidden="true">
                    <UIcon name="i-lucide-star" class="w-4 h-4 text-primary" />
                </UBadge>

                <h2 id="titulo-testimonios" class="text-3xl font-bold text-white">
                    Historias de emprendedores
                </h2>
            </div>

            <UCarousel 
                v-slot="{ item, index }" 
                :items="testimonios" 
                :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
                :autoplay="{ delay: 4000, stopOnInteraction: true }" 
                arrows 
                dots
                role="region"
                aria-roledescription="carousel"
                aria-label="Carrusel de testimonios de clientes"
            >
                <UCard 
                    class="mx-2 h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-white transition-shadow"
                    role="group"
                    aria-roledescription="slide"
                    :aria-label="`Testimonio ${index + 1} de ${testimonios.length}, escrito por ${item.nombre}`"
                    tabindex="0"
                >
                    <p class="text-gray-600 mb-6 flex-1">
                        “{{ item.mensaje }}”
                    </p>

                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-primary-100 rounded-full" aria-hidden="true">
                            <UIcon name="i-lucide-user" class="w-6 h-6 text-primary" />
                        </div>

                        <div>
                            <p class="font-bold">
                                {{ item.nombre }}
                            </p>
                            <p class="text-sm text-gray-500">
                                {{ item.negocio }}
                            </p>
                        </div>
                    </div>
                </UCard>
            </UCarousel>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
const testimonios = [
    {
        nombre: 'María González',
        negocio: 'Emprendimiento de alimentos',
        mensaje: 'El acompañamiento nos ayudó a ordenar nuestras finanzas y mejorar la forma de vender.'
    },
    {
        nombre: 'Carlos Pérez',
        negocio: 'Tienda online',
        mensaje: 'Gracias a las asesorías pudimos fortalecer nuestra presencia digital y llegar a más clientes.'
    },
    {
        nombre: 'Fernanda Rojas',
        negocio: 'Servicios de diseño',
        mensaje: 'Los talleres nos entregaron herramientas prácticas para hacer crecer nuestro negocio.'
    },
    {
        nombre: 'Luis Martínez',
        negocio: 'Comercio local',
        mensaje: 'Recibimos orientación clara para mejorar nuestros procesos y planificar nuevas metas.'
    }
]
</script>