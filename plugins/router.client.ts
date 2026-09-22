export default defineNuxtPlugin(() => {
  // Suppress Vue Router warnings for _nuxt paths
  // These are static assets handled by Nitro server-side, not routes
  // The warnings occur when the router tries to match these paths on the client
  if (process.client) {
    const originalWarn = console.warn
    console.warn = (...args: any[]) => {
      const message = args[0]?.toString() || ''
      // Suppress warnings about _nuxt paths - these are handled by Nitro
      if (message.includes('No match found for location with path "/_nuxt/"')) {
        return // Suppress this specific warning
      }
      originalWarn.apply(console, args)
    }
  }
})
