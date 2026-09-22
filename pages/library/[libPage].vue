<template>

  <AppLayout>
    <div class="w-full text-white">
      <div>
        <!-- Filter Controls -->
        <div class="bg-gray-800 p-3 rounded-lg mb-6 flex items-center gap-4 flex-wrap">
          <!-- Genre Dropdown -->
          <div class="flex items-center space-x-2">
            <label class="text-gray-500">Genre</label>
            <select v-model="selectedGenre"
              class="bg-gray-700 border border-gray-600 px-2 py-1 rounded text-left flex items-center justify-between hover:bg-gray-600 transition-colors">
              <option v-for="genre in genres">{{ genre }}</option>
            </select>
          </div>

          <!-- Year Dropdown -->
          <div class="flex items-center space-x-2">
            <label class="text-gray-500">Year</label>
            <select v-model="selectedYear"
              class="bg-gray-700 border border-gray-600 px-2 py-1 rounded text-left flex items-center justify-between hover:bg-gray-600 transition-colors">
              <option v-for="year in years">{{ year }}</option>
            </select>
          </div>

          <!-- Sort By Dropdown -->
          <div class="flex items-center space-x-2">
            <label class="text-gray-500">Sort By</label>
            <select v-model="selectedSortBy"
              class="bg-gray-700 border border-gray-600 px-2 py-1 rounded text-left flex items-center justify-between hover:bg-gray-600 transition-colors">
              <option v-for="sortOption in sortOptions">{{ sortOption }}</option>
            </select>
          </div>

          <!-- Sort Order Dropdown -->
          <div class="flex items-center space-x-2">
            <label class="text-gray-500">Sort</label>
            <select v-model="selectedSortOrder"
              class="bg-gray-700 border border-gray-600 px-2 py-1 rounded text-left flex items-center justify-between hover:bg-gray-600 transition-colors">
              <option v-for="order in sortOrders">{{ order }}</option>
            </select>
          </div>

          <!-- Sort Button -->
          <div class="flex">
            <button @click="sortMovies"
              class="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-1 rounded font-medium transition-colors">
              Sort
            </button>
          </div>
        </div>
        <!-- Movies Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="movie in filteredAndSortedMovies.data" :key="movie.id"
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div
              class="aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative cursor-pointer"
              @click="openModal(movie)">
              <!-- Movie Poster Placeholder -->
              <div class="w-full h-64 bg-cover bg-center" :style="{ backgroundImage: `url('${movie.img_url}')` }">
                <div class="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                  <span class="text-lg font-semibold text-center px-2">{{ movie.title }}</span>
                </div>
              </div>
            </div>
            <!-- Star Rating -->
            <div class="p-2 flex justify-center">
              <div class="flex">
                <svg v-for="star in 5" :key="star" :class="star <= movie.rate ? 'text-yellow-400' : 'text-gray-500'"
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination component -->
    <TorrentPagination :currentPage="currentPage" :lastPage="lastPage" />
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click="closeModal">
      <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg max-w-md w-full mx-4 relative overflow-hidden"
        @click.stop>
        <!-- Close Button -->
        <button @click="closeModal" class="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
            </path>
          </svg>
        </button>

        <!-- Modal Content -->
        <div class="p-6 text-white">
          <!-- Title -->
          <h2 class="text-2xl font-bold mb-2 text-white">{{ selectedMovie?.info_title }}</h2>

          <!-- Music and Drama labels -->
          <div class="flex gap-2 mb-4">
            <span class="text-sm bg-black bg-opacity-20 px-5 py-1 rounded ml-10"
              v-html="selectedMovie?.category"></span>

          </div>

          <!-- Description -->
          <p class="text-sm mb-6 leading-relaxed text-white opacity-90">
            {{ selectedMovie?.content }}
          </p>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <div class="text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
              Download:
            </div>
            <a :href="selectedMovie.info_url"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
              View Releases
            </a>

          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>

import AppLayout from '~/layouts/AppLayout.vue';
import TorrentPagination from '~/components/TorrentPagination.vue';


import { useRoute } from 'vue-router'
import { ref } from 'vue'

const filteredAndSortedMovies = ref([]);
const topLinks = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
// get slug from URL
const route = useRoute()

const config = useRuntimeConfig()
// fetch blog data from Laravel API (SSR)
const { data: cat_data } = await useFetch(`${config.public.apiBase}/library/movies/${route.params.libPage}`)

// Inject SEO tags dynamically
if (cat_data.value) {


  filteredAndSortedMovies.value = {
    title: cat_data.value.title,
    icon: cat_data.value.icon,
    ...cat_data.value.torrents
  }



  topLinks.value = cat_data.value.subcategories

  currentPage.value = cat_data.value.torrents.current_page
  lastPage.value = cat_data.value.torrents.last_page

  useHead({
    title: cat_data.value.title,
    meta: [
      { name: 'description', content: cat_data.value.description },

      { property: 'og:title', content: cat_data.value.title },
      { property: 'og:description', content: cat_data.value.description },
      { property: 'og:image', content: '' },

    ]
  })
}


// Modal state
const showModal = ref(false)
const selectedMovie = ref(null)

// Modal methods
const openModal = (movie) => {
  selectedMovie.value = movie
  showModal.value = true
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeModal = () => {
  showModal.value = false
  selectedMovie.value = null
  document.body.style.overflow = 'auto' // Restore scrolling
}



// Reactive data
const dropdowns = ref({
  genre: false,
  year: false,
  language: false,
  sortBy: false,
  sortOrder: false
})

const selectedGenre = ref('All')
const selectedYear = ref('All')
const selectedSortBy = ref('Movie Score')
const selectedSortOrder = ref('Descending')


// Options
const genres = ref(['All', 'Action', 'Crime', 'Drama', 'Comedy', 'Thriller', 'Horror', 'Romance', 'Sci-Fi', 'Adventure'])
const years = ref(['All', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'])
const sortOptions = ref(['Movie Score', 'Release Date', 'Title', 'Rating', 'Year'])
const sortOrders = ref(['Descending', 'Ascending'])


</script>