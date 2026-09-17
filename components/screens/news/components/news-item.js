"use client";

// Next
import Link from "next/link";
import { Image } from "next-sanity/image";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

// Icons
import { arrowUpRight } from "@/utils/icons";

// Styles
import styles from "../styles/news-grid.module.scss";

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

export default function NewsItem({
    title,
    slug,
    image,
    excerpt,
    category,
    author,
    index = 0,
    hasAnimation = true,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const excerptText = getExcerpt(excerpt);
    const imageUrl = getSanityImageUrl(image, "newsCard");

    return (

        <motion.article
            ref={ref}
            className={styles.newsItemContainer}
            animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
            initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
            transition={hasAnimation ? { duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" } : { duration: 0, delay: 0 }}
        >

            <div className={styles.newsItem}>

                <div className={styles.newsItemContent}>

                    {imageUrl && (

                        <div className={styles.newsItemImage}>

                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                loading="lazy"
                                sizes="(max-width: 576px) 384px, (max-width: 1024px) 576px, 768px"
                            />

                        </div>

                    )}

                    <div className={styles.newsItemMetaItems}>

                        {category && (

                            <>

                                <span className={styles.newsItemMetaItem}>{category}</span>

                                <span className={styles.newsItemMetaItemSeperator} />

                            </>

                        )}

                        {author && (<span className={styles.newsItemMetaItem}>{author}</span>)}

                    </div>

                    <h3>{title}</h3>

                    {excerptText && (<p className={styles.newsItemExcerpt}>{excerptText}</p>)}

                </div>

                <span className={styles.newsItemReadMore} dangerouslySetInnerHTML={{ __html: arrowUpRight }} />

                <Link href={`/news/${slug}`} className={`colLink`} aria-label={`Read more about ${title}`} />

            </div>

        </motion.article>

    );

}
