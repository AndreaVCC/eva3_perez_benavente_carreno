<template>
    <section id="inicio"
        class="bg-gradient-to-br from-primary-50 via-gray-50 to-white dark:from-primary-950/30 dark:via-gray-900 dark:to-gray-950">
        <UContainer class="py-16 grid gap-10 lg:grid-cols-2 items-center">

            <div>
                <UBadge color="primary" variant="soft" class="mb-4">
                    Centro de Negocios Santiago
                </UBadge>

                <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                    Impulsamos el crecimiento de
                    <span class="bg-gradient-to-r from-primary-500 to-region-azul bg-clip-text text-transparent">
                        emprendedores y pymes
                    </span>
                </h1>

                <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    El Centro de Negocios Santiago de SERCOTEC entrega asesoría,
                    capacitación, innovación y acompañamiento empresarial para
                    fortalecer el desarrollo sostenible de emprendedores y pequeñas empresas.
                </p>

                <div class="flex flex-wrap gap-3">
                    <UButton to="#servicios" label="Ver servicios" size="lg" />
                    <UButton to="#contacto" label="Solicitar contacto" variant="outline" size="lg" />
                </div>
            </div>

            <UCard class="shadow-lg">
                <template #header>
                    <div>
                        <UBadge color="primary" variant="soft" class="mb-2">
                            Apoyo empresarial
                        </UBadge>
                        <h2 class="text-2xl font-bold">
                            Servicios para fortalecer tu negocio
                        </h2>
                    </div>
                </template>

                <div class="grid gap-4 sm:grid-cols-2">
                    <div class="rounded-lg bg-region-turquesa p-4 text-white">
                        <p class="text-3xl font-bold">01</p>
                        <p class="font-semibold">Asesorías</p>
                        <p class="text-sm opacity-90">Acompañamiento personalizado.</p>
                    </div>

                    <div class="rounded-lg bg-region-naranja p-4 text-white">
                        <p class="text-3xl font-bold">02</p>
                        <p class="font-semibold">Capacitaciones</p>
                        <p class="text-sm opacity-90">Talleres para emprendedores.</p>
                    </div>

                    <div class="rounded-lg bg-region-azul p-4 text-white">
                        <p class="text-3xl font-bold">03</p>
                        <p class="font-semibold">Innovación</p>
                        <p class="text-sm opacity-90">Herramientas digitales.</p>
                    </div>

                    <div class="rounded-lg bg-region-turquesa p-4 text-white">
                        <p class="text-3xl font-bold">04</p>
                        <p class="font-semibold">Vinculación</p>
                        <p class="text-sm opacity-90">Redes y oportunidades.</p>
                    </div>
                </div>
            </UCard>
        </UContainer>
    </section>
</template>