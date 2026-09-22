<script setup>
import AppLayout from '~/layouts/AppLayout.vue';
import TorrentSearch from '~/components/TorrentSearch.vue';
import TorrentPagination from '~/components/TorrentPagination.vue';

import { useRoute } from 'vue-router'
import { ref } from 'vue'

// get slug from URL
const route = useRoute()

const torrents = ref([]);
const search_str = ref(route.params.key??'');

const currentPage = ref(1);
const lastPage = ref(1);

const config = useRuntimeConfig()
// fetch blog data from Laravel API (SSR)
const { data: search_data } = await useFetch(`${config.public.apiBase}/torrents/search/${route.params.key}/${route.params.searchPage}`)

// Inject SEO tags dynamically
if (search_data.value) {


    torrents.value = {
        title: search_data.value.title,
        icon: search_data.value.icon,
        ...search_data.value.torrents
    }

    currentPage.value = search_data.value.torrents.current_page
    lastPage.value = search_data.value.torrents.last_page

    useHead({
        title: search_data.value.title,
        meta: [
            { name: 'description', content: search_data.value.description },
            
            { property: 'og:title', content: search_data.value.title },
            { property: 'og:description', content: search_data.value.description },
            { property: 'og:image', content: '' },

        ]
    })
}

</script>
<template>
    <AppLayout>
      <TorrentSearch v-if="Object.keys(torrents).length > 0" key="searching" :search_str="search_str" :torrents="torrents" />
      <TorrentPagination :currentPage="currentPage" :lastPage="lastPage" />
    </AppLayout>
</template>
