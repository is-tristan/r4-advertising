"use client";

// Next
import Link from "next/link";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/disciplines.module.scss";

// Icons
import { arrowUpRight } from "@/utils/icons";

export default function DisciplineSectionContentItem({
    item,
    headingType,
    index = 0,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <motion.div
            ref={ref}
            className={styles.disciplinesContentItem}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
            data-heading-type={headingType}
        >

            <div className={styles.disciplinesContentItemLeft}>

                <div className={styles.disciplinesContentItemTitle}>

                    <span>{item.number}</span>

                    <h3>{item.title}</h3>

                </div>

                <p>{item.description}</p>

            </div>

            <div className={styles.disciplinesContentItemRight}>

                <Link href={item.href} className={styles.disciplinesContentItemLink} dangerouslySetInnerHTML={{ __html: arrowUpRight }} />

            </div>

        </motion.div>

    )
}
