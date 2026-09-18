"use client";

// Components
import CategoryTags from "@/components/content/category-tags/category-tags";
import Button from "@/components/handlers/button";
import CareerMetaItem from "./career-meta-item";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Next
import Link from "next/link";
import { Image } from "next-sanity/image";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

// Styles
import styles from "../styles/career-grid.module.scss";

function getExcerpt(text, max = 75, min = 50) {

    if (!text) return "";

    const withoutHeading = text.replace(/^[^\n]{1,40}\n+/, "");

    const clean = withoutHeading.replace(/\s+/g, " ").trim();

    if (!clean) return "";

    if (clean.length <= max) return clean;

    const sliced = clean.slice(0, max);

    const lastSpace = sliced.lastIndexOf(" ");

    const cut = lastSpace >= min ? sliced.slice(0, lastSpace) : sliced;

    return `${cut}…`;

}

export default function CareerItem({
    title,
    slug,
    category,
    location,
    contractType,
    salary,
    image,
    excerpt,
    index = 0,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });
    const excerptText = getExcerpt(excerpt);
    const imageUrl = getSanityImageUrl(image, "careerCard");

    return (

        <motion.article
            ref={ref}
            className={styles.careerItemAnimationContainer}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
        >

            <div className={styles.careerItem}>

                {imageUrl && (

                    <div className={styles.careerItemImage}>

                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            loading="lazy"
                            sizes="(max-width: 768px) 384px, 512px"
                        />

                    </div>

                )}

                <div className={styles.careerItemInner}>

                    <div className={styles.careerItemContent}>

                        {category && (

                            <CategoryTags
                                hasAnimation={false}
                                className={styles.careerItemCategoryTags}
                                categories={[category]}
                            />

                        )}

                        {title && (<h3 className={styles.careerItemContentTitle}>{title}</h3>)}

                        <CareerMetaItem
                            hasAnimation={false}
                            contractType={contractType}
                            location={location}
                            salary={salary}
                        />

                        {excerptText && (<p className={styles.careerItemContentExcerpt}>{excerptText}</p>)}

                    </div>

                    <div className={styles.careerItemContentFooter}>

                        <Button
                            hasAnimation={false}
                            text="View details"
                            href={`/company/careers/${slug}`}
                            className="primary small"
                        />

                    </div>

                </div>

                <Link href={`/company/careers/${slug}`} className={`colLink`} aria-label={`View details for ${title}`} />

            </div>

        </motion.article>

    );

}
