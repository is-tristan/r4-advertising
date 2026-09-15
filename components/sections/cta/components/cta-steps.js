"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "@/styles/components/sections/cta.module.scss";

// Data
const stepsData = [
    {
        number: "1",
        description: "Request your InstaQuote",
    },
    {
        number: "2",
        description: "Receive a personalized quote that fits your hair goals + budget",
    },
    {
        number: "3",
        description: "Schedule your appointment",
    },
]

export default function CTASteps() {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <div ref={ref} className={styles.ctaSteps}>

            {stepsData.map((step, index) => (

                <motion.div
                    key={index}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                    initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                    transition={{ duration: 0.5, delay: index * 0.075 }}
                    className={styles.ctaStep}
                >

                    <span className={styles.ctaStepNumber}>{step.number}</span>

                    <p>{step.description}</p>

                </motion.div>

            ))}

        </div>

    )

}