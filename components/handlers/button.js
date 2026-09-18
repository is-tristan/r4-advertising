"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Next
import Link from "next/link";

// Icons
import { arrowUpRight } from "@/utils/icons";

export default function Button({
    text,
    href,
    target = "_self",
    className = "primary",
    hasAnimation = true,
    icon = arrowUpRight,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.25 });

    return (

        <motion.div
            ref={ref}
            animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
            initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="btnAnimContainer"
        >

            <Link href={href || "#"} target={target} className={`btn ${className}`}>

                <span>{text}</span>

                {icon && (<div className={"icon"} dangerouslySetInnerHTML={{ __html: icon }} />)}

            </Link>

        </motion.div>

    )

}