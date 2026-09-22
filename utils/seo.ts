export const SITE_URL = 'https://1337x.world'
export const SITE_NAME = '1337x'

export function buildTorrentPath(id: string | number, slug: string): string {
  return `/torrent/${id}/${slug}`
}

export function buildTorrentCanonicalUrl(id: string | number, slug: string): string {
  return `${SITE_URL}${buildTorrentPath(id, slug)}`
}

export function stripHtml(text: string): string {
  if (!text) return ''
  return text
    .replace(/<img[^>]*>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function truncateText(text: string, max: number): string {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

export function cleanMetaDescription(text: string, max = 155): string {
  return truncateText(stripHtml(text), max)
}

export function extractReleaseYear(...sources: (string | null | undefined)[]): string | null {
  for (const source of sources) {
    if (!source) continue
    const match = source.match(/\b(19|20)\d{2}\b/)
    if (match) return match[0]
  }
  return null
}

export function extractCastFromContent(content: string | null | undefined): string | null {
  if (!content) return null
  const plain = stripHtml(content)
  const patterns = [
    /cast[:\s-]+([^.]+(?:\.|$))/i,
    /starring[:\s-]+([^.]+(?:\.|$))/i,
  ]
  for (const pattern of patterns) {
    const match = plain.match(pattern)
    if (match?.[1]) return match[1].trim()
  }
  return null
}

export function extractSectionFromContent(
  content: string | null | undefined,
  labels: string[]
): string | null {
  if (!content) return null
  const plain = stripHtml(content)
  for (const label of labels) {
    const regex = new RegExp(`${label}[:\\s-]+([^\\n.]+)`, 'i')
    const match = plain.match(regex)
    if (match?.[1]) return match[1].trim()
  }
  return null
}

export function isMovieCategory(categoryName: string | null | undefined): boolean {
  if (!categoryName) return false
  return /movie|tv|anime|documentar/i.test(categoryName)
}

export function isSoftwareCategory(categoryName: string | null | undefined): boolean {
  if (!categoryName) return false
  return /app|software|game/i.test(categoryName)
}

export function buildTorrentFaqs(torrent: {
  title?: string
  name?: string
  size?: string
  seeders?: number | string
  category_name?: string
}): Array<{ question: string; answer: string }> {
  const title = torrent.title || torrent.name || 'this torrent'
  const faqs = [
    {
      question: `How do I download ${title}?`,
      answer: `Click the magnet or torrent download button on this page to start downloading ${title}. A BitTorrent client is required.`,
    },
  ]

  if (torrent.size) {
    faqs.push({
      question: `What is the file size of ${title}?`,
      answer: `The total size of ${title} is ${torrent.size}.`,
    })
  }

  if (torrent.seeders != null) {
    faqs.push({
      question: `How many seeders are available for ${title}?`,
      answer: `${title} currently has ${torrent.seeders} seeders, which affects download speed.`,
    })
  }

  if (torrent.category_name) {
    faqs.push({
      question: `What category is ${title} in?`,
      answer: `${title} is listed under ${torrent.category_name} on ${SITE_NAME}.`,
    })
  }

  return faqs
}
