"use client";

// Link
import Link from "next/link";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "@/styles/components/content/category-tags.module.scss";

export default function CategoryTags({
    categories = [],
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <div ref={ref} className={`${styles.categoryTags}`} data-theme="primary">

            {categories.map((category, index) => {

                const animationProps = {
                    animate: isInView
                        ? { opacity: 1, x: 0, filter: "blur(0)" }
                        : { opacity: 0, x: 16, filter: "blur(0.25rem)" },
                    initial: { opacity: 0, x: 16, filter: "blur(0.25rem)" },
                    transition: { duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" },
                }

                if (!category.href) {

                    return (

                        <motion.span
                            key={category._id}
                            className={`${styles.categoryTag}`}
                            {...animationProps}
                        >

                            {category.title}

                        </motion.span>

                    )

                }

                return (

                    <motion.div
                        key={category._id}
                        {...animationProps}
                    >

                        <Link href={category.href} className={`${styles.categoryTag}`}>

                            {category.title}

                        </Link>

                    </motion.div>

                )

            })}

        </div>

    )

}
