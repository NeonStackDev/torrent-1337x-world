export function torrentPath(torrent: {
  id?: number | string
  slugged_title?: string | null
  slug?: string | null
}): string | null {
  if (!torrent?.id) return null
  const slug = torrent.slugged_title || torrent.slug
  if (!slug) return null
  return `/torrent/${torrent.id}/${slug}`
}

/** Matches /torrent/{id}/{slug} with optional trailing slash */
export const TORRENT_DETAIL_PATH = /^\/torrent\/(\d+)\/(.+?)\/?$/

export function parseTorrentDetailPath(pathname: string) {
  const match = pathname.match(TORRENT_DETAIL_PATH)
  if (!match) return null
  const id = match[1]
  let slug = match[2]
  if (slug.endsWith('/')) slug = slug.slice(0, -1)
  try {
    slug = decodeURIComponent(slug)
  } catch {
    // keep raw slug if malformed encoding
  }
  return { id, slug }
}

export function torrentCanonicalPath(id: string | number, sluggedTitle: string) {
  return `/torrent/${id}/${sluggedTitle}`
}

export function needsTorrentSlugRedirect(
  requestSlug: string | string[] | undefined,
  sluggedTitle: string | null | undefined
) {
  if (!sluggedTitle) return false
  const slug = decodeURIComponent(String(requestSlug ?? ''))
  return slug !== sluggedTitle
}
