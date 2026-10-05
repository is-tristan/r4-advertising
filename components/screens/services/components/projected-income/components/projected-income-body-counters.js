"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Components
import NumberCounter from "@/components/handlers/numberCounter/number-counter";

// Styles
import styles from "../styles/projected-income.module.scss";

export default function ProjectedIncomeBodyCounters({ counters = [] }) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <div ref={ref} className={styles.projectedIncomeBodyCounters}>

            {counters.map((counter, index) => (

                <motion.div
                    key={`${counter.description}-${counter.end}-${index}`}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                    initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                    transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
                >

                    <NumberCounter {...counter} />

                </motion.div>

            ))}

        </div>

    );

}
