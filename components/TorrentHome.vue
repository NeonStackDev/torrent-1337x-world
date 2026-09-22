<template>
  <div>
    <div class="featured-list bg-gray-800 rounded-lg overflow-hidden shadow-xl my-2">
      <div class="featured-heading bg-gradient-to-r from-orange-400 to-red-500 px-4 py-3 flex items-center">
        <!-- to dicide h1 tag if the page is homepage or not -->
        <h1 v-if="is_h1" class="text-white font-bold " >
          <span class="featured-icon"><i :class=icon></i></span>{{ head_title }}
        </h1>
        <h2 v-else class="text-white font-bold">
          <span class="featured-icon"><i :class=icon></i></span>{{ head_title }}
        </h2>
        <!--  -->
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-700">
            <tr v-if="torrents.length == 0">
              <th colspan="6" class="text-center py-4 text-gray-500">No torrents found</th>
            </tr>
            <tr v-if="torrents.length > 0">
              <th class="text-left px-4 py-1 text-gray-300 font-semibold">name</th>
              <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">se
              </th>
              <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">le
              </th>
              <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">time
              </th>
              <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">size
              </th>
              <th class="text-center px-4 py-1 text-gray-300 font-semibold">uploader</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(torrent) in torrents" :key="torrent.id"
              class="border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer text-xs">
              <td class="px-2 py-3">
                <div class="flex items-center justify-between gap-2">
                  <!-- Left side: icon + name (grows to fill space before badge) -->
                  <div class="flex items-center flex-1 min-w-0">
                    <a :href="`/sub/${torrent.subcategory.id}/1`" aria-label="go to sub category"
                      class="shrink-0">
                      <button aria-label="sub category" v-if="torrent.subcategory"><i
                          :class="`${torrent.subcategory.icon}`"></i></button>
                    </a>
                    <a
                      v-if="torrentPath(torrent)"
                      :href="torrentPath(torrent)"
                      aria-label="go to torrent"
                      class="flex-1 min-w-0 text-gray-300 hover:text-orange-400 transition-colors ml-3 block truncate"
                    >
                      {{ torrent.name }}
                    </a>
                    <span v-else class="flex-1 min-w-0 text-gray-300 ml-3 block truncate">{{ torrent.name }}</span>
                  </div>

                  <!-- Right side: badge -->
                  <span v-if="torrent.comments_count"
                    class="bg-gray-500 text-black-900 rounded text-xs font-semibold px-2">
                    {{ torrent.comments_count }}
                  </span>
                </div>
              </td>
              <td class="text-center px-2 py-2 hidden md:table-cell">
                <span class="bg-green-600 text-white px-1 text-xs rounded ">
                  {{ torrent.seeders }}
                </span>
              </td>
              <td class="text-center px-2 py-2 hidden md:table-cell">
                <span class="bg-red-800 text-white px-1 text-xs rounded ">
                  {{ torrent.leechers }}
                </span>
              </td>
              <td class="text-center px-2 py-2 text-gray-400 hidden md:table-cell">
                {{ torrent.uploaded_ago }}
              </td>
              <td class="text-center px-2 py-2 text-gray-400 hidden md:table-cell">
                {{ torrent.size }}
              </td>
              <td class="text-center px-2 py-2">
                <a :href="`/user/${torrent.uploaded_by}/1`" aria-label="go to uploader">
                  <span class="text-orange-400 hover:text-orange-300 transition-colors">
                    {{ torrent.uploaded_by }}
                  </span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>  

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { torrentPath } from '~/utils/torrentUrl'
// Props: receive posters + optional visibleCount
const props = defineProps({
  torrents: {
    type: Object,
    required: true,
  },

  is_h1: Boolean,
});

const head_title = props.torrents.title;
const icon = props.torrents.icon || 'flaticon-movies'; // Default icon if not provided
const torrents = props.torrents?.data || [];
const isLoggedIn = ref(false)

const is_h1 = ref(props.is_h1 ?? false)

const router = useRouter()
const route = useRoute()
const category = route.params.category

const formatApprovedAt = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

onMounted(() => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
});
</script>
<style scoped>
</style>
