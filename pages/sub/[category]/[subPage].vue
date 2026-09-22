<template>

    <AppLayout>
        <TorrentHome v-if="Object.keys(torrents).length > 0" key="trending" :torrents="torrents" :is_h1=true class="-mt-2"/>
        <TorrentPagination v-if="lastPage > 1" :currentPage="currentPage" :lastPage="lastPage" />
    </AppLayout>
</template>

<script setup>

import AppLayout from '~/layouts/AppLayout.vue';
import TorrentPagination from '~/components/TorrentPagination.vue';

import { useRoute } from 'vue-router'
import { ref } from 'vue'

const torrents = ref([]);

const currentPage = ref(1);
const lastPage = ref(1);
// get slug from URL
const route = useRoute()

const config = useRuntimeConfig()
// fetch blog data from Laravel API (SSR)
const { data: cat_data } = await useFetch(`${config.public.apiBase}/torrents/catsub/${route.params.category}/${route.params.subPage}`)

// Inject SEO tags dynamically
if (cat_data.value) {
    
    torrents.value = {
        title: cat_data.value.title,
        icon: cat_data.value.icon,
        ...cat_data.value.torrents
    }

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


</script>