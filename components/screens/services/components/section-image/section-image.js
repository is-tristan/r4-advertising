"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Next
import Image from "next/image";

// Styles
import styles from "./styles/section-image.module.scss";

export default function FeaturedImage({ image, alt }) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <div className="container noPaddingTop noPaddingBottom">

            <motion.div
                ref={ref}
                className={styles.sectionImage}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            >

                <Image
                    src={image}
                    alt={alt || ""}
                    fill
                    sizes="100vw"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                />

            </motion.div>

        </div>

    )

}
