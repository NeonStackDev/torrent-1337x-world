<template>
  <!-- Top Bar -->
  <div class="hidden md:block min-h-[40px] bg-[#000] border-b-4 border-[#822a0b]">
    <div class="max-w-7xl mx-auto flex justify-end pt-2 px-2">
      <a href="/login" v-if="!isLoggedIn" class="title text-red-600 hover:text-red-600">Login</a>
      <a v-if="isLoggedIn" class="title text-white hover:text-red-600 ml-1 mr-1" href="/uploads">Uploads |</a>
      <button v-if="isLoggedIn" class="title text-white hover:text-red-600  ml-1 mr-1"
      @click="handleLogout">Logout</button>
    </div>
  </div>

  <div class="bg-gray-800">
    <div class="max-w-7xl mx-auto space-y-4 md:space-y-6 px-2 py-2">
      <!-- Logo + Search -->
      <div class="hidden md:flex items-center gap-2 justify-between">
        <div class="logo text-6xl font-bold text-white">
          1337<span class="text-orange-500">X</span>
        </div>
        <div class="relative w-full md:w-96">
          <input type="text" placeholder="Search for torrents..." v-model="searchQuery" @keyup.enter="handleSearch"
            class="block w-full focus:outline-none bg-gray-800 border border-gray-600 text-white pl-4 pr-10 py-2 rounded focus:border-orange-500" />
          <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-orange-500"
            aria-label="Search torrents" @click="handleSearch">
            <i class="flaticon-search"></i>
          </button>
        </div>
      </div>
      
      <!-- Logo & search & menu on Mobile -->
      <div class="md:hidden logo text-6xl font-bold text-white text-center">
        1331<span class="text-orange-500">X</span>
      </div>
      <button class="md:hidden absolute top-6 right-6 px-2 text-3xl" @click="isMenuOpen = !isMenuOpen">☰</button>
      <div class="md:hidden relative w-full">
        <input type="text" placeholder="Search for torrents..." v-model="searchQuery" @keyup.enter="handleSearch"
          class="block w-full focus:outline-none bg-gray-800 border border-gray-600 text-white pl-4 pr-10 py-2 rounded focus:border-orange-500" />
        <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-orange-500"
          aria-label="Search torrents" @click="handleSearch">
          <i class="flaticon-search"></i>
        </button>
      </div>
      
      <!-- Navbar -->
      <header>
        <nav class="hidden md:flex justify-between gap-4">
          <a v-for="(tab, index) in navTabs" :key="index" :href="tab.slug" @click="handleNavClick($event, tab)" :class="[
            'flex-1 px-10 py-2 transition-colors text-center',
            index === 0
              ? 'bg-gray-700 text-white border-l-4 border-orange-100 hover:bg-black'
              : 'bg-orange-600 text-white hover:bg-gray-700'
          ]">
            {{ tab.title }}
          </a>
        </nav>

      </header>
    </div>
  </div>

  <!-- Mobile Nav -->
  <nav v-if="isMenuOpen" class="md:hidden bg-gray-800 text-white px-4 py-2 space-y-2">
    <a v-for="(tab, index) in navTabs" :key="index" :href="tab.slug" class="block" @click="handleNavClick($event, tab)">{{ tab.title }}</a>
    <!-- login -->
    <a href="/login" v-if="!isLoggedIn" class="block text-red-600 hover:text-red-600">LOGIN</a>
    <a v-if="isLoggedIn" class="block text-white hover:text-red-600" href="/uploads">UPLOADS</a>
    <button v-if="isLoggedIn" class="block text-white hover:text-red-600"
    @click="handleLogout">LOGOUT</button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePage } from '@inertiajs/vue3'
// get slug from URL
const route = useRoute()
const { user, logout } = useAuth();
const isMenuOpen = ref(false);
const searchQuery = ref(route.params.key??''); // <-- define searchQuery
const page = usePage()
const isLoggedIn = ref(false)
import { useRouter } from 'vue-router'
const router = useRouter()

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search/${searchQuery.value}/1`, { external: true })
  }
}
const POPUNDER_NAV_TITLES = new Set(['UPLOAD', 'RULES', 'CONTACT', 'ABOUT US'])
const POPUNDER_CONTAINER_CLASS = 'edkglc449826'
const POPUNDER_SCRIPT_SRC = 'https://hdbtop.com/code/edkglc449826'

function loadHeaderPopunder() {
  if (process.server) return

  let container = document.querySelector(`.${POPUNDER_CONTAINER_CLASS}`)
  if (!container) {
    container = document.createElement('div')
    container.className = POPUNDER_CONTAINER_CLASS
    document.body.appendChild(container)
  }

  if (document.getElementById('header-popunder-script')) return

  const script = document.createElement('script')
  script.id = 'header-popunder-script'
  script.src = POPUNDER_SCRIPT_SRC
  script.async = true
  document.head.appendChild(script)
}

const handleNavClick = (event, tab) => {
  if (!POPUNDER_NAV_TITLES.has(tab.title)) return

  event.preventDefault()
  window.setTimeout(() => {
    window.location.href = tab.slug
  }, 350)
}
const handleLogout = () => {
  navigateTo('/')
  isLoggedIn.value = false
  logout();
};
onMounted(() => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
  loadHeaderPopunder()
});


const navTabs = [{ title: 'HOME', slug: "/" },
{ title: 'UPLOAD', slug: "/upload" },
{ title: 'RULES', slug: "/rules" },
{ title: 'CONTACT', slug: "/contact" },
{ title: 'ABOUT US', slug: "/about" }];

</script>
