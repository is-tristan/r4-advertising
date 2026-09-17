"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function NewsBannerReveal({
    children,
    className,
    delay = 0.15,
    hasAnimation = true,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.25 });

    return (

        <motion.div
            ref={ref}
            className={className}
            animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
            initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
            transition={hasAnimation ? { duration: 0.5, delay, ease: "easeOut" } : { duration: 0, delay: 0 }}
        >

            {children}

        </motion.div>

    );

}
