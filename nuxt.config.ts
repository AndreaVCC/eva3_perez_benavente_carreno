// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image", // Optimización 
    "nuxt-security", // seguridad 
    "@pinia/nuxt", // Gestión de estad
    "@nuxt/ui", // diseños
    '@pinia-plugin-persistedstate/nuxt' //persistencia datos
  ],
  image: {
    domains: ["images.unsplash.com"],
  },
  css: ["~/assets/css/main.css"],
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
