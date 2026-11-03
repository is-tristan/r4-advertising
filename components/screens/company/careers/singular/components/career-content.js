/**
 * 📌 TODO: Add career contact form
**/

"use client";

// Components
import HubspotForm from "@/components/handlers/forms/hubspot-form";
import Text from "@/components/content/text/text";

// React
import { PortableText } from "@portabletext/react";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

// Styles
import styles from "../styles/career-singular.module.scss";

const portableTextComponents = {
    types: {
        image: ({ value }) => {

            const imageUrl = getSanityImageUrl(value, "contentImage");

            if (!imageUrl) {
                return null;
            }

            return (

                <div className="contentImage">

                    <img
                        src={imageUrl}
                        alt={value.alt || ""}
                        loading="lazy"
                        decoding="async"
                    />

                </div>

            );

        },
    },
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

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;");
}

function CareerContentSection({
    id,
    eyebrow,
    title,
    number,
    content,
    hasAnimation,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (

        <section id={id} className="row">

            <div className={`container condensed gapSm noPaddingTop noPaddingBottom`}>

                {title && (

                    <Text
                        hasAnimation={hasAnimation}
                        eyebrow={eyebrow ? { text: eyebrow, number: null } : undefined}
                        title={`<span class="colorPrimary">${number}</span> ${escapeHtml(title)}`}
                        titleClass="sectionTitle"
                    />

                )}

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

            </div>

        </section>

    );

}

export default function CareerContent({
    sections = [],
    hasAnimation = true,
}) {

    const visibleSections = sections.filter((section) => section.content?.length);

    return (

        <div className={styles.careerContent}>

            {visibleSections.map((section) => (

                <CareerContentSection
                    key={section.key}
                    id={`${section.key}Content`}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    number={section.number}
                    content={section.content}
                    hasAnimation={hasAnimation}
                />

            ))}

            <div className={`container noPaddingTop condensed`}>

                <div className={styles.careerContentFooter}>

                    <div className={styles.careerContentFooterText}>

                        <h3>Interested in this role?</h3>

                        <span>Apply now and join the R4 team.</span>

                    </div>

                    <div className={`hsForm`}>

                        <HubspotForm
                            portalId="139805116"
                            formId="2850ce22-89ef-4773-84b2-f3dd57ca1f99"
                        />

                    </div>

                </div>

            </div>


        </div>

    );

}
