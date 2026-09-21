import { getSanityImageUrl } from "@/sanity/lib/image"

export const siteName = "R4 Advertising"

export const siteDescription =
  "R4 exists to close the gap between ambition and outcome — by bringing trading discipline, audience understanding, and delivery governance into one system."

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return "http://localhost:3000"
}

function resolveTitle(title) {
  if (!title) {
    return siteName
  }

  if (typeof title === "object" && title.absolute) {
    return title.absolute
  }

  return title
}

export function buildPageMetadata({
  title,
  description,
  image,
  path = "/",
  noIndex = false,
} = {}) {
  const pageTitle = resolveTitle(title)
  const pageDescription = description || siteDescription
  const url = new URL(path, getSiteUrl()).toString()
  const imageUrl = getSanityImageUrl(image, "openGraph")

  const metadata = {
    title: title || siteName,
    description: pageDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName,
      title: pageTitle,
      description: pageDescription,
      url,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: pageTitle,
      description: pageDescription,
    },
  }

  if (imageUrl) {
    metadata.openGraph.images = [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ]
    metadata.twitter.images = [imageUrl]
  }

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    }
  }

  return metadata
}
