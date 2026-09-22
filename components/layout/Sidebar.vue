<template>
  <div>
    <!-- Browse Torrents -->
    <div class="bg-gray-800 rounded overflow-hidden shadow-xl mb-2">
      <div class="flex justify-between bg-gradient-to-r from-orange-500 to-gray-500 px-4 py-3">
        <h3 class="text-white font-bold text-base">BROWSE TORRENTS</h3>
        <button @click="isOpen = !isOpen" class="text-xs" title="collapse list"><i
            :class="isOpen ? 'flaticon-two-arrows-up' : 'flaticon-two-down-arrows'"></i></button>
      </div>
      <transition enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform -translate-y-2 opacity-0">
        <ul v-show="isOpen" class="list-box flex flex-col divide-y-2 divide-gray-700 overflow-hidden">
          <li v-for="(category, index) in browseCategories" :key="index"
            class="flex text-gray-300 hover:text-orange-400 cursor-pointer transition-colors px-4 py-1 border-b-1 border-gray-600">
            <a :href="category.slug" class="block w-full">
              <i :class=category.icon></i>
              {{ category.title }}
            </a>
          </li>
        </ul>
      </transition>
    </div>

    <KadamSidebarAd v-if="showSidebarAd" />
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { ref, onMounted, watch, computed } from 'vue'
import KadamSidebarAd from '@/components/KadamSidebarAd.vue'
const showSidebarAd = computed(() => route.path === '/' || route.path.startsWith('/torrent/'))

const props = defineProps({
  is_open: {
    type: Boolean,
    default: true,
  },
});

const isOpen = ref(props.is_open ?? false)
watch(() => props.is_open, (v) => { isOpen.value = v ?? false })

const browseCategories = [
  { title: 'Trending Torrents', icon: 'flaticon-trending', slug: '/categories/trending' },
  { title: 'Movie library', icon: 'flaticon-movie-library', slug: '/library/1' },
  { title: 'Top 100 Torrents', icon: 'flaticon-top', slug: '/categories/top' },
  { title: 'Anime', icon: 'flaticon-ninja-portrait', slug: '/cat/Anime/1' },
  { title: 'Applications', icon: 'flaticon-apps', slug: '/cat/Apps/1' },
  { title: 'Documentaries', icon: 'flaticon-documentary', slug: '/cat/Documentaries/1' },
  { title: 'Games', icon: 'flaticon-games', slug: '/cat/Games/1' },
  { title: 'Movies', icon: 'flaticon-movies', slug: '/cat/Movies/1' },
  { title: 'Music', icon: 'flaticon-music', slug: '/cat/Music/1' },
  { title: 'Other', icon: 'flaticon-other', slug: '/cat/Other/1' },
  { title: 'Television', icon: 'flaticon-tv', slug: '/cat/TV/1' },
  { title: 'XXX', icon: 'flaticon-xxx', slug: '/cat/XXX/1' },

]
const browseCategory = (category) => {

  if (category.slug == 'trending' || category.slug == 'top-100') {
    router.push(`/${category.slug}`);
  }
  else if (category.slug == 'movielibrary') {
    router.push(`/${category.slug}/1/`);
  }
  else {
    router.push(`/cat/${category.slug}/1/`);
  }
  // Implement category browsing logic
  // Navigate to category page or filter torrents
}
// Start with false (mobile) for consistent SSR rendering
const isDesktop = ref(false);
onMounted(() => {

  isDesktop.value = window.innerWidth >= 1024

})

</script>

<style scoped>
/* Add any component-specific styles here if needed */


.list-box li {
  color: #dadada;
  display: block;
  font-size: 14px;
  line-height: 38px;
  padding: 0 12px 0 49px;
  position: relative;
}

.list-box li i {
  height: 30px;
  left: 12px;
  margin-right: 7px;
  position: absolute;
  top: 0;
  width: 30px;
  color: #56add9;
  font-size: 23px;
}

.list-box i.flaticon-trending,
.list-box i.flaticon-movie-library,
.list-box i.flaticon-tv-library {
  color: #89ad19;
}
</style>

