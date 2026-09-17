"use client";

// Imports
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/our-model-section.module.scss";

// Icons
import { arrowUpRight } from "@/utils/icons";

// Data
export const threePillarsData = [
    {
        title: "Trade",
        description: "We start with trading because economics matter. We buy media at scale, negotiate beyond rate cards and apply market discipline to every pound spent. All volume-based discounts are returned to clients. There are no rebates, no hidden margin and no conflicted incentives."
    },
    {
        title: "Plan",
        description: "Planning follows trading insight. We plan around real audience behaviour, movement and attention, not channel theory. Strategy is shaped by where value exists in the market and how people genuinely interact with media in the real world."
    },
    {
        title: "Activate",
        description: "Activation is where accountability lives. We manage delivery, optimisation and performance end to end, ensuring campaigns perform in market as intended. Activation is not a handover; it is an ongoing responsibility."
    },
]

export default function ThreePillars() {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <div className={`container flexAuto flexAutoConstrained noPaddingTop ${styles.threePillars}`} ref={ref}>

            {threePillarsData.map((pillar, index) => (

                <motion.div
                    key={index}
                    animate={isInView
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 24, filter: "blur(0.25rem)" }
                    }
                    initial={{ opacity: 0, y: 24, filter: "blur(0.25rem)" }}
                    transition={{ duration: 0.6, delay: 0.15 * index, ease: "easeOut" }}
                    className={styles.threePillarsItem}
                >

                    <h3 className={styles.threePillarsTitle}>{pillar.title}</h3>

                    <p className={styles.threePillarsDescription}>{pillar.description}</p>

                    <span className={styles.threePillarsIcon} aria-hidden="true" dangerouslySetInnerHTML={{ __html: arrowUpRight }} />

                    <Link aria-label="Go to contact page" href="/contact" className={`colLink`} />

                </motion.div>

            ))}

        </div>

    )
}
