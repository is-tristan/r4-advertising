// Components
import FeaturedVideo from "@/components/screens/work/featured-video/featured-video";
import WorkGrid from "@/components/sections/work-grid/work-grid";
import CtaSection from "@/components/sections/cta/cta-section";

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