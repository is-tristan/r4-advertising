"use client";

// Link
import Link from "next/link";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "./styles/category-tags.module.scss";

export default function CategoryTags({
    hasAnimation = true,
    className,
    categories = [],
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    const normalizedCategories = categories
        .filter(Boolean)
        .map((category, index) => {

            if (typeof category === "string") {

                return {
                    key: `${category}-${index}`,
                    title: category,
                    href: undefined,
                };

            }

            return {
                key: category._id || category.title || index,
                title: category.title,
                href: category.href,
            };

        })
        .filter((category) => category.title);

    if (!normalizedCategories.length) {

        return null;

    }

    return (

        <div ref={ref} className={`${styles.categoryTags} ${className}`} data-theme="primary">

            {normalizedCategories.map((category, index) => {

                const animationProps = {
                    animate: hasAnimation
                        ? (isInView
                            ? { opacity: 1, x: 0, filter: "blur(0)" }
                            : { opacity: 0, x: 16, filter: "blur(0.25rem)" })
                        : { opacity: 1, x: 0, filter: "blur(0)" },
                    initial: hasAnimation
                        ? { opacity: 0, x: 16, filter: "blur(0.25rem)" }
                        : { opacity: 1, x: 0, filter: "blur(0)" },
                    transition: hasAnimation
                        ? { duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }
                        : { duration: 0, delay: 0 },
                };

                if (!category.href) {

                    return (

                        <motion.span
                            key={category.key}
                            className={`${styles.categoryTag}`}
                            {...animationProps}
                        >

                            {category.title}

                        </motion.span>

                    );

                }

                return (

                    <motion.div
                        key={category.key}
                        {...animationProps}
                    >

                        <Link href={category.href} className={`${styles.categoryTag}`}>

                            {category.title}

                        </Link>

                    </motion.div>

                );

            })}

        </div>

    );

}
