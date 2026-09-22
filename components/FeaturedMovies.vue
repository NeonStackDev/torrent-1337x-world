<!-- components/FeaturedMovies.vue -->
<template>
  <div class="mb-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Featured Movies</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div 
        v-for="movie in movies" 
        :key="movie.id"
        class="movie-card cursor-pointer"
        @click="handleMovieClick(movie)"
      >
        <div class="relative bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <img 
            :src="movie.image_url" 
            :alt="movie.title" 
            class="w-full h-48 object-cover"
            loading="lazy"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
            <div class="text-white text-xs font-semibold">{{ movie.quality }}</div>
            <div class="text-white text-sm font-medium mt-1 truncate">{{ movie.title }}</div>
          </div>
          
          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="text-white text-center">
              <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <p class="text-sm">View Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movies: {
    type: Array,
    required: true,
    default: () => []
  }
})

const handleMovieClick = (movie) => {
  // Navigate to movie detail page or show modal
  navigateTo(`/movie/${movie.id}`)
}
</script>

<style scoped>
.movie-card img {
  transition: transform 0.3s ease;
}

.movie-card:hover img {
  transform: scale(1.05);
}
</style>