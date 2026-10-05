// Components
import SplitTitle from "../split-title/split-title";
import PlanSectionContent from "./components/plan-section-content";
import OrderSection from "../order-section/order-section";
import FaqsSection from "@/components/sections/faqs/faqs-section";

// Data
import { planningCapabilitiesFaqs } from "@/app/(website)/services/data/services-data";

export default function PlanSection() {

    return (

        <section id="plan" className={`row noGap`}>

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