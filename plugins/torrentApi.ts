
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase || 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Attach token automatically
  api.interceptors.request.use(
    (cfg) => {
      const token = localStorage.getItem('token')
      if (token) {
        cfg.headers['Authorization'] = `Bearer ${token}`
      }
      return cfg
    },
    (error) => Promise.reject(error)
  )

  // Inject so you can call it anywhere with `nuxtApp.$torrentApi`
  nuxtApp.provide('torrentApi', {

    
    getTorrentsByType(slug: string) {
      return api.get(`/torrents/type/${slug}`)
    },
    
    getTorrentsByCategory(slug: string, page: number) {
      return api.get(`/torrents/cat/${slug}/${page}`)
    },
    
    getTorrentsBySearch(slug: string, page: number) {
      return api.get(`/torrents/search/${slug}/${page}`)
    },

    getTorrentsBySubCategory(slug: string, page: number) {
      return api.get(`/torrents/catsub/${slug}/${page}`)
    },
    
    getLibraries(page: number) {
      return api.get(`/library/movies/${page}`)
    },

    getTorrent(id: string, slug: string) {
      return api.get(`/torrent/get/${id}`)
    },

    getTorrents(params = {}) {
      return api.get('/torrents', { params })
    },
    
    getCategories() {
      return api.get('/categories')
    },
  

    //
    getUploadTorrents() {
      return  api.get('/my_uploads');
    },

    deleteTorrent(id: number) {
      const token = localStorage.getItem('token')
      return api.post('/torrent/delete', { id: id }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
    },

    //
    getTorrentsByUser(slug: string, page: number) {
      return api.get(`/torrents/user/${slug}/${page}`)
    },


    createTorrent(data: FormData) {
      const token = localStorage.getItem('token')
      return api.post('/torrent/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
    },

    saveTorrent(data: FormData) {
      const token = localStorage.getItem('token')
      return api.post('/torrent/save', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
    },

    login(form: { email: string; password: string }) {
      return api.post('/login', form).then((res) => {
        localStorage.setItem('token', res.data.token)
        return res.data
      })
    },
    // ...add other methods here
  })
})
