<template>

  <AppLayout>
    <div class="max-w-7xl mx-auto mt-5" v-if="torrent">

        <!-- Main Content -->
        <div class="flex-1 ">
          <!-- Torrent Info -->
          <div class="bg-gray-800 rounded mb-4">
            <div class="grid grid-cols-4 gap-4 p-4 text-sm">
                <div class="flex">
                  <img :src="torrent.cover_image" :alt="torrent.name" class="w-min-36 h-auto mx-auto mb-2 rounded" >
                </div>
              <div class="col-span-3">
                  <h1 class="text-2xl font-bold text-white">{{ torrent.name }}</h1>
                  <p>{{ torrent.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TorrentReleased v-if="Object.keys(movies).length > 0" key="trending" :torrents="movies" :title="torrent.name" />
  </AppLayout>
</template>
<script setup>

import AppLayout from '~/layouts/AppLayout.vue';
import TorrentReleased from '~/components/TorrentReleased.vue';
import { useRoute } from 'vue-router'

// get slug from URL
const route = useRoute()
const movies = ref([]);
const config = useRuntimeConfig()
// fetch blog data from Laravel API (SSR)
const { data: torrent } = await useFetch(`${config.public.apiBase}/movie/${route.params.idMovie}/${route.params.slugMovie}`)

// Inject SEO tags dynamically
if (torrent.value) {

  movies.value = torrent.value.torrents

  useHead({
    title: torrent.value.title,
    meta: [
      { name: 'description', content: torrent.value.description },
      { property: 'og:title', content: torrent.value.title },
      { property: 'og:description', content: torrent.value.description },
      { property: 'og:image', content: torrent.value.cover_image },
      { property: 'og:type', content: 'article' }
    ]
  })
}




</script>
<style scoped>
.btn {
  display: block;
  width: 250px;
  padding: 10px;
  color: white;
  font-weight: bold;
  text-align: left;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
}

.btn .icon {
  margin-right: 8px;
}

.torrent {
  background-color: #a63b20;
}

/* Dropdown styles */
.dropdown {
  background: #8b1818;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-bottom: 5px;
}

.dropdown a {
  color: white;
  text-decoration: none;
  padding: 5px;
  font-weight: bold;
  padding-top: 6px;

}

.dropdown a:hover {
  background: #313030;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
  /* adjust for more links */
  opacity: 1;
}
</style>