"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/career-grid.module.scss";

export default function LocationFilter({
    locations = [],
    activeLocation = "all",
    onSelect,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    const filterItems = [
        { id: "all", label: "All" },
        ...locations.map((location) => ({
            id: location,
            label: location,
        })),
    ];

    if (!locations.length) {
        return null;
    }

    return (

        <div ref={ref} className={styles.locationFilter} role="group" aria-label="Filter by location">

            {filterItems.map((item, index) => {

                const isActive = activeLocation === item.id;

                return (

                    <motion.button
                        key={item.id}
                        type="button"
                        data-active={isActive}
                        aria-pressed={isActive}
                        onClick={() => onSelect?.(item.id)}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                        initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                        transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
                    >

                        <div className={styles.locationFilterButton}>

                            <span>{item.label}</span>

                        </div>

                    </motion.button>

                );

            })}

        </div>

    );

}
