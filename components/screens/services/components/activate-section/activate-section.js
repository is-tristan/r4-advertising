// Components
import SplitTitle from "../split-title/split-title";
import FeaturedVideo from "@/components/screens/work/featured-video/featured-video";
import OrderSection from "../order-section/order-section";
import FaqsSection from "@/components/sections/faqs/faqs-section";
import CompanyCarousel from "@/components/sections/company-carousel/company-carousel";

// Data
import { activateOrderSectionData, activateCapabilitiesFaqs, logoData } from "@/app/(website)/services/data/services-data";

export default function ActivateSection() {

    return (

        <section id="activate" className={`row noGap`}>

            <SplitTitle
                number="03"
                title="Activate"
                description="Delivery governance, not box-ticking."
            />

            <FeaturedVideo
                headerOffset={false}
                containerClass="noPaddingTop noPaddingBottom"
            />

            <CompanyCarousel
                data={logoData}
                hasBorders={false}
            />

            <OrderSection
                containerClass="noPaddingTop"
                eyebrow="The control loop"
                data={activateOrderSectionData}
            />

            <FaqsSection
                type="stacked"
                containerClass="noPaddingTop"
                eyebrow={{ text: "Activation capabilities" }}
                data={activateCapabilitiesFaqs}
            />

        </section>

    );

}