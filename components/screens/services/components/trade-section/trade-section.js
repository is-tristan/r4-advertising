// Sanity
import { client } from "@/sanity/lib/client";
import { servicesPageQuery } from "@/sanity/lib/queries";
import { getSanityImageAlt, getSanityImageUrl } from "@/sanity/lib/image";

// Components
import SectionImage from "../section-image/section-image";
import SplitTitle from "../split-title/split-title";
import DisciplinesSection from "@/components/sections/disciplines/disciplines-section";
import ProjectedIncome from "@/components/screens/services/components/projected-income/projected-income";
import FaqsSection from "@/components/sections/faqs/faqs-section";

// Data
import { tradeSectionData, tradingCapabilitiesFaqs } from "@/app/(website)/services/data/services-data";

const fallbackImage = "/images/services/our-services-section-trade.avif";

export default async function TradeSection() {

    const page = await client.fetch(servicesPageQuery, {}, {
        next: { revalidate: 30 },
    });

    const image = getSanityImageUrl(page?.tradeSectionImage, "sectionImage") || fallbackImage;
    const alt = getSanityImageAlt(page?.tradeSectionImage, "Trade");

    return (

        <section id="trade" className={`row noGap`}>

            <SectionImage
                image={image}
                alt={alt}
            />

            <SplitTitle />

            <DisciplinesSection
                containerClass="noPaddingTop"
                eyebrowNumber={null}
                eyebrowText={null}
                data={tradeSectionData}
            />

            <ProjectedIncome />

            <FaqsSection
                containerClass="noPaddingBottom"
                type="stacked"
                eyebrow={{ text: "Trading capabilities" }}
                data={tradingCapabilitiesFaqs}
            />

        </section>

    );

}
