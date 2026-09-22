<!-- components/TorrentTable.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="bg-orange-500 text-white px-4 py-3">
      <h3 class="font-bold flex items-center">
        <span class="mr-2">📁</span>
        {{ title }}
      </h3>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-slate-700 text-white">
          <tr>
            <th class="px-4 py-3 text-left">Name</th>
            <th class="px-4 py-3 text-center w-16">SE</th>
            <th class="px-4 py-3 text-center w-16">LE</th>
            <th class="px-4 py-3 text-center w-24">Time</th>
            <th class="px-4 py-3 text-center w-24">Size</th>
            <th class="px-4 py-3 text-center w-24">Uploader</th>
            <th class="px-4 py-3 text-center w-20">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="torrent in torrents" 
            :key="torrent.id" 
            class="border-b hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-3">
              <div class="flex items-center">
                <span class="mr-2">🎬</span>
                <a
                  v-if="torrentPath(torrent)"
                  :href="torrentPath(torrent)"
                  class="text-blue-600 hover:underline text-left"
                >
                  {{ torrent.name }}
                </a>
                <span v-else>{{ torrent.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-center">
              <span 
                class="px-2 py-1 rounded text-xs font-semibold"
                :class="getSeedersClass(torrent.seeders)"
              >
                {{ torrent.seeders }}
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              <span 
                class="px-2 py-1 rounded text-xs font-semibold"
                :class="getLeechersClass(torrent.leechers)"
              >
                {{ torrent.leechers }}
              </span>
            </td>
            <td class="px-4 py-3 text-center text-sm text-gray-600">
              {{ torrent.time }}
            </td>
            <td class="px-4 py-3 text-center text-sm font-medium">
              {{ torrent.size }}
            </td>
            <td class="px-4 py-3 text-center">
              <button 
                @click="handleUploaderClick(torrent.uploader)"
                class="text-orange-600 font-semibold text-sm hover:underline"
              >
                {{ torrent.uploader }}
              </button>
            </td>
            <td class="px-4 py-3 text-center">
              <div class="flex justify-center space-x-2">
                <button 
                  @click="handleDownload(torrent)"
                  class="text-green-600 hover:text-green-800 transition-colors"
                  title="Download"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  </svg>
                </button>
                <button 
                  @click="handleMagnet(torrent)"
                  class="text-red-600 hover:text-red-800 transition-colors"
                  title="Magnet Link"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,7V13A9,9 0 0,0 12,22A9,9 0 0,0 21,13V7H18V13A6,6 0 0,1 12,19A6,6 0 0,1 6,13V7H3M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2Z"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="showPagination" class="bg-gray-50 px-4 py-3 border-t">
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-600">
          Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
        </div>
        <div class="flex space-x-2">
          <button 
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-white border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="px-3 py-1 bg-orange-500 text-white rounded">
            {{ currentPage }}
          </span>
          <button 
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-white border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { torrentPath } from '~/utils/torrentUrl'
const props = defineProps({
  torrents: {
    type: Array,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    default: 'Popular Torrents'
  },
  showPagination: {
    type: Boolean,
    default: false
  },
  totalItems: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  itemsPerPage: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['torrent-click', 'uploader-click', 'download', 'magnet', 'page-change'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))
const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1)
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems))

const getSeedersClass = (seeders) => {
  if (seeders > 100) return 'bg-green-500 text-white'
  if (seeders > 50) return 'bg-yellow-500 text-white'
  return 'bg-red-500 text-white'
}

const getLeechersClass = (leechers) => {
  if (leechers > 50) return 'bg-red-500 text-white'
  if (leechers > 20) return 'bg-orange-500 text-white'
  return 'bg-green-500 text-white'
}

const handleTorrentClick = (torrent) => {
  emit('torrent-click', torrent)
  const path = torrentPath(torrent)
  if (path) navigateTo(path)
}

const handleUploaderClick = (uploader) => {
  emit('uploader-click', uploader)
  // Default behavior: navigate to uploader profile
  navigateTo(`/uploader/${uploader}`)
}

const handleDownload = (torrent) => {
  emit('download', torrent)
  // In a real app, this would trigger the actual download  
}

const handleMagnet = (torrent) => {
  emit('magnet', torrent)
  // In a real app, this would copy magnet link or open torrent client 
}

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit('page-change', props.currentPage + 1)
  }
}
</script>

<style scoped>
table {
  font-size: 14px;
}

tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

tbody tr:hover {
  background-color: #e2e8f0;
}
</style>