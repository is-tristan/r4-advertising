"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/projected-income.module.scss";

const navItems = [
    {
        id: "project",
        label: "Project",
    },
    {
        id: "annualMediaCommitment",
        label: "Annual Media Commitment",
    },
]

export default function ProjectedIncomeHeader({
    activeNav = "project",
    onNavClick,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    const handleNavClick = (nav) => {

        if (nav === activeNav) {

            return;

        }

        onNavClick?.(nav);

    };

    return (

        <div ref={ref} className={styles.projectedIncomeHeader}>

            <motion.span
                className={styles.title}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            >

                Illustrative position

            </motion.span>

            <motion.div
                className={styles.nav}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            >

                {navItems.map((item) => (

                    <button
                        key={item.id}
                        type="button"
                        className={styles.navButton}
                        data-active={activeNav === item.id}
                        aria-pressed={activeNav === item.id}
                        onClick={() => handleNavClick(item.id)}
                    >

                        {item.label}

                    </button>

                ))}

            </motion.div>

        </div>

    );

}
