// Components
import Text from "@/components/content/text/text";
import Button from "@/components/handlers/button";
import Spinner from "@/components/decoration/spinner/spinner";

// Styles
import styles from "./styles/cta-section.module.scss";

// Icons
import { logo } from "@/utils/icons";

export default function CtaSection({
    eyebrowNumber = "04",
    eyebrowText = "Take Action Now",
    title = "Bring us the problem <br> Trade. Plan. Activate.",
    description = "<p>We work with ambitious brands and organisations that value clarity, pace and measurable commercial outcomes. We combine senior leadership, hands-on delivery and deep market knowledge to make media perform under real-world conditions. No bias. No lock-in. Just disciplined media, built to grow brands.</p>",
    btnTextPrimary = "Get started",
    btnLinkPrimary = "/contact",
    hasSpinner = false,
    spinnerBackground = "/decoration/cta-spinner/cta-spinner-background.svg",
    spinnerText = "/decoration/cta-spinner/cta-spinner-text.svg"
}) {

    return (

        <section className={`row ${styles.ctaSection}`} style={{ overflow: hasSpinner ? "visible" : "hidden" }}>

            <div className="container">

                <div className={`content ${styles.ctaSectionContent}`} data-alignment="centered">

                    <Text
                        eyebrow={{ number: eyebrowNumber, text: eyebrowText, eyebrowTheme: "dark" }}
                        title={title}
                        titleClass={`sectionTitle`}
                        description={description}
                    />

                    <div className="buttons">

                        <Button
                            text={btnTextPrimary}
                            href={btnLinkPrimary}
                            className="primary"
                        />

                    </div>

                </div>

                <div className={styles.ctaSectionBackground} aria-hidden="true" dangerouslySetInnerHTML={{ __html: logo }} />

            </div>

            {hasSpinner && (<Spinner type="cta" background={spinnerBackground} text={spinnerText} />)}

        </section>

    )

}