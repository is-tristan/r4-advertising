"use client";

// Styles
import styles from "./styles/text-intro.module.scss";

// Icons
import { logo } from "@/utils/icons";

// Components
import TextIntroItem from "./components/text-intro-item";
import Button from "@/components/handlers/button";

const data = [
    {
        eyebrow: "01",
        title: "<h2><span><strong>Trade</strong></span> <span>creates</span> <span>the</span> <span>leverage.</span></h2>"
    },
    {
        eyebrow: "02",
        title: "<h2><span><strong>Plan</strong></span> <span>directs</span> <span>the</span> <span>value.</span></h2>"
    },
    {
        eyebrow: "03",
        title: "<h2><span><strong>Activate</strong></span> <span>proves</span> <span>the</span> <span>outcome.</span></h2>"
    },
]

export default function TextIntro() {

    return (

        <section className={`row ${styles.textIntro}`}>

            <div className={`container`}>

                <div className={`content ${styles.textIntroContent}`} data-alignment="centered">

                    {data.map((item) => (

                        <TextIntroItem item={item} key={item.eyebrow} />

                    ))}

                    <Button
                        href="/contact"
                        text="Start your brief"
                        className={styles.textIntroButton}
                    />

                </div>

                <div className={styles.brandMark} aria-hidden="true" dangerouslySetInnerHTML={{ __html: logo }} />

            </div>

        </section>

    );

}
