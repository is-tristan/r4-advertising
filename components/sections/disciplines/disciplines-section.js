// Next
import Image from "next/image";

// Styles
import styles from "./styles/disciplines.module.scss";

// Components
import DisciplineSectionHeading from "./components/discipline-section-heading";
import DisciplineSectionContentItem from "./components/discipline-section-content-item";

export default function Disciplines({
    sectionClass,
    containerClass,
    eyebrowNumber = "04",
    eyebrowText = "Our Disciplines",
    image = null,
    headingType = "default",
    data = [
        {
            number: "01",
            title: "Trade",
            description: "Media bought without hidden margins. All volume-based value returned to you, declared up front.",
            href: "/services#trade",
            hasLineHeight: false,
        },
        {
            number: "02",
            title: "Plan",
            description: "Decisions built around real behaviour, validated with Experian, TGI and CACI. Not assumptions.",
            href: "/services#plan",
            hasLineHeight: false,
        },
        {
            number: "03",
            title: "Activate",
            description: "Delivery overseen, verified and audited. We travel to sites; assumption replaced with proof.",
            href: "/services#activate",
            hasLineHeight: false,
        }
    ]
}) {

    return (

        <section className={`row ${styles.disciplinesSection} ${sectionClass ? sectionClass : undefined}`}>

            <div className={`container ${styles.disciplinesSectionContainer} ${containerClass ? containerClass : undefined}`}>

                {eyebrowText && (

                    <DisciplineSectionHeading
                        eyebrowNumber={eyebrowNumber}
                        eyebrowText={eyebrowText}
                    />

                )}

                <div className={styles.disciplinesSectionContent}>

                    {data.map((item, index) => (

                        <DisciplineSectionContentItem
                            key={item.number}
                            item={item}
                            index={index}
                            headingType={headingType}
                            hasLineHeight={item.hasLineHeight}
                        />

                    ))}

                </div>

            </div>

            {image && (

                <div className={styles.disciplinesSectionImage}>

                    <Image
                        src={image}
                        alt={eyebrowText || ""}
                        fill
                        sizes="512px"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                    />

                </div>

            )}

        </section >

    )

}
