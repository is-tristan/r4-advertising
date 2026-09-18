"use client";

// React
import { useRef } from "react";

// Motion
import { motion, useInView } from "motion/react";

// Styles
import styles from "./styles/eyebrow.module.scss";

export default function Eyebrow({
    className = undefined,
    theme = "light",
    type = "default",
    number = "01",
    separator = "//",
    text = "Lorem Ipsum",
    hasAnimation = true,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });
    const Tag = type === "heading" ? motion.h2 : motion.div;

    return (

        <Tag
            ref={ref}
            animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
            initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
            transition={hasAnimation ? { duration: 0.5, delay: 0.15 } : { duration: 0, delay: 0 }}
            className={`${styles.eyebrow} eyebrow ${className || ""}`}
            data-theme={theme}
            data-type={type}
        >

            {number && (<span className={styles.number}>{number}</span>)}

            {separator && (<span className={styles.separator}>{separator}</span>)}

            {text && (<span className={styles.text}>{text}</span>)}

        </Tag>

    )
}
