"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Icons
import { contractTypeIcon, locationIcon, salaryIcon } from "@/utils/icons";

// Styles
import styles from "../styles/career-meta-item.module.scss";

export default function CareerMetaItem({
    contractType,
    location,
    salary,
    hasAnimation = true,
    className,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    const items = [
        contractType && {
            key: "contractType",
            label: "Contract type",
            icon: contractTypeIcon,
            value: contractType,
        },
        location && {
            key: "location",
            label: "Location",
            icon: locationIcon,
            value: location,
        },
        salary && {
            key: "salary",
            label: "Salary",
            icon: salaryIcon,
            value: salary,
        },
    ].filter(Boolean);

    if (!items.length) {

        return null;

    }

    return (

        <div ref={ref} className={`${styles.careerMetaItems} ${className || ""}`}>

            {items.map((item, index) => {

                const animationProps = {
                    animate: hasAnimation
                        ? (isInView
                            ? { opacity: 1, x: 0, filter: "blur(0)" }
                            : { opacity: 0, x: 16, filter: "blur(0.25rem)" })
                        : { opacity: 1, x: 0, filter: "blur(0)" },
                    initial: hasAnimation
                        ? { opacity: 0, x: 16, filter: "blur(0.25rem)" }
                        : { opacity: 1, x: 0, filter: "blur(0)" },
                    transition: hasAnimation
                        ? { duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }
                        : { duration: 0, delay: 0 },
                };

                return (

                    <motion.div
                        key={item.key}
                        className={styles.careerMetaItem}
                        aria-label={item.label}
                        {...animationProps}
                    >

                        <div
                            className={styles.careerMetaItemIcon}
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                        />

                        <span>{item.value}</span>

                    </motion.div>

                );

            })}

        </div>

    );

}
