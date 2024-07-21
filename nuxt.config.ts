// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxthub/core', '@pinia/nuxt'],
  ui: {
    icons: ['simple-icons', 'heroicons'],
  },
  runtimeConfig: {
    reniecToken: '',
  },
})
