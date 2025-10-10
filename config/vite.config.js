import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import tailwindcss from '@tailwindcss/postcss'

// central vite config (moved from project root)
export default defineConfig({
  plugins: [
    react({
      fastRefresh: false,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'TaskApp',
        short_name: 'TaskApp',
        theme_color: '#0b0b0b',
        background_color: '#0b0b0b',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//, /^\/__\//],
        runtimeCaching: [
          {
            // Firestore REST API
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*$/i,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'firebase-runtime',
              networkTimeoutSeconds: 5,
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 30 }
            }
          },
          {
            // Realtime Database (if used)
            urlPattern: /^https:\/\/[a-zA-Z0-9-]+\.firebaseio\.com\/.*$/i,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'firebase-runtime',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 5 }
            }
          },
          {
            // Firebase Storage objects (prefer network, fallback to cache)
            urlPattern: /^https:\/\/firebasestorage\.(googleapis\.com|app)\/.*$/i,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'firebase-runtime',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 }
            }
          },
          {
            // Auth/token endpoints — never cache
            urlPattern: /^https:\/\/(identitytoolkit|securetoken)\.googleapis\.com\/.*$/i,
            handler: 'NetworkOnly'
          },
          {
            // Firebase Installations — do not cache
            urlPattern: /^https:\/\/firebaseinstallations\.googleapis\.com\/.*$/i,
            handler: 'NetworkOnly'
          },
          {
            // Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'runtime-fonts',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 20, maxAgeSeconds: 7 * 24 * 60 * 60 }
            }
          },
          {
            // Font files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'runtime-fonts',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 30, maxAgeSeconds: 365 * 24 * 60 * 60 }
            }
          }
        ]
      }
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router', 'react-router-dom'],
          framer: ['framer-motion'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/analytics'],
          icons: ['react-icons', 'lucide-react'],
          utils: ['clsx', 'date-fns', 'zustand', 'react-helmet-async']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
})
