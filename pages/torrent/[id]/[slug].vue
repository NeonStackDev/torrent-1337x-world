<template>
  <AppLayout>
    <div v-if="isUploading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <!-- Spinner -->
      <div class="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-if="torrent" class="mt-2">
      <KadamVastVideoAd />
      <!-- Main Content -->
      <nav aria-label="Breadcrumb" class="text-xs text-gray-400 mb-2 px-1">
        <ol class="flex flex-wrap items-center gap-1">
          <li><a href="/" class="hover:text-orange-400">Home</a></li>
          <li v-if="torrent.category_name && torrent.category_slug" class="before:content-['/'] before:mx-1">
            <a :href="`/cat/${torrent.category_slug}/1`" class="hover:text-orange-400">{{ torrent.category_name }}</a>
          </li>
          <li class="before:content-['/'] before:mx-1 text-gray-300 truncate max-w-xs">{{ torrent.name }}</li>
        </ol>
      </nav>
      <!-- Title -->
      <div class="bg-gray-700 px-4 py-2 gap-2 rounded-t flex justify-between">
        <input v-if="isLoggedIn" input type="text" placeholder="Add a title"
          class="w-full px-2 py-1 border border-sky-500 bg-gray-700" v-model="torrent_name" />
        <h1 v-else class="text-lg font-semibold min-w-0 flex-1 break-words">{{ torrent.name }}</h1>
        <div v-if="isLoggedIn" class="flex gap-4">
          <button @click="updateTorrent()"
            class="bg-cyan-700 hover:bg-cyan-500 text-white px-4 py-1 rounded flex items-center justify-center font-semibold">
            Update
          </button>
          <button @click="deleteTorrent(torrent.id)"
            class="bg-orange-600 hover:bg-orange-300 text-white px-4 py-1 rounded flex items-center justify-center font-semibold">
            Delete
          </button>
        </div>
      </div>

      <!-- Torrent Info -->
      <div class="bg-gray-800 rounded-b mb-4">
        <div class="grid lg:grid-cols-3 gap-2 p-4 text-sm">
          <div class="space-y-2">
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Category</span>
              <span>
                : <a
                  v-if="torrent.category_slug"
                  :href="`/cat/${torrent.category_slug}/1`"
                  class="text-green-400 hover:text-orange-400"
                >{{ torrent.category_name }}</a>
                <template v-else>{{ torrent.category_name }}</template>
              </span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Type</span>
              <span>: {{ torrent.subcategory_name }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Language</span>
              <span>: {{ torrent.language }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Total Size</span>
              <span>: {{ torrent.size }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Uploaded By</span>
              <a :href="`/user/${torrent.uploaded_by}/1`"><span class="text-green-400">: {{ torrent.uploaded_by
              }}</span></a>
            </div>
          </div>
          <div class="space-y-2">
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Downloads</span>
              <span v-if="isLoggedIn">: <input type="text" v-model="torrent_download_count"
                  class="w-32 px-2 text-gray-700 border-gray-300 rounded-md" /></span>
              <span v-else class="text-green-400">: {{ torrent.downloads }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Last checked</span>
              <span>: {{ torrent.uploaded_ago }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Date uploaded</span>
              <span>: {{ torrent.uploaded_ago }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Seeders</span>
              <span v-if="isLoggedIn">: <input type="text" v-model="torrent_seeders"
                  class="w-32 px-2 text-gray-700 border-gray-300 rounded-md" /></span>
              <span v-else class="text-green-400">: {{ torrent.seeders }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-400">Leechers</span>
              <span v-if="isLoggedIn">: <input type="text" v-model="torrent_leechers"
                  class="w-32 px-2 text-gray-700 border-gray-300 rounded-md" /></span>
              <span v-else class="text-red-400">: {{ torrent.leechers }}</span>
            </div>
          </div>
          <!-- Download Buttons -->
          <div class="space-y-2">
            <button
              v-if="torrent.magnet_link"
              type="button"
              @click="downloadNextLink(torrent.id, torrent.magnet_link)"
              rel="noreferrer"
              class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 font-semibold"
            >
              <i class="flaticon-torrent-download"></i>
              <span>MAGNET DOWNLOAD</span>
            </button>
            <button
              v-else
              type="button"
              disabled
              class="w-full bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 font-semibold opacity-60 cursor-not-allowed"
            >
              <i class="flaticon-torrent-download"></i>
              <span>MAGNET UNAVAILABLE</span>
            </button>
            <button type="button" @click="downloadTorrent"
              class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 font-semibold">
              <i class="flaticon-two-down-arrows"></i>
              <span>TORRENT DOWNLOAD</span>
            </button>
            <transition name="slide">
              <div v-if="showDropdown" class="dropdown">
                <a :href="`http://itorrents.org/torrent/${torrent.infohash}.torrent`" target="_blank">ITORRENTS
                  MIRROR</a>
                <a :href="`http://torrage.info/torrent.php?h=${torrent.infohash}`" target="_blank">TRRAGE
                  MIRROR</a>
                <a :href="`http://btcache.me/torrent/${torrent.infohash}`" target="_blank">BTCACHE MIRROR</a>
                <a :href="torrent.magnet_link">NONE WORKING? USERMAGNET</a>
              </div>

            </transition>
            <a v-if="torrent.media_info" :href="torrent.media_info" target="_blank"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 font-semibold">
              <i class="flaticon-arw-down"></i>
              <span>PLAY NOW (STREAM)</span>
            </a>

            <button type="button" @click="openDirectDownload"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 font-semibold">
              <i class="flaticon-download"></i>
              <span>DIRECT DOWNLOAD</span>
            </button>
          </div>
        </div>
        <!-- poster box & detail -->
        <div v-if="isLoggedIn">
          <div class="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 p-2 gap-2">
            <div class="col-1">
              <div v-if="torrent.cover_image && coverImage" class="relative">
                <button @click="removeImage"
                  class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700">
                  ✕
                </button>
                <img :src="torrent.cover_image" :alt="torrent.title" class="h-56 w-auto mx-auto mb-2 rounded">
              </div>
              <div v-else class="bg-gray-700 w-full h-56 content-center text-center">
                <!-- Hidden file input -->
                <input v-if="!previewUrl" ref="fileInput" type="file" class="hidden" @change="handleFileChange" />
                <!-- Image preview -->
                <span v-if="!previewUrl" @click="openFilePicker"
                  class="text-gray-400 select-none  cursor-pointer py-12">Add a poster image</span>
                <div v-if="previewUrl" class="relative inline-block">
                  <button @click="removePreviewImage"
                    class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700">
                    ✕
                  </button>
                  <img :src="previewUrl" alt="Preview" class="h-56 w-auto mx-auto mb-2 rounded" />
                </div>
              </div>
            </div>

            <div class="col-span-3 lg:col-span-4 md:grid-cols-3 space-y-2">
              <div>
                <span class="text-gray-400">* the title for SEO ( please write within 65 characters. now {{ titleLength
                }})</span>
                <input @input="onTitleInput" type="text" placeholder="Add a title" class="w-full px-2 py-1 bg-gray-700"
                  v-model="torrent_title" />
              </div>
              <div>
                <span class="text-gray-400">* the poster name for SEO</span>
                <input type="text" placeholder="Add a poster description" class="w-full px-2 bg-gray-700"
                  v-model="torrent_poster_alt" />
              </div>
              <div>
                <span class="text-gray-400">* the genre for SEO (keep `span` tag)</span>
                <input type="text" placeholder="Add a genre" class="w-full px-2 bg-gray-700" v-model="torrent_genre" />
              </div>
              <div>
                <span class="text-gray-400">* the description for SEO ( please write within 150 characters. now {{
                  descriptionLength }} )</span>
                <textarea @input="onDescriptionInput" class="w-full px-3 py-2 bg-gray-700" rows="5"
                  v-model="torrent_description">
                    </textarea>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="torrent.cover_image" class="grid lg:grid-cols-5 md:grid-cols-4 pt-2 border-t border-gray-700">
          <div class="col-1">
            <img v-if="torrent.cover_image != null" :src="torrent.cover_image"
              :alt="torrent.poster_alt ? torrent.poster_alt : torrent.title ? torrent.title : torrent.name"
              class="h-56 w-auto mx-auto mb-2 rounded">
          </div>
          <div class="lg:col-span-4 md:grid-cols-3 px-2">
            <h3 class="text-2xl text-red-400 break-all md:break-normal">{{ torrent.title ? torrent.title : torrent.name
            }}</h3>
            <div class="torrent-slogan text-orange-700">
              <p v-if="torrent.slogan" v-html="torrent.slogan"></p>
            </div>
            <p class="text-gray-400 break-all md:break-normal" v-if="torrent.description">{{ torrent.description }}</p>
          </div>
        </div>

      </div>

      <!-- Hash -->
      <div class="text-center text-xs text-black mb-4">
        <span class="font-semibold">INFO HASH:</span> {{ torrent.infohash }}
      </div>
<TorrentSeoBlocks
        v-if="!isLoggedIn && seoContent"
        :title="seoContent.pageTitle"
        :overview="seoContent.overview"
        :genre-text="seoContent.genreText"
        :release-year="seoContent.releaseYear"
        :cast="seoContent.cast"
        :features="seoContent.features"
        :system-requirements="seoContent.systemRequirements"
        :faqs="seoContent.faqs"
        :is-movie="seoContent.isMovie"
        :is-software="seoContent.isSoftware"
      />

      <TorrentInternalLinks
        v-if="!isLoggedIn"
        :current-id="torrent.id"
        :related="relatedTorrents"
        :category-slug="torrent.category_slug"
      />

      <!-- Tabs -->
      <div class="bg-gray-800 rounded">
        <div class="flex border-b border-gray-700">
          <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
            'px-4 py-2 text-sm font-medium',
            activeTab === tab
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:text-white'
          ]">
            {{ tab }}
          </button>
        </div>
        <div class="p-2">
          <div v-if="activeTab === 'DESCRIPTION'">
            <tiptap-editor v-if="isLoggedIn" v-model="torrent_description_html" />
            <div v-if="!isLoggedIn && torrent?.content" class="relative">
              <div v-html="torrent.content"
                class="text-gray-300 prose break-words custom-html image-loading-container"></div>
            </div>
          </div>
          <div v-else-if="activeTab === 'FILES'">
            <div v-if="torrent?.files" v-html="torrent.files" class="text-gray-300 prose break-words custom-html"></div>
          </div>

          <div v-else-if="activeTab === 'COMMENTS'">
            <div v-if="torrent?.comments" v-html="torrent.comments" class="text-gray-300 prose break-words custom-html">
            </div>
          </div>

        </div>
      </div>
    </div>
  </AppLayout>
</template>
<script setup>
import AppLayout from '~/layouts/AppLayout.vue'
import TiptapEditor from '~/components/TiptapEditor.vue'
import TorrentSeoBlocks from '~/components/TorrentSeoBlocks.vue'
import TorrentInternalLinks from '~/components/TorrentInternalLinks.vue'
import { useTorrentSeo } from '~/composables/useTorrentSeo'
import { useAuth } from '~/utils/useAuth'
import {
  needsTorrentSlugRedirect,
  torrentCanonicalPath,
} from '~/utils/torrentUrl'
import { openMagnetLink, openUrl, resolveDirectDownloadUrl } from '~/utils/download'
import { isMovieCategory, isSoftwareCategory } from '~/utils/seo'

const route = useRoute()
const config = useRuntimeConfig()
const { token, setAuth } = useAuth()

const isLoggedIn = computed(() => !!token.value)

const { $torrentApi, $downloadNextLink } = useNuxtApp()

const downloadNextLink = (id, magnet) => {
  $downloadNextLink(id, magnet)
}


/* ---------------------------
   AUTH (CLIENT ONLY)
----------------------------*/
onMounted(() => {
  const stored = localStorage.getItem('token')
  if (!stored || token.value) {
    return
  }

  try {
    setAuth(JSON.parse(localStorage.getItem('user')), stored)
  } catch {
    setAuth(null, stored)
  }
})

/* ---------------------------
   SSR SAFE DATA FETCH (IMPORTANT FIX)
----------------------------*/
const { data: torrent, error } = await useAsyncData(
  `torrent-${route.params.id}-${route.params.slug}`,
  () =>
    $fetch(
      `${config.public.apiBase}/torrent/get/${route.params.id}/${route.params.slug}`
    )
)

/* ---------------------------
   404 HANDLING
   Return a real 404 (not a soft-404 redirect to home) so Google drops
   dead URLs instead of treating them as duplicates of the homepage.
----------------------------*/
if (error.value?.statusCode === 404 || !torrent.value) {
  throw createError({ statusCode: 404, statusMessage: 'Torrent not found' })
}

/* ---------------------------
   SSR CANONICAL REDIRECT (301)
   wrong slug, Title-Case, legacy long slug → slugged_title
----------------------------*/
if (torrent.value?.slugged_title && needsTorrentSlugRedirect(route.params.slug, torrent.value.slugged_title)) {
  await navigateTo(
    torrentCanonicalPath(route.params.id, torrent.value.slugged_title),
    { redirectCode: 301 }
  )
}

/* ---------------------------
   COMPUTED SAFE VALUES (NO WATCH EFFECT)
----------------------------*/
const form = computed(() => {
  if (!torrent.value) return null

  return {
    name: torrent.value.name,
    title: truncate(torrent.value.title || torrent.value.name, 56),
    description: torrent.value.description,
    genre: torrent.value.slogan,
    poster_alt: torrent.value.poster_alt,
    cover_image: torrent.value.cover_image,
    downloads: torrent.value.downloads,
    seeders: torrent.value.seeders,
    leechers: torrent.value.leechers,
    html: torrent.value.content
  }
})

/* ---------------------------
   SEO + STRUCTURED DATA
----------------------------*/
const relatedTorrents = computed(() => torrent.value?.related_torrents || [])
const seoContent = ref(null)

if (torrent.value) {
  const seo = useTorrentSeo({
    id: torrent.value.id,
    slugged_title: torrent.value.slugged_title,
    title: torrent.value.title,
    name: torrent.value.name,
    description: torrent.value.description,
    content: torrent.value.content,
    cover_image: torrent.value.cover_image,
    category_name: torrent.value.category_name,
    category_slug: torrent.value.category_slug,
    subcategory_name: torrent.value.subcategory_name,
    subcategory_id: torrent.value.subcategory_id,
    size: torrent.value.size,
    seeders: torrent.value.seeders,
    slogan: torrent.value.slogan,
  })

  seoContent.value = {
    ...seo,
    isMovie: isMovieCategory(torrent.value.category_name),
    isSoftware: isSoftwareCategory(torrent.value.category_name),
  }
}

/* ---------------------------
   UI STATE
----------------------------*/
const isUploading = ref(false)
const activeTab = ref('DESCRIPTION')
const showDropdown = ref(false)
const tabs = ['DESCRIPTION', 'FILES', 'COMMENTS']


const torrent_name = ref('')
const torrent_download_count = ref('')
const torrent_seeders = ref('')
const torrent_leechers = ref('')
const torrent_title = ref('')
const torrent_poster_alt = ref('')
const torrent_genre = ref('')
const torrent_description = ref('')
const torrent_description_html = ref('')
const coverImage = ref(false)

const fileInput = ref(null)
const selectedFile = ref(null)
const previewUrl = ref(null)

watchEffect(() => {
  if (!torrent.value) return

  torrent_name.value = torrent.value.name || ''
  torrent_download_count.value = torrent.value.downloads ?? ''
  torrent_seeders.value = torrent.value.seeders ?? ''
  torrent_leechers.value = torrent.value.leechers ?? ''
  torrent_title.value = torrent.value.title || torrent.value.name || ''
  torrent_poster_alt.value = torrent.value.poster_alt || ''
  torrent_genre.value = torrent.value.slogan || ''
  torrent_description.value = torrent.value.description || ''
  torrent_description_html.value = torrent.value.content || ''
  coverImage.value = !!torrent.value.cover_image
})

const removeImage = () => {
  if (!torrent.value) return
  torrent.value.cover_image = null
  coverImage.value = false
}

const removePreviewImage = () => {
  previewUrl.value = null
  selectedFile.value = null
}

const downloadTorrent = () => {
  showDropdown.value = !showDropdown.value
}

const openDirectDownload = () => {
  if (!torrent.value) return

  const url = resolveDirectDownloadUrl(torrent.value)
  if (!url) return

  if (url.startsWith('magnet:')) {
    openMagnetLink(url)
    return
  }

  openUrl(url, true)
}


/* ---------------------------
   FILE HANDLING
----------------------------*/
const handleFileChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const openFilePicker = () => fileInput.value?.click()

/* ---------------------------
   UPDATE TORRENT
----------------------------*/
const updateTorrent = async () => {
  if (!torrent.value || !confirm('Update torrent?')) return

  try {
    isUploading.value = true

    let image = form.value.cover_image

    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('image', selectedFile.value)

      const res = await $fetch(config.public.apiImageUrl, {
        method: 'POST',
        query: { key: config.public.apiImageKey },
        body: formData
      })

      image = res.data.url
    }

    await $torrentApi.saveTorrent({
      id: torrent.value.id,
      cover_image: image,
      name: form.value.name,
      title: form.value.title,
      genre: form.value.genre,
      poster_alt: form.value.poster_alt,
      description: form.value.description,
      seeders: form.value.seeders,
      download_count: form.value.downloads,
      leechers: form.value.leechers,
      description_html: form.value.html
    })

    goBack()
  } finally {
    isUploading.value = false
  }
}

/* ---------------------------
   DELETE
----------------------------*/
const deleteTorrent = async (id) => {
  if (!confirm('Delete torrent?')) return
  await $torrentApi.deleteTorrent(id)
  goBack()
}

/* ---------------------------
   UTILS
----------------------------*/
function goBack() {
  window.location.href = document.referrer || '/'
}

function truncate(text, max) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max - 1) + '…' : text
}

function cleanDescription(text) {
  if (!text) return ''
  return text.replace(/<img[^>]*>/gi, '').replace(/<[^>]*>/g, '').slice(0, 150)
}


</script>
<style>
.torrent-slogan p {
  margin-top: 3px;
}

.torrent-slogan p span {
  margin-right: 12px;
}

.btn {
  display: block;
  width: 250px;
  padding: 10px;
  color: white;
  font-weight: bold;
  text-align: left;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
}

.btn .icon {
  margin-right: 8px;
}

.torrent {
  background-color: #a63b20;
}

/* Dropdown styles */
.dropdown {
  background: #8b1818;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-bottom: 5px;
}

.dropdown a {
  color: white;
  text-decoration: none;
  padding: 5px;
  font-weight: bold;
  padding-top: 6px;

}

.dropdown a:hover {
  background: #313030;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
  /* adjust for more links */
  opacity: 1;
}

/* Image progress bar styles */
.image-progress-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;
}

.image-progress-wrapper img {
  display: block;
  width: 100%;
  height: auto;
}

.image-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.image-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f97316, #ef4444, #dc2626);
  width: 0%;
  transition: width 0.2s ease;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}

/* Ensure images in content are properly styled */
.image-loading-container img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem 0;
}
</style>


