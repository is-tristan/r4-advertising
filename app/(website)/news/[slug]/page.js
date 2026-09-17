import { headers } from "next/headers"
import { notFound } from "next/navigation"

// Sanity
import { client } from "@/sanity/lib/client"
import { newsBySlugQuery } from "@/sanity/lib/queries"

// Components
import NewsBanner from "@/components/screens/news/singular/components/news-banner"
import NewsContent from "@/components/screens/news/singular/components/news-content"
import RelatedArticles from "@/components/screens/news/singular/components/related-articles"

async function getShareUrl(path) {

    const headersList = await headers()
    const host = headersList.get("x-forwarded-host") || headersList.get("host")
    const protocol = headersList.get("x-forwarded-proto") || "https"

    if (!host) {

        return path

    }

    return `${protocol}://${host}${path}`

}

export default async function NewsDetailsPage({ params }) {

    const { slug } = await params

    const news = await client.fetch(newsBySlugQuery, { slug }, {
        next: { revalidate: 30 },
    })

    if (!news) {

        notFound()

    }

    const shareUrl = await getShareUrl(`/news/${news.slug}`)

    return (

        <>

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
