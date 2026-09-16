"use client";

// Imports
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/faqs.module.scss";

export default function FaqsSectionContentItem({
    item,
    index = 0,
}) {

    // Motion
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    // Description height
    const descriptionRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        const description = descriptionRef.current;

        if (!description) {
            return;
        }

        const updateHeight = () => {
            setContentHeight(description.scrollHeight);
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(description);

        window.addEventListener("resize", updateHeight);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateHeight);
        };

    }, [item.description]);

    return (

        <motion.div
            ref={ref}
            className={`${styles.faqContentItem} ${isOpen ? styles.faqItemActive : undefined}`}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
            onClick={() => setIsOpen(!isOpen)}
        >

            <div className={styles.faqItemLeft}>

                <div className={styles.faqItemTitle}>

                    <span>{item.number}</span>

                    <h3>{item.title}</h3>

                </div>

                <div className={styles.faqItemDescription}>

                    <p className={styles.faqShortDescription}><strong>{item.shortDescription}</strong></p>

                    <div
                        ref={descriptionRef}
                        className={styles.faqLongDescription}
                        style={{ height: isOpen ? `${contentHeight}px` : "0" }}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                    />

                </div>

            </div>

            <div className={styles.faqItemRight}>

                <button className={styles.faqItemButton} />

            </div>

        </motion.div>

    )
}
