/**
 * 📌 TODO: Add career contact form
**/

"use client";

// Components
import Button from "@/components/handlers/buttons";

// React
import { PortableText } from "@portabletext/react";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/career-singular.module.scss";

const portableTextComponents = {
    marks: {
        link: ({ children, value }) => (

            <a
                href={value?.href}
                target={value?.blank ? "_blank" : undefined}
                rel={value?.blank ? "noopener noreferrer" : undefined}
            >

                {children}

            </a>

        ),
    },
};

export default function CareerContent({
    content,
    hasAnimation = true,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    if (!content?.length) {

        return null;

    }

    return (

        <div className={styles.careerContent}>

            <div className={`container noPaddingTop condensed`}>

                <motion.div
                    ref={ref}
                    className={styles.careerContentInner}
                    animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
                    initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
                    transition={hasAnimation ? { duration: 0.5, delay: 0.33, ease: "easeOut" } : { duration: 0, delay: 0 }}
                >

                    <PortableText
                        value={content}
                        components={portableTextComponents}
                    />

                </motion.div>

                <div className={styles.careerContentFooter}>

                    <div className={styles.careerContentFooterText}>

                        <h3>Interested in this role?</h3>

                        <span>Apply now and join the R4 team.</span>

                    </div>

                    <Button
                        hasAnimation={false}
                        text="Apply now"
                        href={`#`}
                        className="primary small"
                    />

                </div>

            </div>


        </div>

    );

}
