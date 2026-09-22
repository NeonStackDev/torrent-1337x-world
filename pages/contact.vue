<script setup>
import AppLayout from '~/layouts/AppLayout.vue';
import TorrentContact from '~/components/TorrentContact.vue';
useHead({
  title: "1331x Torrent Contact",
  meta: [
    { name: 'description', content: "Contact information for 1331x Torrent downloads platform" },

    { property: 'og:title', content: "1331x Torrent Contact" },
    { property: 'og:description', content: "Contact information for 1331x Torrent downloads platform" },

  ]
})
</script>
<template>

  <AppLayout> 
     <TorrentContact />    
  </AppLayout>
   
</template>