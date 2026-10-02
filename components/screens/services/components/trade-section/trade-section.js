// Components
import SplitTitle from "../split-title/split-title";
import DisciplinesSection from "@/components/sections/disciplines/disciplines-section";

const tradeSectionData = [
    {
        number: "01",
        title: "Media Investment",
        description: "Media investment creates <strong>buying power</strong>.",
        href: "/services#trade"
    },
    {
        number: "02",
        title: "Buying power",
        description: "<strong>Buying power</strong> creates commercial value.",
        href: "/services#trade"
    },
    {
        number: "03",
        title: "commercial value",
        description: "R4 makes that position <strong>visible</strong> & <strong>accountable</strong>.",
        href: "/services#trade"
    },
    {
        number: "04",
        title: "Client value",
        titleColor: "colorPrimary",
        description: "And that's how we build <strong>client value</strong>.",
        href: "/services#trade"
    },
]

export default function TradeSection() {

    return (

        <section id="trade" className={`row noGap`}>

            <div className={`container noPaddingTop noPaddingBottom`}>

                <SplitTitle />

            </div>

            <DisciplinesSection
                containerClass="noPaddingTop"
                eyebrowNumber={null}
                eyebrowText={null}
                data={tradeSectionData}
            />

        </section>

    );

}