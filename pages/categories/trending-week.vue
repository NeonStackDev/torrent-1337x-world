<template>

  <AppLayout>
        <div class="space-y-4">
            <!-- First row -->
            <div class="flex gap-2 bg-gray-300 p-2 rounded">
                <a class="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                    href="/categories/trending">
                    <i class="flaticon-trending"></i>
                    All Trending Today
                </a>
                <a class="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                    href="/categories/trending-week">
                    <i class="flaticon-trending"></i>
                    All Trending This Week
                </a>
            </div>

            <!-- Second row -->
            <div class="flex flex-wrap gap-2 bg-gray-300 p-2 rounded">
                <a class="btn-icon" href="/trending/d/movies"><i class="flaticon-movies"></i> Trending Movies</a>
                <a class="btn-icon" href="/trending/d/tv"><i class="flaticon-tv"></i> Trending TV</a>
                <a class="btn-icon" href="/trending/d/games"><i class="flaticon-games"></i> Trending Games</a>
                <a class="btn-icon" href="/trending/d/apps"><i class="flaticon-apps"></i> Trending Apps</a>
                <a class="btn-icon" href="/trending/d/music"><i class="flaticon-music"></i> Trending Music</a>
                <a class="btn-icon" href="/trending/d/doc"><i class="flaticon-documentary"></i> Trending
                    Documentaries</a>
                <a class="btn-icon" href="/trending/d/anime"><i class="flaticon-ninja-portrait"></i> Trending Anime</a>
                <a class="btn-icon" href="/trending/d/other"><i class="flaticon-other"></i> Trending Other</a>
                <a class="btn-icon" href="/trending/d/xxx"><i class="flaticon-xxx"></i> Trending XXX</a>
            </div>

        </div>
        <TorrentHome  v-if="Object.keys(torrents).length > 0" key="index" :torrents="torrents" is_h1=true />
        
  </AppLayout>
</template>

<script setup>

import AppLayout from '~/layouts/AppLayout.vue';


import { useRoute } from 'vue-router'

// get slug from URL
const route = useRoute()
const torrents = ref([]);
const config = useRuntimeConfig()
// fetch blog data from Laravel API (SSR)
const { data: cat_torrents } = await useFetch(`${config.public.apiBase}/torrents/type/trending-week`)


// Inject SEO tags dynamically
if (cat_torrents.value) {
  torrents.value = cat_torrents.value.torrents
  
  useHead({
    title: cat_torrents.value.title,
    meta: [
      { name: 'description', content: cat_torrents.value.description },
      
      { property: 'og:title', content: cat_torrents.value.title },
      { property: 'og:description', content: cat_torrents.value.description },
      { property: 'og:image', content: '' },

    ]
  })
}




</script>