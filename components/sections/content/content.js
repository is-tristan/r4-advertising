// Components
import Text from "@/components/content/text/text";
import Button from "@/components/handlers/button";
import ImageCol from "./components/image-col";

// Styles
import styles from "./styles/content.module.scss";

// Icons
import { logo } from "@/utils/icons";

export default function ContentSection({
    sectionName = undefined,
    sectionClassName = undefined,
    containerClassName = undefined,
    eyebrowNumber = "01",
    eyebrowText = "Lorem Ipsum",
    titleTag = "h2",
    title,
    description,
    image,
    imagePosition = "right",
    btnTextPrimary = "Start your brief",
    btnLinkPrimary = "/contact",
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

                    <ImageCol image={image} alt={title} imagePosition={imagePosition} />

                )}

                <div className="contentCol">

                    <div className="content" data-alignment={!image ? "centered" : null}>

                        <Text
                            eyebrow={{ number: eyebrowNumber, text: eyebrowText ? eyebrowText : null }}
                            title={title}
                            titleClass={`sectionTitle`}
                            titleTag={titleTag}
                            description={description}
                            alignment={!image ? "centered" : "default"}
                        />

                        <div className="buttons">

                            {btnTextPrimary && (

                                <Button text={btnTextPrimary} href={btnLinkPrimary} target={btnTargetPrimary} className="primary" />

                            )}

                            {btnTextSecondary && (

                                <Button text={btnTextSecondary} href={btnLinkSecondary} target={btnTargetSecondary} className="transparent" />

                            )}

                        </div>

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