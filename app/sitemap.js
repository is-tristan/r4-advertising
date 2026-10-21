import { client } from "@/sanity/lib/client"
import { sitemapQuery } from "@/sanity/lib/queries"
import { getSanityImageUrl } from "@/sanity/lib/image"
import { getAbsoluteUrl, sitemapTag } from "@/lib/seo"

const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/work", changeFrequency: "weekly", priority: 0.9 },
  { path: "/news", changeFrequency: "weekly", priority: 0.8 },
  { path: "/company/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/company/team", changeFrequency: "monthly", priority: 0.7 },
  { path: "/company/careers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/calculator", changeFrequency: "monthly", priority: 0.7 },
  { path: "/annual-media-commitment", changeFrequency: "monthly", priority: 0.6 },
  { path: "/in-charge-calendar", changeFrequency: "monthly", priority: 0.6 },
]

function getLatestDate(...values) {
  const dates = values
    .flat()
    .filter(Boolean)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()))

  if (!dates.length) {
    return undefined
  }

  return new Date(Math.max(...dates.map((date) => date.getTime()))).toISOString()
}

function getImages(image) {
  const imageUrl = getSanityImageUrl(image, "openGraph")

  return imageUrl ? [imageUrl.replace(/&/g, "&amp;")] : undefined
}

export default async function sitemap() {
  const data = await client.fetch(sitemapQuery, {}, {
    next: { revalidate: 30, tags: [sitemapTag] },
  }).catch(() => null)

  const work = data?.work ?? []
  const news = data?.news ?? []
  const careers = data?.careers ?? []
  const legal = data?.legal ?? []

  const workUpdatedAt = work.map((item) => item._updatedAt)
  const newsUpdatedAt = news.map((item) => item._updatedAt)
  const careersUpdatedAt = careers.map((item) => item._updatedAt)

  const staticLastModified = {
    "/": getLatestDate(workUpdatedAt),
    "/services": getLatestDate(data?.servicesPageUpdatedAt),
    "/work": getLatestDate(data?.workPageUpdatedAt, workUpdatedAt),
    "/news": getLatestDate(newsUpdatedAt),
    "/company/team": getLatestDate(data?.teamUpdatedAt),
    "/company/careers": getLatestDate(careersUpdatedAt),
  }

  const staticEntries = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: getAbsoluteUrl(path),
    lastModified: staticLastModified[path],
    changeFrequency,
    priority,
  }))

  const workEntries = work.map((item) => ({
    url: getAbsoluteUrl(`/work/${item.slug}`),
    lastModified: item._updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
    images: getImages(item.image),
  }))

  const newsEntries = news.map((item) => ({
    url: getAbsoluteUrl(`/news/${item.slug}`),
    lastModified: item._updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
    images: getImages(item.image),
  }))

  const careerEntries = careers.map((item) => ({
    url: getAbsoluteUrl(`/company/careers/${item.slug}`),
    lastModified: item._updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
    images: getImages(item.image),
  }))

  const legalEntries = legal.map((item) => ({
    url: getAbsoluteUrl(`/legal/${item.slug}`),
    lastModified: item._updatedAt,
    changeFrequency: "yearly",
    priority: 0.3,
  }))

  return [
    ...staticEntries,
    ...workEntries,
    ...newsEntries,
    ...careerEntries,
    ...legalEntries,
  ]
}
