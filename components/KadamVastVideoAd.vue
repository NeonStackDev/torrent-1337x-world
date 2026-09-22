<template>
  <ClientOnly>
    
  </ClientOnly>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const VAST_URL = '/api/kadam-vast'
const MAX_WRAPPER_DEPTH = 3

const isDesktop = ref(false)
const mediaUrl = ref('')
const clickThroughUrl = ref('')
const videoRef = ref<HTMLVideoElement | null>(null)
const trackingEvents = ref<Record<string, string[]>>({})
const trackedEvents = new Set<string>()

function updateDesktop() {
  if (process.server) return
  isDesktop.value = window.innerWidth >= 1024
}

function textContent(parent: Element, selector: string) {
  return parent.querySelector(selector)?.textContent?.trim() || ''
}

function fireTrackingUrls(urls: string[] = []) {
  urls.forEach((url) => {
    if (!url) return
    const pixel = new Image()
    pixel.src = url
  })
}

function collectTracking(documentNode: Document) {
  const events: Record<string, string[]> = {}
  documentNode.querySelectorAll('Tracking').forEach((tracking) => {
    const eventName = tracking.getAttribute('event')
    const url = tracking.textContent?.trim()
    if (!eventName || !url) return
    events[eventName] = events[eventName] || []
    events[eventName].push(url)
  })
  return events
}

function chooseMediaFile(documentNode: Document) {
  const mediaFiles = Array.from(documentNode.querySelectorAll('MediaFile'))
  const mp4Media = mediaFiles.find((file) => file.getAttribute('type')?.includes('mp4'))
  return (mp4Media || mediaFiles[0])?.textContent?.trim() || ''
}

async function fetchVast(url: string, depth = 0): Promise<Document> {
  const response = await fetch(url, { cache: 'no-store' })
  const xml = await response.text()
  const documentNode = new DOMParser().parseFromString(xml, 'application/xml')
  const wrapperUrl = textContent(documentNode.documentElement, 'Wrapper VASTAdTagURI')

  if (wrapperUrl && depth < MAX_WRAPPER_DEPTH) {
    return fetchVast(wrapperUrl, depth + 1)
  }

  return documentNode
}

async function loadVideoAd() {
  if (!isDesktop.value || mediaUrl.value) return

  try {
    const vastDocument = await fetchVast(VAST_URL)
    trackingEvents.value = collectTracking(vastDocument)
    mediaUrl.value = chooseMediaFile(vastDocument)
    clickThroughUrl.value = textContent(vastDocument.documentElement, 'ClickThrough')

    fireTrackingUrls(Array.from(vastDocument.querySelectorAll('Impression')).map((item) => item.textContent?.trim() || ''))

    await nextTick()
    await videoRef.value?.play().catch(() => undefined)
  } catch (error) {
    console.warn('Kadam VAST video ad failed to load', error)
  }
}

function trackOnce(eventName: string) {
  if (trackedEvents.has(eventName)) return
  trackedEvents.add(eventName)
  fireTrackingUrls(trackingEvents.value[eventName])
}

onMounted(() => {
  updateDesktop()
  window.addEventListener('resize', updateDesktop)
  loadVideoAd()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDesktop)
})

watch(isDesktop, loadVideoAd)
</script>

<style scoped>
.vast-video-ad {
  position: fixed;
  top: 245px;
  left: 8px;
  z-index: 20;
  width: 260px;
  padding: 4px;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 4px;
  box-shadow: 0 12px 24px rgb(0 0 0 / 28%);
}

.vast-video-ad__link,
.vast-video-ad__player {
  display: block;
  width: 100%;
}

.vast-video-ad__player {
  aspect-ratio: 16 / 9;
  height: auto;
  background: #000;
}

.vast-video-ad__placeholder {
  min-height: 146px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d1d5db;
  font-size: 13px;
  background: #000;
}

@media (max-width: 1023px) {
  .vast-video-ad {
    display: none;
  }
}
</style>
