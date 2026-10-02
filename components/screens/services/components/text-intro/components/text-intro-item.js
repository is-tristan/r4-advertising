"use client";

// Styles
import styles from "../styles/text-intro.module.scss";

// React
import { useRef } from "react";

// Motion
import { motion, useInView } from "motion/react";

function getTitleSpans(title) {

    return [...title.matchAll(/<span>([\s\S]*?)<\/span>/g)].map((match) => match[1]);

}

export default function TextIntroItem({ item }) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const spans = getTitleSpans(item.title);

    return (

        <div className={styles.titleContainer} ref={ref}>

            <div className={styles.title}>

                <div className={styles.eyebrow}>

                    {item.eyebrow}

                </div>

                <h2>

                    {spans.map((span, spanIndex) => (

                        <motion.span
                            key={span}
                            className={styles.word}
                            dangerouslySetInnerHTML={{ __html: span }}
                            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                            transition={{ duration: 0.5, delay: 0.16 * spanIndex, ease: "easeOut" }}
                        />

                    ))}

                </h2>

            </div>

        </div>

    );

}
