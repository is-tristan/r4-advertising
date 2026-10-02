// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import Content from "@/components/sections/content/content";
import TextIntro from "@/components/screens/services/components/text-intro/text-intro";
import StickyNav from "@/components/screens/services/components/sticky-nav/sticky-nav";
import TradeSection from "@/components/screens/services/components/trade-section/trade-section";

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
                sectionClassName={`${styles.introBanner} headerOffset borderBottom`}
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

            <TradeSection  />

        </>

    )

}