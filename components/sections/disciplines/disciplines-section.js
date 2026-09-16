// Next
import Image from "next/image";

// Styles
import styles from "./styles/disciplines.module.scss";

// Components
import DisciplineSectionHeading from "./components/discipline-section-heading";
import DisciplineSectionContentItem from "./components/discipline-section-content-item";

export default function Disciplines({
    eyebrowNumber = "04",
    eyebrowText = "Our Disciplines",
    image = null,
    headingType = "default",
    data = [
        {
            number: "01",
            title: "Trade",
            description: "Media bought without hidden margins. All volume-based value returned to you, declared up front.",
            href: "/services#trade"
        },
        {
            number: "02",
            title: "Plan",
            description: "Decisions built around real behaviour, validated with Experian, TGI and CACI. Not assumptions.",
            href: "/services#plan"
        },
        {
            number: "03",
            title: "Activate",
            description: "Delivery overseen, verified and audited. We travel to sites; assumption replaced with proof.",
            href: "/services#activate"
        }
    ]
}) {

    return (

        <section className={`row ${styles.disciplinesSection}`}>

            <div className={`container ${styles.disciplinesSectionContainer}`}>

                <DisciplineSectionHeading
                    eyebrowNumber={eyebrowNumber}
                    eyebrowText={eyebrowText}
                />

                <div className={styles.disciplinesSectionContent}>

                    {data.map((item, index) => (

                        <DisciplineSectionContentItem
                            key={item.number}
                            item={item}
                            index={index}
                            headingType={headingType}
                        />

                    ))}

                </div>

            </div>

            {image && (

                <div className={styles.disciplinesSectionImage}>

                    <Image
                        src={image}
                        alt={eyebrowText}
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
