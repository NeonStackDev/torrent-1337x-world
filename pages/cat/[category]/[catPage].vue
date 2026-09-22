<template>

  <AppLayout>
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2 bg-gray-300 p-2 rounded">
        <a v-for="(item, index) in topLinks" :key="index" :href="`/sub/${item.id}/1`" class="btn-icon">
          <i :class="item.icon"></i> {{ item.name }}
        </a>
      </div>
    </div>
    <TorrentHome v-if="Object.keys(torrents).length > 0" key="trending" :torrents="torrents"
      :is_h1=true />
    <TorrentPagination v-if="lastPage > 1" :currentPage="currentPage" :lastPage="lastPage" />
  </AppLayout>
</template>

<script setup>

import AppLayout from '~/layouts/AppLayout.vue';
import TorrentPagination from '~/components/TorrentPagination.vue';

import { useRoute } from 'vue-router'
import { ref } from 'vue'

const torrents = ref([]);
const topLinks = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
// get slug from URL
const route = useRoute()

const config = useRuntimeConfig()
// fetch blog data from Laravel API (SSR)
const { data: cat_data } = await useFetch(`${config.public.apiBase}/torrents/cat/${route.params.category}/${route.params.catPage}`)

// Inject SEO tags dynamically
if (cat_data.value) {


  torrents.value = {
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



</script>