"use client";

// Imports
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

// Styles
import styles from "./styles/scroll-fill-title.module.scss";

export default function ScrollFillTitle({
    lead = "The plan is Agreed.",
    fill = "Now make it real.",
}) {

    const ref = useRef(null);
    const [isFilled, setIsFilled] = useState(false);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.85", "end 0.45"],
    });
    const backgroundPosition = useTransform(scrollYProgress, [0, 1], ["100% center", "0% center"]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {

        if (latest >= 1) {
            setIsFilled(true);
        }

    });

    useEffect(() => {

        if (scrollYProgress.get() >= 1) {
            setIsFilled(true);
        }

    }, [scrollYProgress]);

    return (

        <h2 className={`sectionTitle ${styles.scrollFillTitle}`}>

            <span>{lead}</span>

            <br />

            <motion.span
                ref={ref}
                className={styles.scrollFillTitleText}
                style={isFilled ? { backgroundPosition: "0% center" } : { backgroundPosition }}
            >

                {fill}

            </motion.span>

        </h2>

    );

}
