import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

// Precache all assets defined in the manifest
precacheAndRoute(self.__WB_MANIFEST)

// Cache API requests with network-first strategy
registerRoute(
  ({ url }) => url.origin === 'https://api.example.com',
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // Only cache successful responses
          return response.status === 200 ? response : null
        }
      }
    ]
  })
)

// Cache images with cache-first strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // Only cache successful responses
          return response.status === 200 ? response : null
        }
      }
    ]
  })
)