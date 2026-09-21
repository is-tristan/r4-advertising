// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import Content from "@/components/sections/content/content";
import OurModel from "@/components/screens/company/about/our-model/our-model-section";
import CtaSection from "@/components/sections/cta/cta-section";
import FaqsSection from "@/components/sections/faqs/faqs-section";

export const metadata = buildPageMetadata({
    title: "Services",
    description: "Trade. Plan. Activate. Three connected disciplines designed to operate together — giving clients control over margins, clarity in decision-making, and outcomes that stand up to scrutiny.",
    path: "/services",
})

export default function ServicesPage() {

    return (

        <>

            <Content
                sectionClassName={`headerOffset`}
                containerClassName="noPaddingBottom"
                eyebrowNumber="01"
                eyebrowText="Our Services"
                title="Trade. Plan. Activate."
                titleTag="h1"
                description="<p><strong>This is how we go to market.</strong></p> <p>Not as a list of services, but as <strong>three connected disciplines</strong> designed to operate together.</p> <p>Trading establishes where value sits and how it is controlled. Planning determines where attention can realistically be earned. Activation ensures what was agreed is delivered, verified and accounted for.</p> <p>Each discipline informs the next. Those decisions are carried through to delivery, without dilution or disconnect.</p> <p>At R4 Advertising, this model gives clients control over margins, clarity in decision-making, and outcomes that stand up to scrutiny.</p> <p>It is the system behind our growth. And the reason clients continue to rebook, again and again.</p>"
                image="/images/services/our-services-trade-plan-activate-1.5x.avif"
                btnTextPrimary={null}
            />

            <FaqsSection />

            <CtaSection eyebrowNumber="02" />

        </>

    )

}