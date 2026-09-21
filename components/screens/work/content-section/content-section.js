// Components
import ContentSectionItem from "./component/content-section-item";

// Styles
import styles from "./styles/content-section.module.scss";

const contentBlocks = [
    {
        key: "trade",
        id: "tradeContent",
        contentKey: "tradeContent",
        eyebrow: { text: "Negotiation & Value Creation", number: null },
        title: "<span class='colorPrimary'>1.</span> Trade",
    },
    {
        key: "plan",
        id: "planContent",
        contentKey: "planContent",
        eyebrow: { text: "Strategic Media Planning", number: null },
        title: "<span class='colorPrimary'>2.</span> Plan",
    },
    {
        key: "activate",
        id: "activateContent",
        contentKey: "activateContent",
        eyebrow: { text: "Campaign Execution", number: null },
        title: "<span class='colorPrimary'>3.</span> Activate",
    },
    {
        key: "result",
        id: "resultContent",
        contentKey: "resultContent",
        eyebrow: { text: "Measurable Outcomes", number: null },
        title: "<span class='colorPrimary'>4.</span> Result",
    },
    {
        key: "testimonial",
        id: "testimonialContent",
        contentKey: "testimonialContent",
        dataType: "testimonial",
    },
];

export default function ContentSection({
    tradeContent,
    planContent,
    activateContent,
    resultContent,
    testimonialContent,
}) {

    const contentByKey = {
        tradeContent,
        planContent,
        activateContent,
        resultContent,
        testimonialContent,
    };

    const blocks = contentBlocks.filter((block) => contentByKey[block.contentKey]?.length);

    if (!blocks.length) {
        return null;
    }

    return (

        <div className={styles.contentSection}>

            {blocks.map((block) => (

                <ContentSectionItem
                    key={block.key}
                    id={block.id}
                    content={contentByKey[block.contentKey]}
                    dataType={block.dataType}
                    eyebrow={block.eyebrow}
                    title={block.title}
                    containerClass={block.containerClass}
                />

            ))}

        </div>

    )

}
