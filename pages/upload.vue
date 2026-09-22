<script setup>
import AppLayout from '~/layouts/AppLayout.vue';


const { $torrentApi } = useNuxtApp()
import { useRouter } from 'vue-router'
import { ref, reactive, watch } from 'vue'
const router = useRouter()
const route = useRoute()
const isLoggedIn = ref(false)

const form = reactive({
  title: '',
  content: '',
  language: '',
  category: '',
  subcategory: '',
  tags: '',
  description: '',
  torrentFile: null
})


const config = useRuntimeConfig()
// fetch blog data from Laravel API (SSR)
const { data: categories } = await useFetch(`${config.public.apiBase}/categories`)

useHead({
  title: 'Upload torrent',
  meta: [
    { name: 'description', content: 'Upload movie torrent' },

    { property: 'og:title', content: 'Upload torrent' },
    { property: 'og:description', content: 'Upload movie torrent' },
    { property: 'og:image', content: '' },

  ]
})


onMounted(() => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
  if(isLoggedIn.value == false) {
    router.push('/login')
  } 
});

// react when category value changes
const category = ref('')
const subcategory = ref('')
const sub_categories = ref([])


watch(category, (newValue) => {
  form.category = newValue
  let cat = categories.value.filter(function (row) {
      return row.id == newValue;
  })
  sub_categories.value = cat[0]?.subcategory;
})
watch(subcategory, (newValue) => {
  form.subcategory = newValue
})

const isSubmitting = ref(false)
const selectedFilePath = ref('')
const showToast = ref(false)
const copiedUrl = ref(null)
const fileInput = ref(null)
const descriptionTextarea = ref(null)

const formatTools = ref(['Bold', 'Italic', 'Underline', 'Quote', 'Code', 'List', 'Link', 'Full Screen', 'Image', 'YouTube'])

// Methods
const openFileDialog = () => {
  fileInput.value.click()
}
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.torrentFile = file
    selectedFilePath.value = file.name
  }
}

const submitPost = async () => {
  isSubmitting.value = true
  try {
    // Validate required fields
    if (!form.title || !form.content || 
        !form.category || !form.subcategory || !form.torrentFile) {
      alert('Please fill in all required fields and select a torrent file')
      return
    }
    
    // Prepare FormData for file upload
    const formData = new FormData()

    // Add all form fields
    Object.keys(form).forEach(key => {
      if (key === 'torrentFile' && form[key]) {
        formData.append('torrent_file', form[key])
      } else if (form[key] && key !== 'torrentFile') {
        formData.append(key, form[key])
      }
    })

    const response = await $torrentApi.createTorrent(formData);
    
    if (response.data.success) {
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
        return navigateTo(route.path, { redirectCode: 302 })
      }, 3000)

    } else {
      alert(response.data.message)
    }

  } catch (error) {
    console.error('Error submitting post:', error)
  } finally {
    isSubmitting.value = false
  }
}

const applyFormat = (tool) => {
  const textarea = descriptionTextarea.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = form.description.substring(start, end)

  let formattedText = ''
  switch (tool) {
    case 'Bold':
      formattedText = `<b>${selectedText}</b>`
      break
    case 'Italic':
      formattedText = `<p style = 'font-style: italic'>${selectedText}</p>`
      break
    case 'Underline':
      formattedText = `<p style = 'text-decoration: underline'>${selectedText}</p>`
      break
    case 'Quote':
      formattedText = `<blockquote> ${selectedText}</blockquote>`
      break
    case 'Code':
      formattedText = `<code>${selectedText}</code>`
      break
    case 'List':
      formattedText = `<ul><li>${selectedText}</li></ul>`
      break
    case 'Link':
      formattedText = `<a href = '${selectedText}' ></a>`
      break
    case 'Image':
      formattedText = `<img src = ${selectedText} />`
      break
    case 'YouTube':
      formattedText = `<video src = ${selectedText} />`
      break
    default:
      formattedText = selectedText
  }

  form.description =
    form.description.substring(0, start) +
    formattedText +
    form.description.substring(end)

  nextTick(() => {
    textarea.focus()
    textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
  })
}



</script>
<template>

  <AppLayout>
    <div class="bg-slate-600 rounded">
      <div class="max-w-4xl mx-auto">
        <!-- Success Toast -->
        <div v-if="showToast"
          class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-[property] duration-300"
          :class="{ 'translate-y-0 opacity-100': showToast, 'translate-y-2 opacity-0': !showToast }">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"></path>
            </svg>
            Success to upload!
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="mx-auto text-white">
        <div class="shadow-lg p-4">
          <h2 class="text-2xl font-bold mb-6 border-b-2 border-orange-400 pb-2">
            Create New Blog Post
          </h2>

          <form @submit.prevent="submitPost" class="space-y-6">
            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-semibold mb-2">Title</label>
              <input type="text" id="title" v-model="form.title"
                class="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter post title" required>
            </div>

            <!-- Torrent File Upload -->
            <div>
              <label for="torrentFile" class="block text-sm font-semibold  mb-2">Torrent File</label>
              <div class="flex items-center gap-2">
                <!-- Hidden file input -->
                <input type="file" ref="fileInput" id="torrentFile" @change="handleFileSelect" accept=".torrent"
                  class="hidden text-gray-700">

                <!-- Display selected file path -->
                <input type="text" v-model="selectedFilePath" readonly
                  class="flex-1 px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none"
                  placeholder="No file selected">

                <!-- Browse button -->
                <button type="button" @click="openFileDialog"
                  class="bg-orange-400 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded transition-colors">
                  Browse
                </button>
              </div>
              <p class="text-xs  mt-1">Select a .torrent file to upload</p>
            </div>

            <!-- Content Text -->
            <div>
              <label for="content" class="block text-sm font-semibold  mb-2">Content Text</label>
              <textarea id="content" v-model="form.content" rows="6"
                class="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical"
                placeholder="Enter your blog post content here..." required></textarea>
            </div>

            <!-- Category Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Category and Type -->
              <div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="category" class="block text-sm font-semibold  mb-2">Category</label>
                    <select id="category" v-model="category" 
                      class="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required>
                      <option value="">Choose One</option>
                      <option v-for="cat in categories" :key="cat.id" :value="cat.id" >
                        {{ cat.name }}
                      </option>
                    </select>

                  </div>
                  <div>
                    <label for="subcategory" class="block text-sm font-semibold  mb-2">Type</label>
                    <select id="subcategory" v-model="subcategory"
                      class="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required>
                      <option value="">Choose sub category</option>
                      <option v-for="item in sub_categories" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div>
              <label for="tags" class="block text-sm font-semibold  mb-2">Tags</label>
              <input type="text" id="tags" v-model="form.tags"
                class="w-full text-gray-700  bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter tags separated by commas">
              <p class="text-xs mt-1">Use commas to separate multiple tags (e.g., web design, css, html)</p>
            </div>

            <!-- Format Description -->
            <div>
              <label for="description" class="block text-sm font-semibold  mb-2">Format Description</label>
              <div class="border border-gray-300 rounded-md p-3 bg-gray-50">
                <div class="flex flex-wrap gap-2 text-xs mb-3">
                  <button type="button" v-for="tool in formatTools" :key="tool" @click="applyFormat(tool)"
                    class="px-2 py-1 bg-gray-500 text-white hover:bg-gray-400 rounded transition-colors">
                    {{ tool }}
                  </button>
                </div>
                <textarea ref="descriptionTextarea" v-model="form.description" rows="4"
                  class="w-full px-3 py-2 text-gray-700 border-2 bg-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 resize-vertical"
                  placeholder="Enter formatted description here..."></textarea>
              </div>
            </div>


            <!-- Submit Button -->
            <div class="flex justify-end pt-6 border-t border-gray-200">
              <button type="submit" :disabled="isSubmitting"
                class="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-[property] duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300">
                {{ isSubmitting ? 'UPLOADING...' : 'UPLOAD' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>

</template>
