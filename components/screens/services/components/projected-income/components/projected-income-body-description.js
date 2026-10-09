"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Components
import Button from "@/components/handlers/button";

// Styles
import styles from "../styles/projected-income.module.scss";

export default function ProjectedIncomeBodyDescription({
    description = null,
    buttonText = "Model your own position",
    buttonLink = "/calculator",
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <motion.div
            ref={ref}
            className={styles.projectedIncomeBodyDescription}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >

            {description && (

                <p>{description}</p>

            )}

            <Button text={buttonText} href={buttonLink} hasAnimation={false} className={`primary ${styles.button}`} />

        </motion.div>

    );

}
