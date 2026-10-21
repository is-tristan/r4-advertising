// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import Banner from "@/components/sections/banner/banner";
import NewsGrid from "@/components/screens/news/news-grid";

export const metadata = buildPageMetadata({
    title: "Media Buying & Planning Insights",
    description: "Media buying, planning and advertising insights from R4 Advertising. Explore industry perspectives, client wins and news from our Cardiff and London teams.",
    path: "/news",
})

export default function NewsPage() {

    return (

        <>

            <Banner
                eyebrow="Stay up to date"
                title="News & Insights"
                description="<p>The latest updates, industry insights, and company news from R4.</p>"
            />

            <NewsGrid />

        </>

    )

}