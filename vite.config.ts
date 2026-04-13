import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  define:{
    'process.env': {}
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: '/',
        name: 'amigos da fauna',
        short_name: 'amigos da fauna',
        description: 'Amigos da fauna',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',

        icons: [
          {
            src: '/icons/nature-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/nature-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ],

        screenshots: [
          {
            src: '/screenshots/nature-1280.jpg',
            sizes: '1280x720',
            type: 'image/jpg',
            form_factor: 'wide'
          },
          {
            src: '/screenshots/nature-390.jpg',
            sizes: '390x844',
            type: 'image/jpg'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api-dm-69db35e2f2d0\.herokuapp\.com\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,

              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              },

              cacheableResponse: {
                statuses: [0, 200,201, 204]
              }
            }
          }
        ]
      }
    })
  ]
})