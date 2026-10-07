"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "./styles/split-title.module.scss";

export default function SplitTitle({
    number = "01",
    title = "Trade",
    description = "This is where value is created and where it belongs.",
    position = "default",
    hasBorder = true,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <div className="container noPaddingTop noPaddingBottom">

            <div ref={ref} className={styles.splitTitle} data-position={position} data-has-border={hasBorder}>

                <motion.div
                    className={styles.splitTitleContainer}
                    animate={isInView ? { opacity: 1, x: 0, filter: "blur(0)" } : { opacity: 0, x: -16, filter: "blur(0.25rem)" }}
                    initial={{ opacity: 0, x: -16, filter: "blur(0.25rem)" }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >

                    <h2 className={`sectionTitle ${styles.splitTitleHeading}`}>

                        <span>

                            <strong>{number}.</strong>

                        </span>

                        {title}

                    </h2>

                </motion.div>

                <motion.div
                    className={styles.description}
                    animate={isInView ? { opacity: 1, x: 0, filter: "blur(0)" } : { opacity: 0, x: 16, filter: "blur(0.25rem)" }}
                    initial={{ opacity: 0, x: 16, filter: "blur(0.25rem)" }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >

                    <p>{description}</p>

                </motion.div>

            </div>

        </div>

    );

}
