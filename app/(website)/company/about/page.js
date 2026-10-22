// SEO
import { buildRouteMetadata } from "@/lib/pageSeo"

// Components
import Banner from "@/components/sections/banner/banner";
import Content from "@/components/sections/content/content";
import OurModel from "@/components/screens/company/about/our-model/our-model-section";
import CtaSection from "@/components/sections/cta/cta-section";

export async function generateMetadata() {
    return buildRouteMetadata({
        title: "About Our Media Specialists",
        description: "Meet R4 Advertising, the media buying and planning specialists in Cardiff and London. Built on trading expertise, audience intelligence and commercial ambition.",
        path: "/company/about",
    })
}

export default function AboutPage() {

    return (

        <>

            <Banner
                eyebrow="About Us"
                title="Built for the Real World"
                description="<p>R4 is a media trading, planning and activation agency built around how media actually works in the real world.</p>"
            />

            <Content
                eyebrowNumber="02"
                eyebrowText="Leadership"
                title="Matt Jones MBE"
                description="<p>The business is led by Matt Jones MBE, an entrepreneur and agency leader with over twenty years' experience at senior level across the advertising and media industry.</p> <p>Matt has worked with all major global media owners, served as CMO for one of the UK's fastest-growing motor brands, founded and scaled successful B2C businesses, and built, scaled and exited the UK's fastest-growing independent media agency in 2019.</p> <p>That experience shapes how we operate today: commercially disciplined, outcome-led, and focused on performance rather than process.</p>"
                imagePosition="left"
                image="/images/company/about/about-matt-jones.jpg"
            />

            <Content
                eyebrowNumber="03"
                eyebrowText="Our Mission"
                title="Removing Inefficiency"
                description="<p>We exist to help brands grow by removing inefficiency from media investment.</p> <p>Too often, media underperforms not because of ambition or creativity, but because value is lost between buying, planning and activation. Trading decisions are disconnected from strategy. Campaigns go live without true accountability. Performance becomes assumed rather than engineered.</p> <p><strong>R4 was built to change that.</strong></p>"
                btnTextPrimary={null}
            />

            <OurModel />

            <Content
                eyebrowNumber="05"
                eyebrowText="Why it works"
                title="Inseparable Disciplines"
                description="<p><strong>Because these disciplines are inseparable.</strong></p> <p>Trading without planning creates waste. Planning without activation creates risk. Activation without commercial control creates leakage. When trade, plan and activate operate as a single system, media becomes a growth engine rather than a cost centre.</p> <p><strong>That is the difference at R4.</strong></p> <p>We work with ambitious brands and organisations that value clarity, pace and measurable commercial outcomes. We combine senior leadership, hands-on delivery and deep market knowledge to make media perform under real-world conditions. No bias. No lock-in. Just disciplined media, built to grow brands.</p>"
                btnTextPrimary={null}
                image="/images/company/about/about-inseparable-disciplines.png"
            />

            <CtaSection
                eyebrowNumber="06"
                title="Bring us the problem"
            />

        </>

    )

}