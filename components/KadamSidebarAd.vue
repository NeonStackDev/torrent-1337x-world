<template>
  <ClientOnly>
    <div v-if="isDesktop" class="kadam-sidebar-ad">
      <div class="fsfZTH449817 kadam-unit"></div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const KADAM_UNIT_ID = 'fsfZTH449817'
const KADAM_SCRIPT_ID = 'kadam-loader-ftq249y9'
const KADAM_SCRIPT_SRC = 'https://hdbkome.com/ftq249y9.js'

const isDesktop = ref(false)

function updateDesktop() {
  if (process.server) return
  isDesktop.value = window.innerWidth >= 1024
}

function ensureKadamLoader() {
  window.k_init = window.k_init || []

  const alreadyQueued = window.k_init.some(
    (item) => item && item.id === KADAM_UNIT_ID
  )
  if (!alreadyQueued) {
    window.k_init.push({
      id: KADAM_UNIT_ID,
      type: 'bn',
      domain: 'hdbkome.com',
      refresh: false,
      next: 0
    })
  }

  if (document.getElementById(KADAM_SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = KADAM_SCRIPT_ID
  script.async = true
  script.charset = 'utf-8'
  script.setAttribute('data-cfasync', 'false')
  script.src = KADAM_SCRIPT_SRC
  document.head.appendChild(script)
}

onMounted(() => {
  updateDesktop()
  window.addEventListener('resize', updateDesktop)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDesktop)
})

watch(isDesktop, async (desktop) => {
  if (!desktop) return
  await nextTick()
  ensureKadamLoader()
}, { immediate: true })
</script>

<style scoped>
.kadam-sidebar-ad {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.kadam-unit {
  width: 100%;
  max-width: 300px;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: visible;
}

.fsfZTH449817 {
  width: 100%;
}

.fsfZTH449817 :deep(iframe) {
  display: block !important;
  width: 100% !important;
  height: 500px !important;
  border: 0 !important;
}

.kadam-unit :deep(iframe),
.kadam-unit :deep(ins),
.kadam-unit :deep(div),
.kadam-unit :deep(a),
.kadam-unit :deep(img) {
  max-width: 100% !important;
  max-height: none !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.kadam-unit :deep(img) {
  height: auto !important;
}
</style>
