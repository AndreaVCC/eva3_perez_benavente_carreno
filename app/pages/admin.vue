<template>
  <UContainer class="py-16 max-w-5xl">
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Panel de Administración
        </h1>
        <p class="text-gray-500 mt-2">
          Gestiona todo el contenido de tu sitio web desde aquí.
        </p>
      </div>

    </div>

    <UTabs :items="tabItems" class="w-full">

      <!-- TAB 1: CATEGORÍAS -->
      <template #categorias>
        <div class="mt-6 space-y-10">

          <UCard class="shadow-sm">
            <template #header>
              <div>
                <h2 class="text-xl font-semibold">Gestión de Categorías</h2>
                <p class="text-sm text-gray-500 mt-1">Crea categorías para luego asignarlas a los servicios.</p>
              </div>
            </template>
            <form @submit.prevent="submitCategoria" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
                <UFormField label="Nueva categoría" required>
                  <UInput v-model="formCategoria.name" placeholder="Ej: Gestión, Marketing, Finanzas" size="lg"
                    class="w-full" />
                </UFormField>
                <UButton type="submit" size="lg" :loading="cargandoCategoria" icon="i-lucide-plus">Agregar</UButton>
              </div>
              <div v-if="mensajeCategoriaExito" class="text-sm text-green-600">{{ mensajeCategoriaExito }}</div>
              <div v-if="mensajeCategoriaError" class="text-sm text-red-600">{{ mensajeCategoriaError }}</div>

              <div class="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categorías actuales:</h3>
                <div v-if="categories?.length" class="flex flex-wrap gap-2">
                  <div v-for="categoria in categories" :key="categoria.id"
                    class="flex items-center gap-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-800">
                    <span>{{ categoria.name }}</span>
                    <button type="button" @click="eliminarCategoria(categoria)"
                      class="text-primary-400 hover:text-red-500 transition-colors ml-1 focus:outline-none"
                      title="Eliminar categoría">
                      <UIcon name="i-lucide-x" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div v-else class="text-sm text-gray-500">Aún no hay categorías registradas.</div>
              </div>
            </form>
          </UCard>

        </div>
      </template>

      <!-- TAB 2: SERVICIOS -->
      <template #servicios>
        <div class="mt-6 space-y-10">

          <UCard class="shadow-sm">
            <template #header>
              <div>
                <h2 class="text-xl font-semibold">Agregar nuevo servicio</h2>
                <p class="text-sm text-gray-500 mt-1">Completa los datos para publicar un nuevo servicio.</p>
              </div>
            </template>
            <form @submit.prevent="submitServicio" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <UFormField label="Título" required>
                  <UInput v-model="form.title" placeholder="Ej: Asesoría legal" size="lg" class="w-full" />
                </UFormField>
                <UFormField label="Categoría" required>
                  <USelect v-model="form.category_id" :items="categoryOptions" placeholder="Selecciona una categoría"
                    size="lg" class="w-full" />
                </UFormField>
              </div>
              <UFormField label="URL de imagen" required class="w-full">
                <UInput v-model="form.image"
                  placeholder="/images/servicios/asesoria.jpg o https://ejemplo.com/imagen.jpg" size="lg"
                  class="w-full" />
              </UFormField>
              <UFormField label="Descripción" required class="w-full">
                <UTextarea v-model="form.description" placeholder="Describe brevemente el servicio..." :rows="5"
                  size="lg" class="w-full" :ui="{ root: 'w-full', base: 'w-full' }" />
              </UFormField>
              <div v-if="mensajeExito" class="text-sm text-green-600">{{ mensajeExito }}</div>
              <div v-if="mensajeError" class="text-sm text-red-600">{{ mensajeError }}</div>
              <div class="flex justify-end">
                <UButton type="submit" size="lg" :loading="cargando">Guardar servicio</UButton>
              </div>
            </form>
          </UCard>

          <!-- Listado servicios -->
          <UCard class="shadow-sm">
            <template #header>
              <h2 class="text-xl font-semibold">Servicios actuales</h2>
            </template>
            <div v-if="services?.length" class="space-y-3">
              <div v-for="s in services" :key="s.id"
                class="flex items-center justify-between gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                <div class="flex items-center gap-4 min-w-0">
                  <img :src="s.image" :alt="s.title" class="w-16 h-16 object-cover rounded-lg border bg-gray-100" />
                  <div class="min-w-0">
                    <p class="font-semibold truncate">{{ s.title }}</p>
                    <p class="text-sm text-gray-500">{{categories?.find(c => c.id === s.category_id)?.name ||
                      'Sincategoría'}}
                    </p>
                    <p class="text-sm text-gray-400 line-clamp-2">{{ s.description }}</p>
                  </div>
                </div>
                <UButton color="error" variant="soft" icon="i-lucide-trash" @click="eliminarServicio(s.id)" />
              </div>
            </div>
            <div v-else class="text-sm text-gray-500 py-6 text-center">No hay servicios registrados.</div>
          </UCard>

        </div>
      </template>

      <!-- TAB 3: PREGUNTAS FRECUENTES (FAQs) -->
      <template #faqs>
        <div class="mt-6 space-y-10">
          <UCard class="shadow-sm">
            <template #header>
              <div>
                <h2 class="text-xl font-semibold">Nueva Pregunta</h2>
                <p class="text-sm text-gray-500 mt-1">Agrega preguntas y respuestas para ayudar a tus clientes.</p>
              </div>
            </template>

            <form @submit.prevent="submitFaq" class="space-y-4">
              <UFormField label="Pregunta" required>
                <UInput v-model="formFaq.label" placeholder="Ej: ¿Los servicios tienen costo?" size="lg"
                  class="w-full" />
              </UFormField>
              <UFormField label="Respuesta" required>
                <UTextarea v-model="formFaq.content" placeholder="Escribe la respuesta aquí..." size="lg"
                  class="w-full" />
              </UFormField>

              <div v-if="mensajeFaqExito" class="text-sm text-green-600">{{ mensajeFaqExito }}</div>
              <div v-if="mensajeFaqError" class="text-sm text-red-600">{{ mensajeFaqError }}</div>

              <UButton type="submit" size="lg" :loading="cargandoFaq" icon="i-lucide-plus">Agregar FAQ</UButton>
            </form>
          </UCard>

          <UCard class="shadow-sm">
            <template #header>
              <h2 class="text-xl font-semibold">Preguntas actuales</h2>
            </template>
            <div v-if="faqs?.length" class="space-y-3">
              <div v-for="f in faqs" :key="f.id"
                class="p-4 border border-gray-200 dark:border-gray-800 rounded-xl flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                <div class="min-w-0 pr-4">
                  <p class="font-bold text-gray-900 dark:text-white">{{ f.label }}</p>
                  <p class="text-sm text-gray-500 mt-1">{{ f.content }}</p>
                </div>
                <UButton color="error" variant="soft" icon="i-lucide-trash" @click="eliminarFaq(f.id)" />
              </div>
            </div>
            <div v-else class="text-sm text-gray-500 py-6 text-center">No hay preguntas registradas.</div>
          </UCard>
        </div>
      </template>
      <template #nosotros>
        <div class="mt-6">
          <UCard class="shadow-sm">
            <template #header>
              <h2 class="text-xl font-semibold">Editar sección "Nosotros"</h2>
            </template>

            <form @submit.prevent="submitNosotros" class="space-y-4">
              <UFormField label="Contenido" required>
                <AboutEditor v-if="formAbout.content !== undefined" v-model="formAbout.content" />
              </UFormField>

              <!-- Mensajes de feedback -->
              <div v-if="mensajeAboutExito" class="text-sm text-green-600">{{ mensajeAboutExito }}</div>
              <div v-if="mensajeAboutError" class="text-sm text-red-600">{{ mensajeAboutError }}</div>

              <UButton type="submit" size="lg" :loading="cargandoAbout">Guardar cambios</UButton>
            </form>
          </UCard>
        </div>
      </template>


    </UTabs>
  </UContainer>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const tabItems = [
  { slot: 'servicios', label: 'Servicios', icon: 'i-lucide-layout-grid' },
  { slot: 'categorias', label: 'Categorías', icon: 'i-lucide-tags' },
  { slot: 'faqs', label: 'Preguntas (FAQ)', icon: 'i-lucide-help-circle' },
  { slot: 'nosotros', label: 'Nosotros', icon: 'i-lucide-building' }
]

interface Service {
  id: number
  title: string
  category_id: number
  image: string
  description: string
}

interface Category {
  id: number
  name: string
}

interface Faq {
  id: number
  label: string
  content: string
}

const { data: services, execute: fetchServices } = await useFetch<Service[]>('/api/services', {
  default: () => []
})
const { data: categories, execute: fetchCategories } = await useFetch<Category[]>('/api/categories', {
  default: () => []
})

const { data: faqs, execute: fetchFaqs } = await useFetch<Faq[]>('/api/faqs', {
  default: () => []
})

const { data: aboutData } = await useFetch('/api/about')


const formCategoria = reactive({ name: '' })
const form = reactive({
  title: '',
  category_id: undefined as number | undefined,
  image: '',
  description: ''
})
const cargando = ref(false)
const cargandoCategoria = ref(false)
const mensajeFaqExito = ref('')
const mensajeFaqError = ref('')
const mensajeExito = ref('')
const mensajeError = ref('')
const mensajeCategoriaExito = ref('')
const mensajeCategoriaError = ref('')
const formFaq = reactive({ label: '', content: '' })
const cargandoFaq = ref(false)

const eliminarFaq = async (id: number) => {
  if (!confirm('¿Seguro que deseas eliminar esta pregunta?')) return
  await $fetch(`/api/faqs/${id}`, { method: 'DELETE' })
  await fetchFaqs()
}

const submitFaq = async () => {
  mensajeFaqExito.value = ''
  mensajeFaqError.value = ''

  const nuevaPregunta = formFaq.label.trim()
  const nuevaRespuesta = formFaq.content.trim()

  if (!nuevaPregunta || !nuevaRespuesta) {
    mensajeFaqError.value = 'Debe completar tanto la pregunta como la respuesta.'
    return
  }

  const existe = faqs.value?.some(
    (f) => f.label.toLowerCase() === nuevaPregunta.toLowerCase()
  )

  if (existe) {
    mensajeFaqError.value = 'Ya existe una pregunta con ese mismo título.'
    return
  }

  cargandoFaq.value = true

  try {
    await $fetch('/api/faqs', {
      method: 'POST',
      body: { label: nuevaPregunta, content: nuevaRespuesta }
    })

    mensajeFaqExito.value = 'La pregunta se ha guardado exitosamente.'
    formFaq.label = ''
    formFaq.content = ''

    await fetchFaqs()
  } catch (error) {
    mensajeFaqError.value = 'Hubo un problema al guardar la pregunta.'
  } finally {
    cargandoFaq.value = false
  }
}
const categoryOptions = computed(() => {
  return categories.value?.map((categoria) => ({
    label: categoria.name,
    value: categoria.id
  })) || []
})

definePageMeta({ middleware: ['auth'] })

const submitCategoria = async () => {
  mensajeCategoriaExito.value = ''
  mensajeCategoriaError.value = ''
  const nuevoNombre = formCategoria.name.trim()

  if (!nuevoNombre) {
    mensajeCategoriaError.value = 'Debe ingresar el nombre de la categoría.'
    return
  }

  const existe = categories.value?.some(c => c.name.toLowerCase() === nuevoNombre.toLowerCase())

  if (existe) {
    mensajeCategoriaError.value = 'Ya existe una categoría con ese nombre.'
    return
  }

  cargandoCategoria.value = true

  try {
    await $fetch('/api/categories', { method: 'POST', body: { name: nuevoNombre } })
    mensajeCategoriaExito.value = 'La categoría se ha creado exitosamente.'
    formCategoria.name = ''
    await fetchCategories()
  } catch (error: any) {
    mensajeCategoriaError.value = error.data?.statusMessage || 'Hubo un problema al crear la categoría.'
  } finally {
    cargandoCategoria.value = false
  }
}

const eliminarCategoria = async (categoria: Category) => {
  const enUso = services.value?.some(s => s.category_id === categoria.id)

  if (enUso) {
    alert(`No puedes eliminar la categoría "${categoria.name}" porque está siendo utilizada por uno o más servicios registrados.`)
    return
  }

  if (!confirm(`¿Estás seguro de eliminar la categoría "${categoria.name}"?`)) return

  try {
    await $fetch(`/api/categories/${categoria.id}`, { method: 'DELETE' })
    await fetchCategories()
  } catch (error: any) {
    alert(error.data?.statusMessage || 'Hubo un error al eliminar la categoría.')
  }
}

const submitServicio = async () => {
  mensajeExito.value = ''
  mensajeError.value = ''

  if (!form.category_id) {
    mensajeError.value = 'Debe seleccionar una categoría.'
    return
  }

  cargando.value = true

  try {
    await $fetch('/api/services', { method: 'POST', body: form })
    mensajeExito.value = 'El servicio se ha publicado exitosamente.'
    form.title = ''
    form.category_id = undefined
    form.image = ''
    form.description = ''
    await fetchServices()
  } catch (error) {
    mensajeError.value = 'Hubo un problema al guardar el servicio.'
  } finally {
    cargando.value = false
  }
}

const eliminarServicio = async (id: number) => {
  if (!confirm('¿Estás seguro de eliminar este servicio?')) return
  try {
    await $fetch(`/api/services/${id}`, { method: 'DELETE' })
    await fetchServices()
  } catch (error) {
    alert('Hubo un error al eliminar el servicio.')
  }
}

const formAbout = reactive({ content: '' })
const cargandoAbout = ref(false)
const mensajeAboutExito = ref('')
const mensajeAboutError = ref('')

watch(() => aboutData.value, (newData) => {
  if (newData) {
    formAbout.content = newData.content
  }
}, { immediate: true })


const submitNosotros = async () => {
  mensajeAboutExito.value = ''
  mensajeAboutError.value = ''

  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = formAbout.content
  const textContent = tempDiv.textContent || tempDiv.innerText || ''

  if (!formAbout.content || textContent.trim().length === 0) {
    mensajeAboutError.value = 'El contenido no puede estar vacío.'
    return
  }

  cargandoAbout.value = true
  try {
    await $fetch('/api/about', {
      method: 'POST',
      body: { content: formAbout.content }
    })
    mensajeAboutExito.value = '¡Contenido actualizado correctamente!'
  } catch (error) {
    mensajeAboutError.value = 'Error al guardar los cambios.'
  } finally {
    cargandoAbout.value = false
  }
}
</script>