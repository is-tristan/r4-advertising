import { getSanityImageAlt, getSanityImageUrl } from "@/sanity/lib/image"

export const siteName = "R4 Advertising"

export const siteDescription = "R4 exists to close the gap between ambition and outcome — by bringing trading discipline, audience understanding, and delivery governance into one system."

export const siteLocale = "en_GB"

export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteName} — Trade. Plan. Activate.`,
}

export const socialProfiles = [
  "https://www.instagram.com/r4.advertising/",
  "https://www.linkedin.com/company/r4advertising",
  "https://www.youtube.com/@r4advertising",
]

export const sitemapTag = "sitemap"

export const sitemapDocumentTypes = [
  "work",
  "news",
  "career",
  "legal",
  "team",
  "workPage",
  "servicesPage",
]

const maxDescriptionLength = 160

const maxAuthoredDescriptionLength = 300

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "")
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return "http://localhost:3000"
}

export function getAbsoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString()
}

export function cleanDescription(text, maxLength = maxDescriptionLength) {
  if (!text || typeof text !== "string") {
    return ""
  }

  const collapsed = text.replace(/\s+/g, " ").trim()

  if (collapsed.length <= maxLength) {
    return collapsed
  }

  const truncated = collapsed.slice(0, maxLength - 1)
  const lastSpace = truncated.lastIndexOf(" ")
  const wordSafe = lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated

  return `${wordSafe.replace(/[\s.,;:—–-]+$/, "")}…`
}

function resolveTitle(title) {
  if (!title) {
    return siteName
  }

  if (typeof title === "object" && title.absolute) {
    return title.absolute
  }

  if (title === siteName) {
    return title
  }

  return `${title} | ${siteName}`
}

export function buildPageMetadata({
  title,
  description,
  image,
  imageAlt,
  path = "/",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
} = {}) {
  const socialTitle = resolveTitle(title)
  const pageDescription = cleanDescription(description, maxAuthoredDescriptionLength) || siteDescription
  const url = getAbsoluteUrl(path)
  const sanityImageUrl = getSanityImageUrl(image, "openGraph")

  const ogImage = sanityImageUrl
    ? {
        url: sanityImageUrl,
        width: 1200,
        height: 630,
        alt: imageAlt || getSanityImageAlt(image, socialTitle),
      }
    : defaultOgImage

  const metadata = {
    title: title || siteName,
    description: pageDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: siteLocale,
      siteName,
      title: socialTitle,
      description: pageDescription,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: pageDescription,
      images: [ogImage.url],
    },
  }

  if (type === "article") {
    if (publishedTime) {
      metadata.openGraph.publishedTime = publishedTime
    }

    if (modifiedTime) {
      metadata.openGraph.modifiedTime = modifiedTime
    }

    if (authors?.length) {
      metadata.openGraph.authors = authors
      metadata.authors = authors.map((name) => ({ name }))
    }
  }

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    }
  }

  return metadata
}

export function getOrganizationJsonLd() {
  const siteUrl = getSiteUrl()

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        legalName: "R4 Advertising Limited",
        url: siteUrl,
        description: siteDescription,
        email: "info@r4advertising.agency",
        telephone: "+44 29 2233 7225",
        address: {
          "@type": "PostalAddress",
          streetAddress: "389 Newport Road",
          addressLocality: "Cardiff",
          postalCode: "CF24 1TP",
          addressCountry: "GB",
        },
        sameAs: socialProfiles,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        inLanguage: "en-GB",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  }
}

export function getArticleJsonLd({ title, description, image, path, publishedTime, modifiedTime, authorName }) {
  const siteUrl = getSiteUrl()
  const url = getAbsoluteUrl(path)
  const imageUrl = getSanityImageUrl(image, "openGraph")

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: cleanDescription(description, maxAuthoredDescriptionLength) || undefined,
    image: imageUrl ? [imageUrl] : [getAbsoluteUrl(defaultOgImage.url)],
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: url,
    url,
    author: authorName
      ? { "@type": "Person", name: authorName }
      : { "@id": `${siteUrl}/#organization` },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  }
}

export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
