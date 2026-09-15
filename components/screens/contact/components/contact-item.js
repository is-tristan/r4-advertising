"use client";

// Next
import Link from "next/link";

// Imports
import { motion } from "motion/react";

// Styles
import styles from "@/styles/components/screens/contact-us/contact-us.module.scss";

export default function ContactItem({
    icon,
    topText,
    label,
    href,
    bottomText,
    isInView,
    index = 0,
}) {

    return (

        <motion.div
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15 + (index * 0.075) }}
        >

            <div className={styles.contactItem}>

                <div className={styles.contactItemIcon} dangerouslySetInnerHTML={{ __html: icon }} />

                <div className={styles.contactItemContent}>

                    <span className={styles.contactItemSmallText}>{topText}</span>

                    <span className={styles.contactItemLabel}>{label}</span>

                    <span className={styles.contactItemSmallText}>{bottomText}</span>

                </div>

                <Link href={href} className={`colLink`} />

            </div>

        </motion.div>

    );

}
