// https://nuxt.com/docs/api/configuration/nuxt-config
import { ofetch } from 'ofetch'

export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: "latest",
  ssr: true,
  css: ['~/assets/css/main.css','~/assets/css/icons.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/critters', '@nuxtjs/sitemap', 'nuxt-schema-org','nuxt-seo-utils'],
  runtimeConfig: {
    public: {
      apiBase: 'https://1337x.world/api',
      apiImageKey: process.env.NUXT_PUBLIC_API_IMAGE_KEY,
      apiImageUrl: process.env.NUXT_PUBLIC_API_IMAGE_URL,
    }
  },
  critters: {
    preload: 'swap', // preload fonts/CSS,
    inline: true, // Incluir CSS crítico en el HTML
    preconnect: ['https://1337x.world'], // Preconectar a dominios necesarios
  },
  experimental: {
    inlineSSRStyles: false
  },
  build: {
    cssCodeSplit: true
  },
  app: {
    head: {
      // link: [
      //   // Preload CSS so it loads before HTML flashes
      //   { rel: "preload", as: "style", href: "/_nuxt/assets/app.css" }
      // ],
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preload', href: '/fonts/Flaticon.woff', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/oswald-regular.woff', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://1337x.world'},
        { rel: 'preconnect', href: 'https://lx1.dyncdn.cc', crossorigin: 'anonymous' },
        // { rel: 'preconnect', href: 'https://www.googletagmanager.com', crossorigin: 'anonymous' },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: 'og:updated_time', content: new Date().toISOString() },
        { name: "google-site-verification", content: "6fNsscqru2jVe7tJjw-82hJONB_my0SF9w7fM4g60_Q" },
        { name: 'keywords', content: 'Download the best torrents in 2025 - movies, TV shows, music, games, and more. Fast, secure, and updated daily with the latest torrent downloads.' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
      ],
      script: [
        {
          innerHTML: `
            var _Hasync = _Hasync || [];
            _Hasync.push(['Histats.start', '1,5054357,4,0,0,0,00010000']);
            _Hasync.push(['Histats.fasi', '1']);
            _Hasync.push(['Histats.track_hits', '']);
            (function() {
              var hs = document.createElement('script');
              hs.type = 'text/javascript';
              hs.async = true;
              hs.src = '//s10.histats.com/js15_as.js';
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
            })();
          `,
          type: 'text/javascript'
        },
      ],
      noscript: [
        {
          innerHTML: '<a href="/" target="_blank"><img src="//sstatic1.histats.com/0.gif?5054357&101" alt="free html hit counter" border="0"></a>'
        },
      ],
    }
  },
  vite: {
    build: {
      minify: 'terser',
      cssCodeSplit: false, // combine CSS
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
    },
  },
  nitro: {
    minify: true,
    routeRules: {
      '/torrent/**': {
        headers: {
          'Last-Modified': new Date().toUTCString()
        }
      }
    }
  },
  site: {
    url: 'https://1337x.world',
  },
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://1337x.world/sitemap_index.xml'
  },
  sitemap: {
    // 1 hour (was 24h). Shorter so new torrents appear sooner.
    cacheMaxAgeSeconds: 60 * 60,
    sitemaps: {
      page:{
        // includeAppSources: true,
        defaults: {
          lastmod: new Date().toISOString(), // sets current date
          changefreq: 'weekly',
          priority: 0.8
        },
        urls: [
          { loc: ''},
          { loc: 'rules'},
          { loc: 'contact'},
          { loc: 'about'},
          { loc: 'categories/trending'},
          { loc: 'categories/trending-week'},
          { loc: 'categories/top'},
          { loc: 'top/movies'},
          { loc: 'top/tv' },
          { loc: 'top/games' },
          { loc: 'top/apps' },
          { loc: 'top/music' },
          { loc: 'top/doc' },
          { loc: 'top/other' },
          { loc: 'top/xxx' },
        ]
      },
      posts: {
        // Long timeout: this endpoint returns up to 20k URLs; Nuxt was aborting
        // the default fetch and then sitemap_index only listed page.xml.
        sources: [[
          'https://1337x.world/api/posts/slugs',
          { headers: { Accept: 'application/json' }, timeout: 60000 },
        ]],
        chunks: 4500,
        defaults: {
          changefreq: 'daily',
          priority: 0.8
        }
      },
    }
  },
  
  seo: {
    canonicalLowercase: false,
    redirectToCanonicalSiteUrl: true,
  },
  
  
})
