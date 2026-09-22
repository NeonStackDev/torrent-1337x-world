<script setup>

import AppLayout from '~/layouts/AppLayout.vue';
import { torrentPath } from '~/utils/torrentUrl'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ref, reactive } from "vue";
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

const { $torrentApi } = useNuxtApp()
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const itemToDelete = ref(null);
const currentItem = ref(null);
const form = reactive({
  name: '',
  description: ''
});
dayjs.extend(relativeTime)
const uploads = ref([]);
const parseDateString = (str) => {
  const now = dayjs();
  // If it's ISO string, parse directly
  if (dayjs(str, dayjs.ISO_8601, true).isValid()) {
    return dayjs(str);
  }
  // Remove ordinal suffixes
  str = str.replace(/(\d+)(st|nd|rd|th)/gi, '$1');
  // Remove apostrophe year and fix
  str = str.replace(/'(\d{2})/, '20$1');

  // Remove dots from months
  str = str.replace(/\./g, '');

  // If only time is provided, use today
  if (/^\d{1,2}(:\d{2})?(am|pm)$/i.test(str)) {
    return dayjs(
      `${now.format("YYYY-MM-DD")} ${str}`,
      ["YYYY-MM-DD h:mma", "YYYY-MM-DD ha"]
    );
  }

  // Try multiple formats
  const formats = [
    "ha MMM D YYYY",
    "h:mma MMM D YYYY",
    "MMM D YYYY ha",
    "MMM D YYYY h:mma",
    "MMM D YYYY" // no time
  ];

  return dayjs(str, formats);
};

const formatApprovedAt = (dateString) => {
  const date = parseDateString(dateString);
  const now = dayjs();

  if (!date.isValid()) return "Invalid date";

  if (date.isSame(now, 'day')) {
    // Today → show time
    return date.format('h:mma');
  } else {
    // Not today → show only date with year
    return date.format('MMM. D, YYYY');
  }
};
const emit = defineEmits(["delete", 'edit']);


function openEditModal(item) {
  currentItem.value = item;
  form.name = item.name || '';
  form.description = item.detail.description || '';
  showEditModal.value = true;
}
function openDeleteModal(item) {
  itemToDelete.value = item;
  showDeleteModal.value = true;
}
function closeEditModal() {
  showEditModal.value = false;
  currentItem.value = null;
}

function confirmEdit() {
  // Emit the updated data
  emit('edit', { ...currentItem.value, ...form });

  // Close modal
  closeEditModal();
}
function closeDeleteModal() {
  showDeleteModal.value = false;
  itemToDelete.value = null;
}

function confirmDelete() {
  emit("delete", itemToDelete.value);
  deleteUploadTorrent(itemToDelete.value.id)
  closeDeleteModal();
}
// Delete Torrent
async function deleteUploadTorrent(id) {
  $torrentApi.deleteTorrent(id)
    .then(res => {
      uploads.value = uploads.value.filter(function (row) {
        return row.id != id;
      })
    })
    .catch(err => console.error(err));
}



async function fetchTorrents() {
  try {
    const response = await $torrentApi.getUploadTorrents();
    uploads.value = response.data
    // For demo, assuming all torrents in one group with title "All Torrents" 
  } catch (error) {
    console.error('Failed to fetch torrents:', error)
  }


}

onMounted(() => {
  fetchTorrents();
});
</script>

<template>

  <AppLayout>
    <div>
      <!-- Popular Torrents Section -->
      <div class="featured-list bg-gray-800 rounded-lg">
        <div class="featured-heading bg-gradient-to-r from-orange-400 to-red-500 px-4 py-3 flex items-center">
          <h2 class="text-white font-bold">
            <span class="featured-icon">
              <i :class=icon></i>
            </span>
            Your Torrents Uploads
          </h2>
        </div>

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
                <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">remove
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="uploads.length > 0" v-for="(torrent, index) in uploads" :key="index"
                class="border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer text-xs">
                <td class="px-2 py-3">
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
                  <button hidden @click="openEditModal(torrent)" class="p-2 hover:text-blue-500 transition"
                    title="Edit">
                    <PencilIcon class="w-5 h-5" />
                  </button>
                  <button @click="openDeleteModal(torrent)" class="p-2 hover:text-red-500 transition" title="Delete">
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </td>

              </tr>
              <tr v-if="uploads.length == 0">
                <td colspan="6" class="text-center py-4 text-gray-500">No torrents found</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Delete Confirmation
        </h2>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete <span class="font-bold">{{ itemToDelete?.name }}</span>?
          This action cannot be undone.
        </p>

        <div class="flex justify-end space-x-3">
          <button @click="closeDeleteModal" class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700">
            Cancel
          </button>
          <button @click="confirmDelete" class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
