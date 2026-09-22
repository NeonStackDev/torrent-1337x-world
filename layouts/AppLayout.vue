<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-r from-gray-300 to-gray-700 text-white">
    <!-- Header -->
    <Header />

    <div class="max-w-7xl mx-auto px-2 flex flex-col md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-4">
      <main class="order-2 md:order-1 xl:col-span-4 md:col-span-3 pb-2">
        <slot />
      </main>
      <Sidebar class="order-1 md:order-2 pt-2" :is_open="isDesktopComputed" />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
// Components are auto-imported in Nuxt 3
import { onMounted, computed } from 'vue'
import Header from '~/components/layout/Header.vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import Footer from '~/components/layout/Footer.vue';
const route = useRoute()
const isTorrentPage = computed(() => route.path.startsWith('/torrent/'))

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} Free Download` : 'Free Download'
  },
  meta: computed(() => {
    const tags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Ultimate Torrent Hub' },
    ]
    if (!isTorrentPage.value) {
      tags.push({ property: 'og:url', content: `https://1337x.world${route.path}` })
    }
    return tags
  }),
  link: computed(() =>
    isTorrentPage.value
      ? []
      : [{ rel: 'canonical', href: `https://1337x.world${route.path}` }]
  ),
})

useSchemaOrg([
  defineWebSite({
    name: 'Torrent free download'
  })
])

const isDesktop = ref(false);
const isMounted = ref(false);

// Computed property that ensures SSR/client consistency
const isDesktopComputed = computed(() => {
  if (!isMounted.value) {
    return false; // Always false during SSR and initial render
  }
  return isDesktop.value;
});

onMounted(async () => {
  isDesktop.value = window.innerWidth >= 1024;
  isMounted.value = true;
})
</script>
