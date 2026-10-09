/**
 * 📌 TODO: Add career contact form
**/

"use client";

// Components
import HubspotForm from "@/components/handlers/forms/hubspot-form";

// React
import { PortableText } from "@portabletext/react";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/career-singular.module.scss";

const portableTextComponents = {
    marks: {
        link: ({ children, value }) => {

            if (!value?.href) {
                return children;
            }

            return (

                <a
                    href={value.href}
                    target={value?.blank ? "_blank" : undefined}
                    rel={value?.blank ? "noopener noreferrer" : undefined}
                >

                    {children}

                </a>

            );

        },
    },
};

export default function CareerContent({
    content,
    hasAnimation = true,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (

        <div className={styles.careerContent}>

            <div className={`container noPaddingTop condensed`}>

                {content?.length ? (

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

                ) : null}

                <div className={styles.careerContentFooter}>

                    <div className={styles.careerContentFooterText}>

                        <h3>Interested in this role?</h3>

                        <span>Apply now and join the R4 team.</span>

                    </div>

                    <HubspotForm
                        portalId="139805116"
                        formId="2850ce22-89ef-4773-84b2-f3dd57ca1f99"
                    />

                </div>

            </div>


        </div>

    );

}
