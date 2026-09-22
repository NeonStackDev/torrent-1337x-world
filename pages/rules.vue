<script setup>
import AppLayout from '~/layouts/AppLayout.vue'
import TorrentRules from '~/components/TorrentRules.vue'
useHead({
  title: "1331x Torrent Rules",
  meta: [
    { name: 'description', content: "Rules and guidelines for using 1331x Torrent downloads platform" },

    { property: 'og:title', content: "1331x Torrent Rules" },
    { property: 'og:description', content: "Rules and guidelines for using 1331x Torrent downloads platform" },

  ]
})
</script>
<template>
  <AppLayout> 
     <TorrentRules/>
    
  </AppLayout>
   
</template>
