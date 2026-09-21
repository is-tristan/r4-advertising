// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import FeaturedVideo from "@/components/screens/work/featured-video/featured-video";
import WorkGrid from "@/components/sections/work-grid/work-grid";
import CtaSection from "@/components/sections/cta/cta-section";

export const metadata = buildPageMetadata({
    title: "Work",
    description: "Case studies from campaigns that moved the needle — a selection of work across sectors, each with its own brief, challenge, and outcome.",
    path: "/work",
})

export default function WorkPage() {
    return (

        <>

            <FeaturedVideo />

            <WorkGrid
                titleContainerClass="noPaddingTop"
                hasNav={true}
                hasTitle={true}
                hasButton={false}
                hasPagination={true}
            />

            <CtaSection eyebrowNumber="02" />

        </>

    )
}