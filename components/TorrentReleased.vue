<template>
  <div class="px-2 md:px-0">
    <div class="featured-list bg-gray-800 rounded-lg overflow-hidden shadow-xl mt-5">
      <div class="featured-heading bg-gradient-to-r from-orange-400 to-red-500 px-4 py-3 flex items-center">
        <h2 class="text-white font-bold">
          <span class="featured-icon">
            <i class="flaticon-movie-library"></i>
          </span>
          Download {{ head_title }}
        </h2>
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
                <div class="flex items-center justify-between ">
                  <!-- Left side: icon + name -->
                  <div class="flex items-center">
                    <a :href="`/sub/${torrent.subcategory_id}/1`" aria-label="go to sub category">
                      <button aria-label="sub category" v-if="torrent.subcategory"><i
                          :class="`${torrent.subcategory.icon}`"></i></button>
                    </a>
                    <a :href="`/torrent/${torrent.id}/${torrent.slugged_title}`" aria-label="go to torrent"
                      class="text-gray-300 hover:text-orange-400 transition-colors ml-3">
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
// Props: receive posters + optional visibleCount
const props = defineProps({
  torrents: {
    type: Object,
    required: true,
  },
  title: String,
});

const head_title = props.title;
const torrents = props.torrents.data;

</script>
