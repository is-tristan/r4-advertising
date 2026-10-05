// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import Content from "@/components/sections/content/content";
import TextIntro from "@/components/screens/services/components/text-intro/text-intro";
import StickyNav from "@/components/screens/services/components/sticky-nav/sticky-nav";
import TradeSection from "@/components/screens/services/components/trade-section/trade-section";
import PlanSection from "@/components/screens/services/components/plan-section/plan-section";
import ActivateSection from "@/components/screens/services/components/activate-section/activate-section";
import CtaSection from "@/components/sections/cta/cta-section";

// Styles
import styles from "./styles/services.module.scss";

// SEO
export const metadata = buildPageMetadata({
    title: "Services",
    description: "Trade. Plan. Activate. Three connected disciplines designed to operate together — giving clients control over margins, clarity in decision-making, and outcomes that stand up to scrutiny.",
    path: "/services",
})

export default function ServicesPage() {

    return (

        <>

            <Content
                sectionClassName={`${styles.introBanner} headerOffset`}
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
                title="<span class='colorTextLight'>The plan is Agreed.</span><br>Now make it real."
                titleClass={`sectionTitle`}
                hasBrandMark={true}
                sectionClassName="sectionPadding"
                btnTextPrimary={null}
            />

            <ActivateSection />

            <CtaSection />

        </>

    )

}