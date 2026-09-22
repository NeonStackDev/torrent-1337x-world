<!-- components/AppHeader.vue -->
<template>
  <header class="bg-slate-700 text-white">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="text-2xl font-bold text-orange-500">
            1331<span class="text-white">X</span>
          </a>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-md mx-8">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for torrents..."
              class="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:outline-none focus:border-orange-500"
              @keyup.enter="handleSearch"
            />
            <button aria-label="search"
              @click="handleSearch"
              class="absolute right-2 top-2 text-gray-400 hover:text-white"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- User Info -->
        <div class="text-sm">
          <button aria-label="login" class="text-red-500 hover:text-red-400">LOGIN</button>
          <span class="mx-2">|</span>
          <span class="text-gray-300">[]</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="border-t border-slate-600">
        <div class="flex">
          <a 
            v-for="item in navItems" 
            :key="item.name"
            :href="item.path"
            class="px-6 py-3 hover:bg-slate-600 border-r border-slate-600 transition-colors"
            :class="item.active ? 'bg-orange-600 text-white border-r border-orange-700' : 'text-white'"
          >
            {{ item.name }}
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
const searchQuery = ref('')

const navItems = ref([
  { name: 'HOME', path: '/', active: true },
  { name: 'UPLOAD', path: '/navibar/upload', active: true },
  { name: 'RULES', path: '/navibar/rules', active: false },
  { name: 'CONTACT', path: '/navibar/contact', active: false },
  { name: 'ABOUT US', path: '/navibar/about', active: false },
])

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to search results page
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

// Update active navigation based on current route
const route = useRoute()
watchEffect(() => {
  navItems.value.forEach(item => {
    item.active = item.path === route.path
  })
})
</script>