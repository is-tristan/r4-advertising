// SEO
import { buildRouteMetadata } from "@/lib/pageSeo"

// Components
import FeaturedVideo from "@/components/screens/work/featured-video/featured-video";
import WorkGrid from "@/components/sections/work-grid/work-grid";
import CtaSection from "@/components/sections/cta/cta-section";

export async function generateMetadata() {
    return buildRouteMetadata({
        title: "Media & Advertising Case Studies",
        description: "Explore campaigns from R4 Advertising, the media buying and planning specialists. See Trade. Plan. Activate. in practice across brands, sectors and markets.",
        path: "/work",
    })
}

export default function WorkPage() {
    return (

        <>

            <FeaturedVideo eager />

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