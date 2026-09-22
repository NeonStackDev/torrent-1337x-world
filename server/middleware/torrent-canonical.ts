import { parseTorrentDetailPath, torrentCanonicalPath } from '~/utils/torrentUrl'

/**
 * 301 trailing-slash torrent URLs before SSR (no API call).
 * Wrong slug / Title-Case → canonical slug is handled on the torrent page after one API fetch.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const path = url.pathname

  if (!path.startsWith('/torrent/') || !path.endsWith('/')) return

  const parsed = parseTorrentDetailPath(path)
  if (!parsed) return

  const target = torrentCanonicalPath(parsed.id, parsed.slug) + url.search
  return sendRedirect(event, target, 301)
})
