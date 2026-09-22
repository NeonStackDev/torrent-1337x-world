import {
  SITE_NAME,
  SITE_URL,
  buildTorrentCanonicalUrl,
  cleanMetaDescription,
  extractCastFromContent,
  extractReleaseYear,
  extractSectionFromContent,
  buildTorrentFaqs,
  isMovieCategory,
  isSoftwareCategory,
  stripHtml,
} from '~/utils/seo'

type TorrentSeoInput = {
  id: number | string
  slugged_title: string
  title?: string
  name?: string
  description?: string
  content?: string
  cover_image?: string
  category_name?: string
  category_slug?: string
  subcategory_name?: string
  subcategory_id?: number
  size?: string
  seeders?: number | string
  slogan?: string
}

export function useTorrentSeo(torrent: TorrentSeoInput) {
  const pageTitle = torrent.title || torrent.name || 'Torrent'
  const metaDesc = cleanMetaDescription(torrent.description || torrent.content || torrent.name || '')
  const canonical = buildTorrentCanonicalUrl(torrent.id, torrent.slugged_title)
  const releaseYear = extractReleaseYear(torrent.name, torrent.title, torrent.description)
  const cast = extractCastFromContent(torrent.content)
  const features = extractSectionFromContent(torrent.content, ['features', 'feature'])
  const systemRequirements = extractSectionFromContent(torrent.content, [
    'system requirements',
    'requirements',
    'minimum requirements',
  ])
  const faqs = buildTorrentFaqs(torrent)
  const genreText = torrent.slogan ? stripHtml(torrent.slogan) : null
  const overview = torrent.description || stripHtml(torrent.content || '').slice(0, 500)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      ...(torrent.category_name && torrent.category_slug
        ? [{
            '@type': 'ListItem',
            position: 2,
            name: torrent.category_name,
            item: `${SITE_URL}/cat/${torrent.category_slug}/1`,
          }]
        : []),
      {
        '@type': 'ListItem',
        position: torrent.category_name ? 3 : 2,
        name: pageTitle,
        item: canonical,
      },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const jsonLdScripts: Array<{ type: string; innerHTML: string }> = [
    { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbJsonLd) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(faqJsonLd) },
  ]

  if (isMovieCategory(torrent.category_name)) {
    const movieJsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Movie',
      name: pageTitle,
      description: metaDesc,
      url: canonical,
    }
    if (torrent.cover_image) movieJsonLd.image = torrent.cover_image
    if (releaseYear) movieJsonLd.datePublished = releaseYear
    if (genreText) movieJsonLd.genre = genreText
    if (cast) {
      movieJsonLd.actor = cast.split(',').map((name) => ({
        '@type': 'Person',
        name: name.trim(),
      }))
    }
    jsonLdScripts.push({ type: 'application/ld+json', innerHTML: JSON.stringify(movieJsonLd) })
  }

  if (isSoftwareCategory(torrent.category_name)) {
    const appJsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: pageTitle,
      description: metaDesc,
      url: canonical,
      applicationCategory: torrent.subcategory_name || torrent.category_name,
    }
    if (torrent.cover_image) appJsonLd.image = torrent.cover_image
    if (features) appJsonLd.featureList = features
    if (systemRequirements) appJsonLd.softwareRequirements = systemRequirements
    jsonLdScripts.push({ type: 'application/ld+json', innerHTML: JSON.stringify(appJsonLd) })
  }

  useHead({
    title: pageTitle,
    meta: [
      { name: 'description', content: metaDesc },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: metaDesc },
      { property: 'og:url', content: canonical },
      { property: 'og:type', content: 'article' },
      { property: 'og:site_name', content: SITE_NAME },
      ...(torrent.cover_image ? [{ property: 'og:image', content: torrent.cover_image }] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: metaDesc },
      ...(torrent.cover_image ? [{ name: 'twitter:image', content: torrent.cover_image }] : []),
    ],
    link: [{ rel: 'canonical', href: canonical }],
    script: jsonLdScripts,
  })

  return {
    canonical,
    metaDesc,
    pageTitle,
    releaseYear,
    cast,
    features,
    systemRequirements,
    genreText,
    overview,
    faqs,
    isMovie: isMovieCategory(torrent.category_name),
    isSoftware: isSoftwareCategory(torrent.category_name),
  }
}
