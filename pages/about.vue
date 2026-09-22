<script setup>
import AppLayout from './../layouts/AppLayout.vue'
import TorrentAbout from '~/components/TorrentAbout.vue';
useHead({
  title: "1331x Torrent About",
  meta: [
    { name: 'description', content: "About 1331x Torrent downloads platform" },

    { property: 'og:title', content: "1331x Torrent About" },
    { property: 'og:description', content: "About 1331x Torrent downloads platform" },

  ]
})
</script>
<template>
  <AppLayout> 
     <TorrentAbout/>
  </AppLayout>
   
</template>