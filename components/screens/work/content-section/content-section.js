// Components
import ContentSectionItem from "./component/content-section-item";

// Styles
import styles from "./styles/content-section.module.scss";

const contentBlocks = [
    {
        key: "trade",
        id: "tradeContent",
        contentKey: "tradeContent",
        eyebrowKey: "tradeEyebrow",
        titleKey: "tradeTitle",
        number: "1.",
        eyebrow: "Negotiation & Value Creation",
        title: "Trade",
    },
    {
        key: "plan",
        id: "planContent",
        contentKey: "planContent",
        eyebrowKey: "planEyebrow",
        titleKey: "planTitle",
        number: "2.",
        eyebrow: "Strategic Media Planning",
        title: "Plan",
    },
    {
        key: "activate",
        id: "activateContent",
        contentKey: "activateContent",
        eyebrowKey: "activateEyebrow",
        titleKey: "activateTitle",
        number: "3.",
        eyebrow: "Campaign Execution",
        title: "Activate",
    },
    {
        key: "result",
        id: "resultContent",
        contentKey: "resultContent",
        eyebrowKey: "resultEyebrow",
        titleKey: "resultTitle",
        number: "4.",
        eyebrow: "Measurable Outcomes",
        title: "Result",
    },
    {
        key: "testimonial",
        id: "testimonialContent",
        contentKey: "testimonialContent",
        dataType: "testimonial",
    },
];

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;");
}

export default function ContentSection({
    tradeEyebrow,
    tradeTitle,
    tradeContent,
    planEyebrow,
    planTitle,
    planContent,
    activateEyebrow,
    activateTitle,
    activateContent,
    resultEyebrow,
    resultTitle,
    resultContent,
    testimonialContent,
}) {

    const contentByKey = {
        tradeEyebrow,
        tradeTitle,
        tradeContent,
        planEyebrow,
        planTitle,
        planContent,
        activateEyebrow,
        activateTitle,
        activateContent,
        resultEyebrow,
        resultTitle,
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
                    eyebrow={block.eyebrow ? {
                        text: contentByKey[block.eyebrowKey] || block.eyebrow,
                        number: null,
                    } : undefined}
                    title={block.title ? `<span class="colorPrimary">${block.number}</span> ${escapeHtml(contentByKey[block.titleKey] || block.title)}` : undefined}
                    containerClass={block.containerClass}
                />

            ))}

        </div>

    )

}
