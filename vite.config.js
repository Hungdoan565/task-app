import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
        runtimeCaching: [
          {
            // Firestore REST API
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*$/i,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'firestore-api',
              networkTimeoutSeconds: 5,
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 }
            }
          },
          {
            // Firebase Storage objects
            urlPattern: /^https:\/\/firebasestorage\.(googleapis\.com|app)\/.*$/i,
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'firebase-storage',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 60, maxAgeSeconds: 7 * 24 * 60 * 60 }
            }
          },
          {
            // Realtime Database (if used)
            urlPattern: /^https:\/\/[a-zA-Z0-9-]+\.firebaseio\.com\/.*$/i,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'firebase-rt-db',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 50, maxAgeSeconds: 5 * 60 }
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
            // gstatic assets (optional)
            urlPattern: /^https:\/\/(www\.)?gstatic\.com\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-assets',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }
            }
          }
        ]
      }
    })
  ],
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
      '@': path.resolve(__dirname, './src'),
    },
  },
})
