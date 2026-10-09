// SEO
import { buildPageMetadata, siteName } from "@/lib/seo"

// Components
import WorkCarouselSection from "@/components/screens/home/work-carousel/work-carousel-section";
import CompanyCarouselSection from "@/components/sections/company-carousel/company-carousel";
import ContentSection from "@/components/sections/content/content";
import WorkGrid from "@/components/sections/work-grid/work-grid";
import DisciplinesSection from "@/components/sections/disciplines/disciplines-section";
import CtaSection from "@/components/sections/cta/cta-section";

export const metadata = buildPageMetadata({
  title: {
    absolute: siteName,
  },
  description: "R4 exists to close the gap between ambition and outcome — by bringing trading discipline, audience understanding, and delivery governance into one system.",
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
        eyebrowText="Why we stand out"
        title="Stand out Ideas"
        titleClass={`sectionTitle`}
        description="<p>R4 exists to close the gap between ambition and outcome - by bringing trading discipline, audience understanding, and delivery governance into one system.</p><p><strong>That's how investment turns into results. Consistently. Deliberately.</strong></p>"
        hasBrandMark={true}
      />

      <WorkGrid hasButton={true} />

      <ContentSection
        containerClassName={`noPaddingTop`}
        eyebrowNumber={null}
        eyebrowText={null}
        title="Ready to be our next case study?"
        titleClass={`sectionTitle`}
      />

      <DisciplinesSection headingType="largeHeading" />

      <CtaSection
        eyebrowNumber="05"
        title="Rewarded for your loyalty"
        description="<p>Loyalty is returned as a discount you can see. Model the saving on your media investment, then decide how you want to put it to work.</p>"
        btnTextPrimary="Calculate your Discount"
        btnLinkPrimary="/calculator"
        hasSpinner={false}
      />

    </>

  )

}
