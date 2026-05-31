<template>
    <section v-if="nosotros" id="nosotros" class="py-12 bg-primary-50 dark:bg-gray-900">
        <UContainer>
            <h2 class="text-3xl font-bold mb-10">
                Nosotros
            </h2>
            <div class="prose prose-blue max-w-none dark:prose-invert prose-headings:font-bold prose-p:my-2 prose-ul:list-disc prose-ul:pl-5"
                v-html="nosotros.content" />
        </UContainer>
    </section>
</template>

<script setup lang="ts">
const { data: nosotros } = await useFetch('/api/about')
</script>