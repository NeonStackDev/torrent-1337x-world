import { openMagnetLink } from '~/utils/download'

export default defineNuxtPlugin(() => {
  const goNextLink = (torrent: any) => {
    const link = `/torrent/${torrent.id}/${torrent.slugged_title}`
    window.location.href = link
  }

  const downloadNextLink = (torrent_id: number | string | bigint, magnet_link: string) => {
    void torrent_id
    openMagnetLink(magnet_link)
  }

  return {
    provide: {
      goNextLink,
      downloadNextLink
    }
  }
})
