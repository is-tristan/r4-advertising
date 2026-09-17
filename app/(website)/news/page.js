// Components
import Banner from "@/components/sections/banner/banner";
import NewsGrid from "@/components/screens/news/news-grid";

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