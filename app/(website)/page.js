// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import WorkCarouselSection from "@/components/screens/home/work-carousel/work-carousel-section";
import CompanyCarouselSection from "@/components/sections/company-carousel/company-carousel";
import ContentSection from "@/components/sections/content/content";
import WorkGrid from "@/components/sections/work-grid/work-grid";
import DisciplinesSection from "@/components/sections/disciplines/disciplines-section";
import CtaSection from "@/components/sections/cta/cta-section";

export const metadata = buildPageMetadata({
  title: "Media Buying & Planning Specialists",
  description: "R4 Advertising. The Media Buying and Planning Specialists in Cardiff and London. Trade. Plan. Activate. More commercial value from your media investment.",
  path: "/",
})

export default function Home() {

  return (

    <>

      <WorkCarouselSection />

      <CompanyCarouselSection />

      <ContentSection
        containerClassName={`noPaddingBottom`}
        eyebrowNumber="02"
        eyebrowText="How we work"
        title="TRADE. PLAN. ACTIVATE."
        titleTag="h1"
        titleClass={`sectionTitle`}
        description="<p>R4 exists to close the gap between ambition and outcome - by bringing trading discipline, audience understanding, and delivery governance into one system.</p><p><strong>That's how investment turns into results. Consistently. Deliberately.</strong></p>"
        hasBrandMark={true}
      />

      <WorkGrid hasButton={true} />

      <ContentSection
        sectionClassName={`sectionPadding`}
        containerClassName={`noPaddingTop noPaddingBottom`}
        mobileAlignment="centered"
        eyebrowNumber={null}
        eyebrowText={null}
        title="Ready to be our next case study?"
        titleClass={`sectionTitle`}
      />

      <DisciplinesSection headingType="largeHeading" />

      <CtaSection
        eyebrowNumber="05"
        title="Your Media Investment Creates Commercial Value"
        description="<p>Media owners offer increasing discounts when campaign spend reaches defined thresholds. The more you spend, the greater the Volume Based Discount available.</p><p>R4 makes this value visible before campaign planning begins, so you understand the discount your investment has unlocked.</p>"
        btnTextPrimary="Calculate your Discount"
        btnLinkPrimary="/calculator"
        hasSpinner={false}
      />

    </>

  )

}
