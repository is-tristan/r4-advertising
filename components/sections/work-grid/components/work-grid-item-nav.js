"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/work-grid.module.scss";

export default function WorkGridItemNav({ items }) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (

        <nav ref={ref} className={styles.workGridItemNav}>

            {items.map((item, index) => (

                <motion.button
                    key={item.slug}
                    data-name={item.slug}
                    role="tab"
                    aria-controls={item.slug}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                    initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                    transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
                >

                    <span>{item.label}</span>

                </motion.button>

            ))}

        </nav>

    )

}
