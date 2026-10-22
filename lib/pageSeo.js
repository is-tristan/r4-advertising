import { client } from "@/sanity/lib/client"
import { pageSeoQuery } from "@/sanity/lib/queries"
import { buildPageMetadata, pageSeoTag, withSeoFields } from "@/lib/seo"

export async function getPageSeo(path) {
  return client.fetch(pageSeoQuery, { path }, {
    next: { revalidate: 30, tags: [pageSeoTag] },
  }).catch(() => null)
}

export async function buildRouteMetadata(fallback) {
  const seo = await getPageSeo(fallback.path)

  return buildPageMetadata(withSeoFields(seo, fallback))
}
