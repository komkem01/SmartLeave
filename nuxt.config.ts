// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

const baseApi = process.env.NUXT_PUBLIC_BASE_API || 'http://localhost:8080'

// แปลงรูปโลโก้ Smart Leave เป็น SVG Data URI เพื่อใช้เป็น Favicon
const smartLeaveFavicon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="128" fill="%23244d73"/><path d="M384 144h-32v-16c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H224v-16c0-17.7-14.3-32-32-32s-32 14.3-32 32v16h-32c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V208c0-35.3-28.7-64-64-64zm32 288c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V240h256v192zm0-224H128v-32c0-17.7 14.3-32 32-32h32v16c0 17.7 14.3 32 32 32s32-14.3 32-32v-16h64v16c0 17.7 14.3 32 32 32s32-14.3 32-32v-16h32c17.7 0 32 14.3 32 32v32z" fill="%23ffffff"/><path d="M256 416c-3.5 0-6.9-.6-10.2-1.7-15.8-5.3-26.6-20.1-26.8-36.8-.3-21 11.2-46.3 34.3-75.3 3.9-4.9 9.8-7.7 16-7.7 3.1 0 6.3.7 9.3 2.1 36.3 17.1 52.8 48.7 49.3 75.1-2.4 18-15.3 33.1-32.3 37.8-6.3 1.8-13 2.7-19.6 2.7zm6.7-93.5c-15.4 20.3-22.9 37.2-22.7 51 .1 7.2 4.7 13.6 11.5 15.9 2.5.8 5.1 1.2 7.7 1.2 4.6 0 9.2-1.1 13.5-3.3 21.6-11.2 31.8-31.9 29.5-47.5-1.5-11.2-10-25.2-29.5-37.3z" fill="%237cb375"/><path d="M256 416a16 16 0 0 1-16-16v-16a16 16 0 0 1 32 0v16a16 16 0 0 1-16 16z" fill="%23e04a3a"/></svg>`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    public: {
      BASE_API: `${baseApi}/api/v1`
    }
  },
  app: {
    head: {
      title: 'Smart Leave',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: smartLeaveFavicon }
      ]
    }
  }
})