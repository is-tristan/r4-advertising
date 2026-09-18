"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Forms from "@/components/handlers/forms/components/forms";

export default function FormClient({
    hasAnimation = true,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (

        <motion.div
            ref={ref}
            animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
            initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
            transition={hasAnimation ? { duration: 0.5, delay: 0.33, ease: "easeOut" } : { duration: 0, delay: 0 }}
        >

            <Forms />

        </motion.div>

    );

}
