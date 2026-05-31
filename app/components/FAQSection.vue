<template>
    <section v-if="faqs && faqs.length > 0" id="faq"
        class="py-16 bg-gradient-to-br from-primary-50 via-gray-50 to-white dark:from-primary-950/30 dark:via-gray-900 dark:to-gray-950">
        <UContainer>
            <div class="text-center mb-10 max-w-2xl mx-auto">
                <UBadge color="primary" variant="soft" class="mb-3">
                    <UIcon name="i-lucide-help-circle" class="w-4 h-4 text-primary" /> FAQ
                </UBadge>

                <h2 class="text-3xl font-bold">
                    Preguntas frecuentes
                </h2>

                <p class="text-gray-600 dark:text-gray-300 mt-3">
                    Resolvemos las dudas más comunes de emprendedores y pymes.
                </p>
            </div>

            <div class="w-full max-w-3xl mx-auto">
                <div v-if="pending" class="text-center text-gray-500 py-8">
                    Cargando preguntas frecuentes...
                </div>

                <div v-else-if="error" class="text-center text-red-500 py-8">
                    Ocurrió un error al cargar la información.
                </div>

                <UAccordion v-else :items="faqs" />
            </div>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
const { data: faqs, pending, error } = await useFetch<{
    label: string
    content: string
}[]>('/api/faqs', {
    lazy: true
})
</script>