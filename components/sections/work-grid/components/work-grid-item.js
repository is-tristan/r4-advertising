"use client";

// Next
import Link from "next/link";
import { Image } from "next-sanity/image";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Components
import CategoryTags from "@/components/content/category-tags/category-tags";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

// Styles
import styles from "../styles/work-grid.module.scss";

// Icons
import { arrowUpRight } from "@/utils/icons";

export default function WorkGridItem({
    item,
    index = 0,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const imageUrl = getSanityImageUrl(item.image, "workGrid");
    const href = item.slug ? `/work/${item.slug}` : "/work";

    return (

        <motion.article
            ref={ref}
            className={styles.workGridItemAnimationContainer}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
            style={{ width: "100%", height: "100%" }}
        >

            <div className={styles.workGridItem}>

                <div className={styles.workGridItemContent}>

                    {item.category && (

                        <CategoryTags
                            hasAnimation={false}
                            categories={[item.category]}
                        />

                    )}

                    <h3 className={styles.workGridItemTitle}>{item.title}</h3>

                    <Link
                        href={href}
                        className={styles.workGridItemLink}
                        dangerouslySetInnerHTML={{ __html: arrowUpRight }}
                    />

                </div>

                {imageUrl && (

                    <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 384px, (max-width: 1200px) 576px, 768px"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                    />

                )}

                <Link
                    href={href}
                    className={`colLink`}
                />

            </div>

        </motion.article>

    )

}
