// Components
import Text from "@/components/content/text/text";
import Button from "@/components/handlers/button";
import ImageCol from "./components/image-col";

// Styles
import styles from "./styles/content.module.scss";

// Icons
import { logo } from "@/utils/icons";

function plainText(value) {
    if (typeof value !== "string") {
        return "";
    }

    return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function ContentSection({
    sectionName = undefined,
    sectionClassName = undefined,
    containerClassName = undefined,
    eyebrowNumber = "01",
    eyebrowText = null,
    titleTag = "h2",
    title,
    titleContent,
    description,
    image,
    imagePosition = "right",
    btnTextPrimary,
    btnLinkPrimary,
    btnTextSecondary,
    btnLinkSecondary,
    btnTargetPrimary,
    btnTargetSecondary,
    hasBrandMark = false,
}) {

    return (

        <section className={`row ${styles.contentSection} ${sectionClassName}`} data-section-name={sectionName}>

            <div className={`container ${image ? "dualCols" : "centered"} ${imagePosition === "right" ? "rowReverse" : "row"} ${containerClassName ? containerClassName : undefined} ${styles.contentContainer}`}>

                {image && (

                    <ImageCol image={image} alt={plainText(title)} imagePosition={imagePosition} />

                )}

                <div className="contentCol">

                    <div className="content" data-alignment={!image ? "centered" : null}>

                        <Text
                            eyebrow={{ number: eyebrowNumber, text: eyebrowText ? eyebrowText : null }}
                            title={title}
                            titleContent={titleContent}
                            titleClass={`sectionTitle`}
                            titleTag={titleTag}
                            description={description}
                            alignment={!image ? "centered" : "default"}
                        />

                        {btnTextPrimary || btnTextSecondary && (

                            <div className="buttons">

                                {btnTextPrimary && (

                                    <Button text={btnTextPrimary} href={btnLinkPrimary} target={btnTargetPrimary} className="primary" />

                                )}

                                {btnTextSecondary && (

                                    <Button text={btnTextSecondary} href={btnLinkSecondary} target={btnTargetSecondary} className="transparent" />

                                )}

                            </div>

                        )}

                    </div>

                </div>

                {hasBrandMark && (

                    <div
                        aria-hidden="true"
                        className={styles.brandMark}
                        dangerouslySetInnerHTML={{ __html: logo }}
                    />

                )}

            </div>

        </section>

    )

}