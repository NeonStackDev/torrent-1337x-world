<template>
  <section v-if="hasContent" class="bg-gray-800 rounded mb-4 p-4 text-sm text-gray-300 space-y-4">
    <h2 class="text-lg font-semibold text-white">About {{ title }}</h2>

    <div v-if="overview" class="space-y-1">
      <h3 class="text-gray-400 font-medium">Overview</h3>
      <p class="break-words">{{ overview }}</p>
    </div>

    <div v-if="isMovie && (genreText || releaseYear || cast)" class="grid md:grid-cols-3 gap-3">
      <div v-if="genreText">
        <h3 class="text-gray-400 font-medium">Genre</h3>
        <p>{{ genreText }}</p>
      </div>
      <div v-if="releaseYear">
        <h3 class="text-gray-400 font-medium">Release Year</h3>
        <p>{{ releaseYear }}</p>
      </div>
      <div v-if="cast">
        <h3 class="text-gray-400 font-medium">Cast</h3>
        <p>{{ cast }}</p>
      </div>
    </div>

    <div v-if="isSoftware && (features || systemRequirements)" class="space-y-3">
      <div v-if="features">
        <h3 class="text-gray-400 font-medium">Features</h3>
        <p>{{ features }}</p>
      </div>
      <div v-if="systemRequirements">
        <h3 class="text-gray-400 font-medium">System Requirements</h3>
        <p>{{ systemRequirements }}</p>
      </div>
    </div>

    <div v-if="faqs.length" class="space-y-3 border-t border-gray-700 pt-4">
      <h3 class="text-gray-400 font-medium">Frequently Asked Questions</h3>
      <div v-for="(faq, index) in faqs" :key="index" class="space-y-1">
        <h4 class="text-white font-medium">{{ faq.question }}</h4>
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  overview: { type: String, default: '' },
  genreText: { type: String, default: '' },
  releaseYear: { type: String, default: '' },
  cast: { type: String, default: '' },
  features: { type: String, default: '' },
  systemRequirements: { type: String, default: '' },
  faqs: { type: Array, default: () => [] },
  isMovie: { type: Boolean, default: false },
  isSoftware: { type: Boolean, default: false },
})

const hasContent = computed(() =>
  props.overview ||
  props.genreText ||
  props.releaseYear ||
  props.cast ||
  props.features ||
  props.systemRequirements ||
  props.faqs.length > 0
)
</script>
