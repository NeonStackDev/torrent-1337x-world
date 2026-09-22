export function openMagnetLink(magnetLink: string | null | undefined) {
  if (!magnetLink || typeof window === 'undefined') return
  window.location.assign(magnetLink)
}

export function openUrl(url: string | null | undefined, newTab = true) {
  if (!url || typeof window === 'undefined') return

  if (newTab) {
    window.open(url, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.href = url
}

export function getTorrentFileUrl(infohash: string | null | undefined) {
  if (!infohash) return null
  return `https://itorrents.org/torrent/${infohash}.torrent`
}

export function resolveDirectDownloadUrl(torrent: {
  torrent_link?: string | null
  torrent_file?: string | null
  infohash?: string | null
  magnet_link?: string | null
} | null | undefined) {
  if (!torrent) return null
  return (
    torrent.torrent_link ||
    torrent.torrent_file ||
    getTorrentFileUrl(torrent.infohash) ||
    torrent.magnet_link ||
    null
  )
}
