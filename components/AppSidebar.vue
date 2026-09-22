<template>
  <div class="md:col-span-3 px-2 md:px-0 mt-5">
    <!-- Browse Torrents -->
    <div class="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
      <div class="bg-gradient-to-r from-orange-500 to-gray-500 px-4 py-3">
        <h3 class="text-white font-bold">BROWSE TORRENTS</h3>
      </div>
      <ul class="list-box">
        <li v-for="(category, index) in browseCategories" :key="index"
          class="flex text-gray-300 hover:text-orange-400 cursor-pointer transition-colors px-4 py-1 border-b-1 border-gray-600">
          <a :href="category.slug">
            <i :class=category.icon></i>
            {{ category.title }}
          </a>
        </li>
      </ul>
    </div>


  </div>
</template>

<script setup>
const router = useRouter()
const browseCategories = [
  { title: 'Trending Torrents', icon: 'flaticon-trending', slug: '/categories/trending _torrent' },
  { title: 'Movie library', icon: 'flaticon-movie-library', slug: '/categories/movie_library' },
  { title: 'Top 100 Torrents', icon: 'flaticon-top', slug: '/categories/top100' },
  { title: 'Anime', icon: 'flaticon-ninja-portrait', slug: '/cat/Anime/1' },
  { title: 'Applications', icon: 'flaticon-apps', slug: '/cat/Apps/1' },
  { title: 'Documentaries', icon: 'flaticon-documentary', slug: '/cat/Documentaries/1' },
  { title: 'Games', icon: 'flaticon-games', slug: '/cat/Games/1' },
  { title: 'Movies', icon: 'flaticon-movies', slug: '/cat/Movies/1' },
  { title: 'Music', icon: 'flaticon-music', slug: '/cat/Music/1' },
  { title: 'Other', icon: 'flaticon-other', slug: '/cat/Other/1' },
  { title: 'Television', icon: 'flaticon-tv', slug: '/cat/TV/1' },
  { title: 'XXX', icon: 'flaticon-xxx', slug: '/cat/XXX/1' },

]

const openLink = (link) => {
  if (link == '1331x Status') {
    router.push(`https://1331x-status.org/`);
  }
  else if (link == '1331x Chat') {
    router.push(`https://1331x.to/login`);
  }
  else if (link == 'Torrent9') {
    router.push(`https://torrentz9.org/`);
  }
  else if (link == 'uTrix') {
    router.push(`https://uflix.to/`);
  }
  else if (link == 'Njalla') {
    router.push(`https://njal.la/`);
  }
  else if (link == 'PRQ') {
    router.push(`https://prq.se/`);
  }
  else if (link == 'Limetorrents') {
    router.push(`https://www.limetorrents.lol/`);
  }
  else if (link == 'TorrentFunk') {
    router.push(`https://www.torrentfunk.com/`);
  }
  else if (link == 'ThePornDude') {
    router.push(`https://theporndude.com/`);
  }
  else if (link == 'Torlock') {
    router.push(`https://www.torlock.com/`);
  }
  // Implement external link logic
  // Open in new tab or navigate
}

</script>

<style scoped>
/* Add any component-specific styles here if needed */


.list-box li {
  color: #dadada;
  display: block;
  font-size: 14px;
  line-height: 38px;
  padding: 0 12px 0 49px;
  position: relative;
}

.list-box li i {
  height: 30px;
  left: 12px;
  margin-right: 7px;
  position: absolute;
  top: 0;
  width: 30px;
  color: #56add9;
  font-size: 23px;
}

.list-box i.flaticon-trending,
.list-box i.flaticon-movie-library,
.list-box i.flaticon-tv-library {
  color: #89ad19;
}
</style>