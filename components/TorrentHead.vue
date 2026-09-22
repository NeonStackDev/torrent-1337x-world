<template>
  <div>
    <!-- Status Message -->
    <div class="bg-gray-200 rounded p-4">
      <h1 class="text-red-600 font-semibold mb-2">1337x.world is your trusted torrent site for movies, TV series, music,
        games, and software. Explore high-quality torrent downloads updated daily in 2026.</h1>
      <p class="text-gray-700 text-sm mb-2">
        Welcome to <span class="font-mono text-orange-600">1337x.world</span>, your go-to destination for seamless
        streaming
        and online media enjoyment.
      </p>
      <p class="text-gray-700 text-sm mb-2">Whether you’re a casual viewer or a passionate movie buff, we provide a
        platform that prioritizes quality, speed, and reliability.
      </p>
      <p class="text-gray-700 text-sm mb-2">
        With 1331x.c, you can access a wide variety of content, including movies, TV shows, documentaries, and more, all
        available in high-definition.
      </p>
      <p class="text-gray-700 text-sm mb-2">
        Our site is designed for easy navigation, ensuring a hassle-free experience from start to finish.
      </p>
      <p class="text-gray-700 text-sm">
        Getting started with 1337x.world is simple. Just visit our homepage, browse through our extensive library, and
        start streaming in seconds.
      </p>
      <p class="text-gray-700 text-sm">
        If you're facing any restrictions due to regional access, we provide Tor onion support for additional privacy
        and ease of access.
      </p>
    </div>

    <!-- Movie Posters -->
    <div class="hidden md:block relative w-full overflow-hidden mt-2">
      <!-- Slide container -->
      <div class="flex transition-transform duration-500"
        :style="{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }">
        <div v-for="(movie) in moviePosters" :key="movie.id" class="flex-shrink-0 slide-item"
          :style="{ '--visible-count': visibleCount }">
          <div
            class="m-1 bg-gray-800 aspect-[3/5] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-orange-500/20 transition-[property] duration-300 hover:scale-105">
            <div class="w-full h-full bg-gradient-to-br from-orange-700 to-red-800 flex items-center justify-center">
              <a :href="movie.link">
                <div class="text-white text-center">
                  <img :src="movie.image_url" :alt="movie.alt_name" loading="lazy" class="mx-auto mb-2 rounded"
                    width="123" height="182">
                  <div class="text-2xs opacity-75">{{ movie.quality }}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Prev Button -->
      <button @click="prevSlide" aria-label="prev"
        class="absolute top-1/2 left-0 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-r">
        ‹
      </button>

      <!-- Next Button -->
      <button @click="nextSlide" aria-label="next"
        class="absolute top-1/2 right-0 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-l">
        ›
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'


const props = defineProps({
  images: {
    type: Array,
  },

});

const visibleCount = ref(6); // number of slides visible
const currentIndex = ref(0);
let slideInterval = null; // to store setInterval reference



const moviePosters = ref([])
moviePosters.value = props.images ? props.images : [];

let resizeTick = false;
function onResizeThrottled() {
  if (!resizeTick) {
    resizeTick = true;
    requestAnimationFrame(() => {
      updateVisibleCount();
      resizeTick = false;
    });
  }
}

function nextSlide() {
  if (currentIndex.value < moviePosters.value.length - visibleCount.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // loop back to start
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = moviePosters.value.length - visibleCount.value; // go to last group
  }
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 3000); // change every 3 seconds
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

onMounted(() => {
  startAutoSlide();
  // Initialize component, fetch data, etc.
  updateVisibleCount()
  window.addEventListener('resize', onResizeThrottled, { passive: true })
})

onBeforeUnmount(() => {
  stopAutoSlide();
  //
  window.removeEventListener('resize', onResizeThrottled)
});

function updateVisibleCount() {
  if (window.innerWidth < 640) { // Tailwind's `sm` breakpoint
    visibleCount.value = 3;
  } else {
    visibleCount.value = 6;
  }
}

</script>
<style>
.slide-item {
  width: calc(100% / var(--visible-count));
}
</style>
