"use client";

// React
import { useState } from "react";

// Imports
import { motion } from "motion/react";

// Styles
import styles from "@/styles/components/sections/faqs-section.module.scss";

// Icons
import { faqIcon } from "@/utils/icons";

export default function FaqItem({ index, question, answer, isInView }) {

    const [isOpen, setIsOpen] = useState(false);

    return (

        <motion.div
            className={`${styles.faqItem} ${isOpen ? styles.itemActive : undefined}`}
            initial={{ opacity: 0, y: 10, filter: "blur(0.25rem)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setIsOpen(!isOpen)}
        >

            <div className={styles.faqItemHeader} aria-label="Toggle FAQ answer">

                <div className={styles.faqItemHeaderContent}>

                    <div className={styles.faqItemIcon} dangerouslySetInnerHTML={{ __html: faqIcon }} />

                    <h3>{question}</h3>

                </div>

                <button className={styles.faqItemButton} />

            </div>

            <div className={styles.faqItemAnswer} style={{ display: isOpen ? "flex" : "none" }}>

                <div className={styles.faqItemAnswerContent} dangerouslySetInnerHTML={{ __html: answer }} />

            </div>

        </motion.div>

    )

}