// Components
import Text from "@/components/content/text/text";

// Styles
import styles from "./styles/banner.module.scss";

export default function Banner({
    eyebrow = "Lorem Ipsum",
    title = "Lorem Ipsum dolor sit amet",
    description = "Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}) {

    return (

        <section id="banner" className={`row ${styles.banner}`} >

            <div className={`container ${styles.bannerContainer}`}>

                <div className={`content ${styles.bannerContent}`}>

                    <Text
                        eyebrow={{ text: eyebrow }}
                        titleTag="h1"
                        title={title}
                        description={description}
                    />

                </div>

            </div>

        </section>

    );

}