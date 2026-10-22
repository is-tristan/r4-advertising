// SEO
import { buildRouteMetadata } from "@/lib/pageSeo"

// Components
import Content from "@/components/sections/content/content";
import TextIntro from "@/components/screens/services/components/text-intro/text-intro";
import StickyNav from "@/components/screens/services/components/sticky-nav/sticky-nav";
import TradeSection from "@/components/screens/services/components/trade-section/trade-section";
import PlanSection from "@/components/screens/services/components/plan-section/plan-section";
import ActivateSection from "@/components/screens/services/components/activate-section/activate-section";
import CtaSection from "@/components/sections/cta/cta-section";
import ScrollFillTitle from "@/components/screens/services/components/scroll-fill-title/scroll-fill-title";

// Styles
import styles from "./styles/services.module.scss";

// SEO
export async function generateMetadata() {
    return buildRouteMetadata({
        title: "Media Buying & Planning Cardiff & London",
        description: "Media buying and planning in Cardiff and London. Trade. Plan. Activate. Discover R4 Advertising's approach to media investment, audiences and campaign delivery.",
        path: "/services",
    })
}

export default function ServicesPage() {

    return (

        <>

            <Content
                sectionClassName={`${styles.introBanner} headerOffset`}
                containerClassName={`noPaddingBottom`}
                eyebrowNumber="01"
                eyebrowText="Our Services"
                title="Trade<span class='colorPrimary'>.</span> <br> Plan<span class='colorPrimary'>.</span> <br> Activate<span class='colorPrimary'>.</span>"
                titleTag="h1"
                description="<p><strong>This is how we go to market.</strong></p> <p>These connected disciplines. Core commercial system.</p> <p>From the first pound committed to the final delivery reconciliation, Trade, Plan and Activate stay connected.</p>"
                image="/images/services/our-services-trade-plan-activate-1.5x.avif"
                btnTextPrimary={null}
            />

            <TextIntro />

            <StickyNav />

            <TradeSection />

            <PlanSection />

            <Content
                eyebrowNumber={null}
                eyebrowText={null}
                titleContent={<ScrollFillTitle />}
                hasBrandMark={true}
                sectionClassName="sectionPadding"
                btnTextPrimary={null}
            />

            <ActivateSection />

            <CtaSection />

        </>

    )

}