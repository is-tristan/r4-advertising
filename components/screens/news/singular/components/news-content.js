"use client";

// Next
import Link from "next/link";

// React
import { PortableText } from "@portabletext/react";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

// Styles
import styles from "../styles/news-singular.module.scss";

// Icons
import { arrowLeft } from "@/utils/icons";

const portableTextComponents = {
    types: {
        video: ({ value }) => {

            if (!value?.url) {

                return null;

            }

            const posterUrl = getSanityImageUrl(value.poster, "contentVideoPoster");

            return (

                <div className={`contentVideo`}>

                    <video
                        src={value.url}
                        poster={posterUrl || undefined}
                        controls
                        playsInline
                        preload="metadata"
                    />

                </div>

            );

        },
    },
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

export default function NewsContent({
    content,
    hasAnimation = true,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    if (!content?.length) {

        return null;

    }

    return (

        <div className={styles.newsContent}>

            <div className={`container noPaddingTop noPaddingBottom condensed`}>

                <motion.div
                    ref={ref}
                    className={`contentInner`}
                    animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
                    initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
                    transition={hasAnimation ? { duration: 0.5, delay: 0.33, ease: "easeOut" } : { duration: 0, delay: 0 }}
                >

                    <PortableText
                        value={content}
                        components={portableTextComponents}
                    />

                    <Link href="/news" className={`textLink`}>

                        <div className={`icon`} dangerouslySetInnerHTML={{ __html: arrowLeft }} />

                        <span>Back to news</span>

                    </Link>

                </motion.div>

            </div>

        </div>

    );

}
