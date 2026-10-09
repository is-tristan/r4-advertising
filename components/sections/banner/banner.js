// Components
import Text from "@/components/content/text/text";

// Styles
import styles from "./styles/banner.module.scss";

export default function Banner({
    sectionClass,
    containerClass,
    eyebrow = null,
    eyebrowNumber = null,
    title = null,
    description = null,
}) {

    return (

        <section id="banner" className={`row ${styles.banner} ${sectionClass}`} >

            <div className={`container ${styles.bannerContainer} ${containerClass}`}>

                <div className={`content ${styles.bannerContent}`}>

                    <Text
                        eyebrow={{ text: eyebrow, number: eyebrowNumber }}
                        titleTag="h1"
                        title={title}
                        description={description}
                    />

                </div>

            </div>

        </section>

    );

}