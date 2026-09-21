"use client";

// React
import { useRef } from "react";

// Motion   
import { motion, useInView } from "motion/react";

// Next
import Link from "next/link";
import Image from "next/image";
const MotionLink = motion.create(Link);

// Styles
import styles from "./styles/spinner.module.scss";

export default function Spinner({
    type = "banner",
    background = "/images/home/banner-spinner-background.svg",
    text = "/images/home/banner-spinner-text.svg"
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (

        <MotionLink
            ref={ref}
            href="#"
            className={`${styles.spinner} hidden-s hidden-m hidden-l hidden-xl`}
            data-type={type}
            tabIndex={-1}
            role="presentation"
            aria-hidden="true"
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.33, ease: "easeOut" }}
        >

            <Image src={background} alt="" width={256} height={256} loading="lazy" className={styles.spinnerBackground} />

            <Image src={text} alt="" width={256} height={256} loading="lazy" className={styles.spinnerText} />

        </MotionLink>

    );

}
