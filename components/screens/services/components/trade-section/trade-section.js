// Components
import SectionImage from "../section-image/section-image";
import SplitTitle from "../split-title/split-title";
import DisciplinesSection from "@/components/sections/disciplines/disciplines-section";
import ProjectedIncome from "@/components/screens/services/components/projected-income/projected-income";
import FaqsSection from "@/components/sections/faqs/faqs-section";

// Data
import { tradeSectionData, tradingCapabilitiesFaqs } from "@/app/(website)/services/data/services-data";

export default function TradeSection() {

    return (

        <section id="trade" className={`row noGap`}>

            <SectionImage
                image="/images/services/our-services-section-trade.avif"
                alt="Trade"
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