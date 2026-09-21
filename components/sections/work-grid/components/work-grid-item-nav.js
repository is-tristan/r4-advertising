"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/work-grid.module.scss";

export default function WorkGridItemNav({
    items = [],
    activeId = "",
    onSelect,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    const navItems = [
        { _id: "", label: "All", slug: "all" },
        ...items,
    ];

    return (

        <nav ref={ref} className={styles.workGridItemNav} role="tablist">

            {navItems.map((item, index) => {

                const isActive = activeId === item._id;

                return (

                    <motion.button
                        key={item.slug}
                        type="button"
                        data-name={item.slug}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={item.slug}
                        data-active={isActive}
                        onClick={() => onSelect?.(item._id)}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                        initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                        transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
                    >

                        <div className={styles.workGridItemButton}>

                            <span>{item.label}</span>

                        </div>

                    </motion.button>

                );

            })}

        </nav>

    )

}
