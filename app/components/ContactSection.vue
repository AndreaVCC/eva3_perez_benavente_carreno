<template>
    <section id="contacto"
        class="py-20 bg-gradient-to-t from-primary via-primary/10 to-gray-50 dark:from-primary-950 dark:via-gray-900 dark:to-gray-900">
        <UContainer>
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-10">
                    <UBadge color="primary" variant="soft" class="mb-3">
                        <UIcon name="i-lucide-mail" class="w-4 h-4 text-primary" /> Contacto
                    </UBadge>

                    <h2 class="text-3xl font-bold dark:text-white"> Conversemos sobre tu negocio
                    </h2>

                    <p class="text-gray-600 dark:text-gray-400 mt-3"> Completa el formulario y un asesor del Centro de
                        Negocios se pondrá en contacto contigo.
                    </p>
                </div>

                <UCard
                    class="bg-white dark:bg-gray-800 overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 rounded-2xl shadow-xl">
                    <form @submit.prevent="submitForm" class="p-2 sm:p-6">

                        <input type="text" v-model="form._honeypot" class="hidden" tabindex="-1" autocomplete="off" />

                        <div class="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2">

                            <UFormField label="Nombre completo" :error="errors.nombre" class="sm:col-span-1">
                                <UInput v-model="form.nombre" size="xl" placeholder="Ej: María González"
                                    class="w-full rounded-lg" />
                            </UFormField>

                            <UFormField label="Correo electrónico" :error="errors.email" class="sm:col-span-1">
                                <UInput v-model="form.email" type="email" size="xl" placeholder="ejemplo@correo.com"
                                    class="w-full rounded-lg" />
                            </UFormField>

                            <UFormField label="Servicio de interés" :error="errors.servicio" class="sm:col-span-2">
                                <USelect v-model="form.servicio" :items="serviceOptions" size="xl"
                                    placeholder="Selecciona el servicio que necesitas" class="w-full rounded-lg" />
                            </UFormField>

                            <UFormField label="Mensaje" :error="errors.mensaje" class="sm:col-span-2">
                                <UTextarea v-model="form.mensaje"
                                    placeholder="Cuéntanos un poco más sobre tu emprendimiento y qué tipo de ayuda buscas..."
                                    :rows="5" size="lg" class="w-full rounded-lg" />
                            </UFormField>

                        </div>

                        <div class="mt-6">
                            <UFormField :error="errors.aceptarTerminos">
                                <UCheckbox v-model="form.aceptarTerminos"
                                    label="Acepto la política de privacidad y autorizo el tratamiento de mis datos personales." />
                            </UFormField>
                        </div>

                        <div class="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            <UButton type="submit" color="primary" size="xl"
                                class="w-full sm:w-auto px-8 font-semibold transition-all duration-200 hover:scale-[1.02]">
                                Enviar solicitud de contacto
                            </UButton>
                        </div>

                    </form>
                </UCard>
            </div>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { z } from 'zod'
const route = useRoute()

interface Servicio {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
}

const { data: servicesData } = await useFetch<Servicio[]>('/api/services')

const form = reactive({
    nombre: '',
    email: '',
    servicio: '',
    mensaje: '',
    aceptarTerminos: false,
    _honeypot: ''
})
const errors = ref<Record<string, string>>({})

onMounted(() => {
    if (route.query.servicio) {
        form.servicio = route.query.servicio.toString()
    }
})

watch(
    form,
    () => {
        if (Object.keys(errors.value).length > 0) {
            const result = contactSchema.safeParse(form)

            if (result.success) {
                errors.value = {}
            } else {
                const erroresActuales: Record<string, string> = {}
                result.error.issues.forEach((e) => {
                    if (e.path[0]) erroresActuales[e.path[0].toString()] = e.message
                })

                Object.keys(errors.value).forEach((campo) => {
                    if (!erroresActuales[campo]) {
                        delete errors.value[campo]
                    }
                })
            }
        }
    },
    { deep: true }
)

watch(
    () => route.query.servicio,
    (newServicio) => {
        if (newServicio) {
            form.servicio = newServicio.toString()
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
        }
    },
    { immediate: true }
)



const contactSchema = z.object({
    nombre: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    email: z.string().email({ message: 'Debes ingresar un correo electrónico válido' }),
    servicio: z.string().min(1, { message: 'Debes seleccionar un servicio' }),
    mensaje: z.string().min(10, { message: 'El mensaje debe ser más descriptivo (mínimo 10 caracteres)' }),
    aceptarTerminos: z.boolean().refine((val) => val === true, {
        message: 'Debes aceptar las políticas de privacidad para continuar'
    })
})



const serviceOptions = computed(() => {
    if (!servicesData.value) return []

    return servicesData.value.map(service => ({
        label: service.title,
        value: service.id.toString()
    }))
})

const submitForm = async () => {
    errors.value = {}

    if (form._honeypot !== '') {
        console.warn('Bot detectado y bloqueado.')
        return
    }

    const result = contactSchema.safeParse(form)

    if (!result.success) {
        result.error.issues.forEach((e) => {
            if (e.path[0]) {
                errors.value[e.path[0].toString()] = e.message
            }
        })
        return
    }

    console.log('Formulario válido, enviando a API:', result.data)
    alert('¡Solicitud enviada con éxito!')

    form.nombre = ''
    form.email = ''
    form.servicio = ''
    form.mensaje = ''
    form.aceptarTerminos = false
}


</script>