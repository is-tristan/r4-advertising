"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

export default function FeaturedVideoItem({ video, videoPoster }) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const posterUrl = getSanityImageUrl(videoPoster, "videoPoster");

    return (

        <motion.div
            ref={ref}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            style={{ width: "100%", height: "100%" }}
        >

            <video
                src={video}
                poster={posterUrl || undefined}
                controls
                muted
                playsInline
                autoPlay
                loop
                style={{ width: "100%", height: "100%", borderRadius: "1rem", objectFit: "cover" }}
            />


        </motion.div>

    )

}
