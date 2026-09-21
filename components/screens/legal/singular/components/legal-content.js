"use client";

// React
import { PortableText } from "@portabletext/react";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

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

export default function LegalContent({
    content,
    hasAnimation = true,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.05 });

    if (!content?.length) {

        return null;

    }

    return (

        <div className={`container noPaddingTop condensed`}>

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

            </motion.div>

        </div>

    );

}
