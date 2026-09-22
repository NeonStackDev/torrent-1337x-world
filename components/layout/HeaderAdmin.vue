<template>
  <header class="bg-gray-800 border-b border-gray-700">
    <!-- Top Bar -->
    <div class="min-h-[40px] bg-[#000] border-b-5 border-[#822a0b] items-center ">
    <div class="mx-auto w-full grid-cols-1 gap-10 container text-right ">
      <a href="" class="title text-white hover:text-red-600">CHAT</a>
      |
      <a href="" class="title text-white hover:text-red-600">UPLOADS</a>
      |
      <a href="" class="title text-white hover:text-red-600">BOOKMARKS</a>
      |
      <a href="" class="title text-white hover:text-red-600">NOTIFICATIONS</a>
      |
      <a href="" class="title text-white hover:text-red-600">INBOX</a>
      |
      <a href="" class="title text-white hover:text-red-600">SETTINGS</a>
      |
      <a href="" class="title text-red-600 hover:text-red-600">LOGOUT</a>
    </div>
  </div>
    <!-- Header -->
    <div class="bg-black/20 backdrop-blur-sm border-b border-orange-500/50">
      <div class="max-w-7xl mx-auto px-4">
          
        <!-- Main Header -->
        <div class="flex items-center justify-between py-4">
          <div class="text-4xl font-bold text-white">
            1331<span class="text-orange-500">X</span>
          </div>
          
          <div class="flex items-center space-x-2 flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search for torrents..."
              v-model="searchQuery"
              class="flex-1 bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-l focus:outline-none focus:border-orange-500"
            />
            <button 
              @click="handleSearch"
              class="bg-orange-500 hover:bg-orange-700 text-white px-6 py-2 rounded-r transition-colors flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              SEARCH
            </button>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="w-full max-w-9/10 flex space-x-3 mb-3">
          <button 
            v-for="(tab, index) in navTabs" 
            :key="index"
            @click="openMenu(tab)"
            :class="[
              'px-23 py-3 transition-colors',
              index === 0 
                ? 'bg-gray-700 text-white-bold border-l-3 border-orange-100 hover:bg-black-900' 
                : 'bg-orange-600 text-white hover:bg-gray-700'
            ]"
          >
            {{ tab.title }}
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { Link } from '@inertiajs/vue3'

import { ref, reactive, onMounted } from 'vue'

export default {
  name: 'TorrentSite',
  setup() {
    const searchQuery = ref('')
    
    const navTabs = [{title :'HOME',slug:"/"}, 
                     {title :'UPLOAD',slug:"/upload"},
                     {title :'RULES',slug:"/rules"},
                     {title :'CONTACT',slug:"/contact"},
                     {title :'ABOUT US',slug:"/about"}];
    
  

    const moviePosters = reactive([
      { title: "The Meg 2", quality: "1080p" },
      { title: "Oppenheimer", quality: "1080p" },
      { title: "The Phoenician", quality: "1080p" },
      { title: "Scream VI", quality: "1080p" },
      { title: "Marc Maron", quality: "1080p" },
      { title: "100 Men and Me", quality: "1080p" },
      { title: "Fantastic Four", quality: "1080p" }
    ])

    const browseCategories = [
      'Trending Torrents',
      'Movie library', 
      'Top 100 Torrents',
      'Anime',
      'Applications',
      'Documentaries',
      'Games',
      'Movies',
      'Music',
      'Other',
      'Television',
      'XXX'
    ]

    const externalLinks = [
      '1331x Status',
      '1331x Chat',
      'Torrent9',
      'uTrix',
      'Njalla',
      'PRQ',
      'Limetorrents',
      'TorrentFunk',
      'ThePornDude',
      'Torlock'
    ]

    // Methods
    const handleSearch = () => {
      if (searchQuery.value.trim()) {      
        //window.location.href = "/search/"+searchQuery.value+"/1/";
      }
    }
  
    const openMenu = (item) =>{    
      //window.location.href = item.slug;
    }
    onMounted(() => {
      // Initialize component, fetch data, etc.
    })

    return {
      searchQuery,
      navTabs,
     
      moviePosters,
      browseCategories,
      externalLinks,
      handleSearch,
     
      openMenu,
      browseCategory,
      openLink
    }
  }
}
</script>

