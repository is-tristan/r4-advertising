"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Next
import Image from "next/image";

export default function ImageCol({ image, alt, imagePosition = "right", className = undefined, imageFill = true }) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <>

            {imagePosition === "right" ? (

                <motion.div
                    ref={ref}
                    className={`imageCol ${imageFill ? "imageFill" : undefined} ${className}`}
                    animate={isInView ? { opacity: 1, x: 0, filter: "blur(0)" } : { opacity: 0, x: 16, filter: "blur(0.25rem)" }}
                    initial={{ opacity: 0, x: 16, filter: "blur(0.25rem)" }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >

                    <Image src={image} alt={alt} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />

                </motion.div>

            ) : (

                <motion.div
                    ref={ref}
                    className={`imageCol ${imageFill ? "imageFill" : undefined} ${className}`}
                    animate={isInView ? { opacity: 1, x: 0, filter: "blur(0)" } : { opacity: 0, x: -16, filter: "blur(0.25rem)" }}
                    initial={{ opacity: 0, x: -16, filter: "blur(0.25rem)" }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >

                    <Image src={image} alt={alt} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />

                </motion.div>

            )}

        </>

    )

}