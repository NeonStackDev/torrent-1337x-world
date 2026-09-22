<script setup>
import AppLayout from '~/layouts/AppLayout.vue'
import TorrentPagination from '~/components/TorrentPagination.vue'
import { torrentPath } from '~/utils/torrentUrl'
import dayjs from 'dayjs'

const userInfo = ref({})

const getAge = (birthdayString) => {
  const birthday = dayjs(birthdayString);
  if (!birthday.isValid()) return null;
  return dayjs().diff(birthday, 'year'); // difference in years
};


import { useRoute } from 'vue-router'
import { ref } from 'vue'

const torrents = ref([]);

const currentPage = ref(1);
const lastPage = ref(1);
// get slug from URL
const route = useRoute()

const config = useRuntimeConfig()
// fetch blog data from Laravel API (SSR)
const { data: user_data } = await useFetch(`${config.public.apiBase}/torrents/user/${route.params.info}/${route.params.userPage}`)

// Inject SEO tags dynamically
if (user_data.value) {
  userInfo.value = user_data.value.info
  torrents.value = user_data.value.torrents.data

  currentPage.value = user_data.value.torrents.current_page
  lastPage.value = user_data.value.torrents.last_page

  useHead({
    title: user_data.value.title,
    meta: [
      { name: 'description', content: user_data.value.description },

      { property: 'og:title', content: user_data.value.title },
      { property: 'og:description', content: user_data.value.description },
      { property: 'og:image', content: '' },

    ]
  })
}


</script>
<template>

  <AppLayout>
    <div class="flex-1" v-if="userInfo">
      <!-- Title -->
      <div class="bg-gray-700 px-4 py-2 mb-4 rounded">
        <h1 class="text-lg font-semibold">{{ userInfo.username }}</h1>
      </div>

      <!-- Torrent Info -->
      <div class="bg-gray-800 rounded mb-4">
        <div class="grid grid-cols-2 gap-4 p-4 text-sm">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-400">Username:</span>
              <span>{{ userInfo.username }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">User Rank:</span>
              <span>{{ userInfo.rank }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Privacy:</span>
              <span>{{ userInfo.privacy }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Join Date:</span>
              <span>{{ formatApprovedAt(userInfo.joindate) }}</span>
            </div>

          </div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-400">Age:</span>
              <span>{{ getAge(userInfo.birthday) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Gender:</span>
              <span>{{ userInfo.gender }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Country:</span>
              <span>{{ userInfo.country }}</span>
            </div>

          </div>
        </div>


      </div>
    </div>
    <div>
      <!-- Popular Torrents Section -->
      <div class="featured-list bg-gray-800 rounded-lg overflow-hidden shadow-xl mt-4 pb-2">


        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-700">
              <tr>
                <th class="text-left px-4 py-1 text-gray-300 font-semibold">name</th>
                <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">se
                </th>
                <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">le
                </th>
                <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">time
                </th>
                <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">size
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="torrents.length > 0" v-for="(torrent, index) in torrents" :key="index"
                class="border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer text-xs">
                <td class="px-2 py-3" v-if="page_type != 'top' && page_type != 'trending'">
                  <div class="flex items-center justify-between ">
                    <!-- Left side: icon + name -->
                    <div class="flex items-center">
                      <a :href="`/sub/${torrent.subcategory_id}/0/`">
                        <button v-if="torrent.subcategory"><i
                            :class="`${torrent.subcategory.icon}`"></i></button>
                      </a>
                      <a
                        v-if="torrentPath(torrent)"
                        :href="torrentPath(torrent)"
                        aria-label="go to torrent"
                        class="text-gray-300 hover:text-orange-400 transition-colors ml-3"
                      >
                        {{ torrent.name }}
                      </a>
                    </div>

                    <!-- Right side: badge -->
                    <span v-if="torrent.comments_count"
                      class="bg-gray-500 text-black-900 rounded text-xs font-semibold px-2">
                      {{ torrent.comments_count }}
                    </span>
                  </div>
                </td>

                <td class="px-2 py-3" v-if="page_type == 'top' || page_type == 'trending'">
                  <div class="flex items-center justify-between ">
                    <!-- Left side: icon + name -->
                    <div class="flex items-center">
                      <a :href="`/sub/${torrent.subcategory_id}/0/`">
                        <button v-if="torrent.subcategory"><i
                            :class="`${torrent.subcategory.icon}`"></i></button>
                      </a>
                      <a
                        v-if="torrentPath(torrent)"
                        :href="torrentPath(torrent)"
                        class="text-gray-300 hover:text-orange-400 transition-colors ml-3"
                      >
                        {{ torrent.name }}
                      </a>
                      <a
                        v-else-if="torrent.torrent_link"
                        :href="torrent.torrent_link"
                        class="text-gray-300 hover:text-orange-400 transition-colors ml-3"
                      >
                        {{ torrent.name }}
                      </a>
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
                  {{ formatApprovedAt(torrent.approved_at) }}
                </td>
                <td class="text-center px-2 py-2 text-gray-400 hidden md:table-cell">
                  {{ torrent.size_formatted }}
                </td>

              </tr>
            </tbody>
          </table>

          <!-- Pagination component -->
          <TorrentPagination :currentPage="currentPage" :lastPage="lastPage" @page-changed="onPageChange" />
        </div>
      </div>
    </div>
  </AppLayout>
</template>
