<template>
  <div v-if="currentPage != lastPage || lastPage != 1" class="flex justify-center mt-4 space-x-2">
    <a v-if="currentPage > 1" :href="currentPage - 1"
      class="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50">
      Prev
    </a>

    <a v-for="page in pages" :key="page.key" :disabled="page.isEllipsis"
      :href="page.number" :class="[
        'px-3 py-1 rounded',
        page.number === currentPage ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
        page.isEllipsis ? 'cursor-default' : 'cursor-pointer'
      ]">
      {{ page.display }}
    </a>

    <a v-if="currentPage < lastPage" :href="currentPage + 1"
      class="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50">
      Next
    </a>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
const router = useRouter()
export default {
  name: 'TorrentPagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    lastPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages() {
      const pages = []
      const total = this.lastPage
      const current = this.currentPage
      // Helper to add page object
      const addPage = (number, display = null, isEllipsis = false) => {
        pages.push({
          key: isEllipsis ? `ellipsis-${pages.length}` : `page-${number}`,
          number,
          display: display || number,
          isEllipsis
        })
      }

      if (total <= 5) {
        // Just add all pages
        for (let i = 1; i <= total; i++) {
          addPage(i)
        }
      } else {
        // More than 5 pages: add first page
        addPage(1)

        // Decide where to add ellipsis / pages
        if (current > 3) {
          addPage(null, '...', true) // left ellipsis
        }

        // Calculate start and end for middle pages (around current page)
        let start = Math.max(2, current - 1)
        let end = Math.min(total - 1, current + 1)

        // Adjust start or end if near beginning or end
        if (current <= 3) {
          start = 2
          end = 4
        } else if (current >= total - 2) {
          start = total - 3
          end = total - 1
        }

        for (let i = start; i <= end; i++) {
          addPage(i)
        }

        if (current < total - 2) {
          addPage(null, '...', true) // right ellipsis
        }

        // Add last page
        addPage(total)
      }

      return pages
    }
  },
  methods: {
    changePage(page) {
      if (!page) return
      if (page >= 1 && page <= this.lastPage && page !== this.currentPage) {
        this.$emit('page-changed', page)
        const next_url = this.generateHref(page);
        router.push(next_url);
      }
    },
    generateHref(page) {
      let urlParts = []
      if (process.client) {
        urlParts = window.location.pathname.split('/').filter(Boolean)
      }
      // filter(Boolean) removes empty strings from leading/trailing slashes

      let page_url = '/'; // default fallback
      
      if (urlParts.length > 0 && urlParts[0] != 'library') {
        page_url = `/${urlParts[0]}/${urlParts[1]}/${page}/`;
      } else if (urlParts.length > 0) {
        page_url = `/${urlParts[0]}/${page}/`;
      } else {
        page_url = `/`;
      }
      console.log(page_url, page);

      return page_url;
    }
  }
}
</script>

<style scoped>
button {
  transition: background-color 0.2s ease;
}

button:disabled {
  cursor: not-allowed;
}
</style>
