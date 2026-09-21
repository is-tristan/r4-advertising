"use client";

// React
import { PortableText } from "@portabletext/react";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Components
import Text from "@/components/content/text/text";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

const portableTextComponents = {
    types: {
        video: ({ value }) => {

            if (!value?.url) {
                return null;
            }

            const posterUrl = getSanityImageUrl(value.poster, "contentVideoPoster");

            return (

                <div className="contentVideo">

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
    list: {
        bullet: ({ children }) => (

            <ul className="contentList">

                {children}

            </ul>

        ),
        number: ({ children }) => (

            <ol className="contentList">

                {children}

            </ol>

        ),
    },
};

export default function ContentSectionItem({
    id,
    content,
    dataType,
    eyebrow,
    title,
    titleClass = "sectionTitle",
    containerClass = "gapSm noPaddingTop noPaddingBottom",
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    if (!content?.length) {
        return null;
    }

    return (

        <section id={id} data-type={dataType} className="row">

            <div className={`container condensed ${containerClass}`}>

                {(eyebrow || title) && (

                    <Text
                        eyebrow={eyebrow}
                        title={title}
                        titleClass={titleClass}
                    />

                )}

                <motion.div
                    ref={ref}
                    data-type={dataType}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                    initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                    className="contentInner"
                >

                    <PortableText
                        value={content}
                        components={portableTextComponents}
                    />

                </motion.div>

            </div>

        </section>

    )

}
