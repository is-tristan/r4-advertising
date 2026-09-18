"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";

export default function Text({
    hasAnimation = true,
    className = undefined,
    alignment = "default",
    eyebrow = null,
    title,
    titleTag = "h2",
    titleClass = undefined,
    description,
    descriptionClass = undefined,
}) {

    const {
        number = undefined,
        text = undefined,
        eyebrowTheme = "light"
    } = eyebrow ?? {};

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <div ref={ref} className={`innerContent ${className}`} data-alignment={alignment}>

            {title && (

                <motion.div
                    animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
                    initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
                    transition={hasAnimation ? { duration: 0.5, delay: 0.15 } : { duration: 0, delay: 0 }}
                    className={`titleContainer`}
                >

                    {text && (

                        <Eyebrow number={number} text={text} hasAnimation={hasAnimation} theme={eyebrowTheme} />

                    )}

                    {(() => {
                        switch (titleTag) {
                            case "h1":
                                return <h1 className={`${titleClass}`} dangerouslySetInnerHTML={{ __html: title }} />;
                            case "h2":
                                return <h2 className={`${titleClass}`} dangerouslySetInnerHTML={{ __html: title }} />;
                            case "h3":
                                return <h3 className={`${titleClass}`} dangerouslySetInnerHTML={{ __html: title }} />;
                            case "h4":
                                return <h4 className={`${titleClass}`} dangerouslySetInnerHTML={{ __html: title }} />;
                            case "h5":
                                return <h5 className={`${titleClass}`} dangerouslySetInnerHTML={{ __html: title }} />;
                            case "h6":
                                return <h6 className={`${titleClass}`} dangerouslySetInnerHTML={{ __html: title }} />;
                            default:
                                return null;
                        }
                    })()}

                </motion.div>

            )}

            {description && (

                <motion.div
                    animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
                    initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
                    transition={hasAnimation ? { duration: 0.5, delay: 0.15 } : { duration: 0, delay: 0 }}
                    className={`description ${descriptionClass}`}
                    dangerouslySetInnerHTML={{ __html: description }}
                >

                </motion.div>

            )}

        </div>

    )

}
