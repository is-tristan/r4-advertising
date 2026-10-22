// SEO
import { buildRouteMetadata } from "@/lib/pageSeo"

// Components
import Banner from "@/components/sections/banner/banner"
import CareersGrid from "@/components/screens/company/careers/careers-grid"
import CtaSection from "@/components/sections/cta/cta-section"
import DisciplinesSection from "@/components/sections/disciplines/disciplines-section"

export async function generateMetadata() {
    return buildRouteMetadata({
        title: "Media Careers in Cardiff & London",
        description: "Build your career with R4 Advertising, the media buying and planning specialists in Cardiff and London. Explore opportunities across our growing team.",
        path: "/company/careers",
    })
}

export default function CareersPage() {

    return (

        <>

            <Banner
                eyebrow="Careers"
                title="Join the team"
                description="<p>Join a team that values creativity, strategy, and results. We're always looking for talented people who share our passion for creating impactful media experiences.</p>"
            />

            <CareersGrid />

            <DisciplinesSection
                eyebrowNumber="03"
                eyebrowText="Why R4"
                data={[
                    {
                        number: "01",
                        title: "Impact, not process",
                        description: "We cut through the noise. Every role here is designed to make a real difference for our clients and their audiences.",
                        href: "/contact"
                    },
                    {
                        number: "02",
                        title: "Global reach, local roots",
                        description: "With offices in Cardiff, London, Manchester, and New York, you'll work on international campaigns while staying connected to tight-knit teams.",
                        href: "/contact"
                    },
                    {
                        number: "03",
                        title: "Growth mindset",
                        description: "We invest in our people. From training budgets to mentorship, we're committed to helping you develop your career.",
                        href: "/contact"
                    }
                ]}
            />

            <CtaSection eyebrowNumber="04" />

        </>

    )

}