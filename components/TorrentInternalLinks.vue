<template>
  <div v-if="relatedItems.length" class="space-y-4 mb-4">
    <section class="bg-gray-800 rounded overflow-hidden">
      <div class="bg-gradient-to-r from-orange-400 to-red-500 px-4 py-2">
        <h2 class="text-white font-bold text-sm">
          <a
            v-if="categorySlug"
            :href="`/cat/${categorySlug}/1`"
            class="hover:underline"
          >Related Torrents</a>
          <span v-else>Related Torrents</span>
        </h2>
      </div>
      <ul class="divide-y divide-gray-700">
        <li v-for="item in relatedItems" :key="item.id" class="px-4 py-2 text-sm hover:bg-gray-750">
          <a
            :href="`/torrent/${item.id}/${item.slugged_title}`"
            class="text-gray-300 hover:text-orange-400 transition-colors"
          >
            {{ item.name }}
          </a>
          <span class="text-gray-500 ml-2 text-xs">{{ item.size }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  related: { type: Array, default: () => [] },
  categorySlug: { type: String, default: '' },
  currentId: { type: [String, Number], required: true },
})

const relatedItems = computed(() =>
  (props.related || [])
    .filter((item) => String(item.id) !== String(props.currentId))
    .slice(0, 8)
)
</script>
