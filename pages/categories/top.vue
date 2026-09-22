
<template>

    <Head title="Trending Torrents" />
    <AppLayout>
        <div class="space-y-4  md:mt-2">

            <!-- Second row -->
            <div class="flex flex-wrap gap-2 bg-gray-300 p-2 rounded">
                <a class="btn-icon" href="/top/movies"><i class="flaticon-movies"></i> Top 100 Movies</a>
                <a class="btn-icon" href="/top/tv"><i class="flaticon-tv"></i> Top 100 TV</a>
                <a class="btn-icon" href="/top/games"><i class="flaticon-games"></i> Top 100 Games</a>
                <a class="btn-icon" href="/top/apps"><i class="flaticon-apps"></i> Top 100 Apps</a>
                <a class="btn-icon" href="/top/music"><i class="flaticon-music"></i> Top 100 Music</a>
                <a class="btn-icon" href="/top/doc"><i class="flaticon-documentary"></i> Top 100
                    Documentaries</a>
                <a class="btn-icon" href="/top/anime"><i class="flaticon-ninja-portrait"></i> Top 100 Anime</a>
                <a class="btn-icon" href="/top/other"><i class="flaticon-other"></i> Top 100 Other</a>
                <a class="btn-icon" href="/top/xxx"><i class="flaticon-xxx"></i> Top 100 XXX</a>
            </div>

        </div>
        <TorrentHome  v-if="Object.keys(torrents).length > 0" key="trending" :torrents="torrents" :is_h1=true />
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
const { data: cat_torrents } = await useFetch(`${config.public.apiBase}/torrents/type/top`)


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
