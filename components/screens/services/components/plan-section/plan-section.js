// Sanity
import { client } from "@/sanity/lib/client";
import { servicesPageQuery } from "@/sanity/lib/queries";
import { getSanityImageAlt, getSanityImageUrl } from "@/sanity/lib/image";

// Components
import SectionImage from "../section-image/section-image";
import SplitTitle from "../split-title/split-title";
import PlanSectionContent from "./components/plan-section-content";
import OrderSection from "../order-section/order-section";
import FaqsSection from "@/components/sections/faqs/faqs-section";

// Data
import { planningCapabilitiesFaqs } from "@/app/(website)/services/data/services-data";

const fallbackImage = "/images/services/our-services-section-plan.avif";

export default async function PlanSection() {

    const page = await client.fetch(servicesPageQuery, {}, {
        next: { revalidate: 30 },
    });

    const image = getSanityImageUrl(page?.planSectionImage, "sectionImage") || fallbackImage;
    const alt = getSanityImageAlt(page?.planSectionImage, "Plan");

    return (

        <section id="plan" className={`row noGap`}>

            <SectionImage
                image={image}
                alt={alt}
            />

            <SplitTitle
                number="02"
                title="Plan"
                description="Decisions that hold up in the real world."
            />

            <PlanSectionContent />

            <OrderSection />

            <FaqsSection
                containerClass="noPaddingTop noPaddingBottom"
                type="stacked"
                eyebrow={{ text: "Planning capabilities" }}
                data={planningCapabilitiesFaqs}
            />

        </section>

    );

}
