"use client";

// Imports
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Styles
import styles from "./styles/scroll-fill-title.module.scss";

export default function ScrollFillTitle({
    lead = "The plan is Agreed.",
    fill = "Now make it real.",
}) {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.85", "end 0.45"],
    });
    const backgroundPosition = useTransform(scrollYProgress, [0, 1], ["100% center", "0% center"]);

    return (

        <h2 className={`sectionTitle ${styles.scrollFillTitle}`}>

            <span>{lead}</span>

            <br />

            <motion.span
                ref={ref}
                className={styles.scrollFillTitleText}
                style={{ backgroundPosition }}
            >

                {fill}

            </motion.span>

        </h2>

    );

}
