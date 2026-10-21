import { headers } from "next/headers"
import { notFound } from "next/navigation"

// Sanity
import { client } from "@/sanity/lib/client"
import { newsBySlugQuery } from "@/sanity/lib/queries"

// SEO
import { buildPageMetadata, getArticleJsonLd, serializeJsonLd } from "@/lib/seo"

// Components
import NewsBanner from "@/components/screens/news/singular/components/news-banner"
import NewsContent from "@/components/screens/news/singular/components/news-content"
import RelatedArticles from "@/components/screens/news/singular/components/related-articles"

async function getNews(slug) {
  return client.fetch(newsBySlugQuery, { slug }, {
    next: { revalidate: 30 },
  })
}

async function getShareUrl(path) {
  const headersList = await headers()
  const host = headersList.get("x-forwarded-host") || headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "https"

  if (!host) {
    return path
  }

  return `${protocol}://${host}${path}`
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const news = await getNews(slug)

  if (!news) {
    return {}
  }

  return buildPageMetadata({
    title: news.seoTitle ? { absolute: news.seoTitle } : news.title,
    description: news.seoDescription || news.excerpt,
    image: news.image,
    path: `/news/${news.slug}`,
    type: "article",
    publishedTime: news._createdAt,
    modifiedTime: news._updatedAt,
    authors: news.author?.name ? [news.author.name] : undefined,
  })
}

export default async function NewsDetailsPage({ params }) {

  const { slug } = await params

  const news = await getNews(slug)

  if (!news) {
    notFound()
  }

  const shareUrl = await getShareUrl(`/news/${news.slug}`)

  const articleJsonLd = getArticleJsonLd({
    title: news.title,
    description: news.seoDescription || news.excerpt,
    image: news.image,
    path: `/news/${news.slug}`,
    publishedTime: news._createdAt,
    modifiedTime: news._updatedAt,
    authorName: news.author?.name,
  })

  return (

    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />

      <NewsBanner
        title={news.title}
        excerpt={news.excerpt}
        image={news.image}
        category={news.category}
        author={news.author}
        shareUrl={shareUrl}
      />

      <NewsContent content={news.content} />

      <RelatedArticles
        slug={news.slug}
        category={news.category}
      />

    </>

  )

}
