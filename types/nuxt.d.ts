export {}

declare module '#app' {
  interface NuxtApp {
    $goNextLink: (torrent: any) => void
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $goNextLink: (torrent: any) => void
  }
}
