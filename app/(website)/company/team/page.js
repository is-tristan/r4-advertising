// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import Banner from "@/components/sections/banner/banner"
import CtaSection from "@/components/sections/cta/cta-section"
import TeamGrid from "@/components/screens/company/team/components/team-grid/team-grid"
import DisciplinesSection from "@/components/sections/disciplines/disciplines-section"

export const metadata = buildPageMetadata({
    title: "Team",
    description: "A collective of strategists, traders, and creatives united by a shared passion for delivering exceptional media experiences.",
    path: "/company/team",
})

export default function TeamPage() {

    return (

        <>

            <Banner
                eyebrow="Our Team"
                title="The people behind the work"
                description="<p>A collective of strategists, traders, and creatives united by a shared passion for delivering exceptional media experiences.</p>"
            />

            <TeamGrid />

            <DisciplinesSection
                eyebrowNumber="03"
                data={[
                    {
                        number: "01",
                        title: "Relentless curiosity",
                        description: "We question everything. From media conventions to data assumptions, we dig deeper to find better answers.",
                        href: "/contact"
                    },
                    {
                        number: "02",
                        title: "Radical transparency",
                        description: "No hidden fees, no obscure metrics. We believe our clients deserve complete visibility into their media investments.",
                        href: "/contact"
                    },
                    {
                        number: "03",
                        title: "Collective ambition",
                        description: "Individual brilliance meets team power. We celebrate wins together and learn from setbacks as one.",
                        href: "/contact"
                    }
                ]}
            />

            <CtaSection eyebrowNumber="04" />

        </>

    )

}