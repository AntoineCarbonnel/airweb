// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
      enabled: true,

      timeline: {
        enabled: true
      }
    },
    runtimeConfig: {
        public: {
            api: 'https://test-feed.airweb.workers.dev'
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/main.scss" as *;'
                }
            }
        }
    },
    modules: [
        '@pinia/nuxt',
    ]
})