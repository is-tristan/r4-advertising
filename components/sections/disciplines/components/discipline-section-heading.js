"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";

// Styles
import styles from "../styles/disciplines.module.scss";

export default function DisciplineSectionHeading({
    eyebrowNumber = "04",
    eyebrowText = "Our Disciplines",
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <motion.div
            ref={ref}
            className={styles.disciplinesSectionHeading}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >

            <div className={styles.disciplinesSectionLeft}>

                <Eyebrow
                    number={eyebrowNumber}
                    text={eyebrowText}
                    type="heading"
                    hasAnimation={false}
                />

            </div>

            <div className={styles.disciplinesSectionRight}>

                <span>Trade</span>

                <span className={styles.separator}>//</span>

                <span>Plan</span>

                <span className={styles.separator}>//</span>

                <span>Activate</span>

            </div>

        </motion.div>

    )

}
