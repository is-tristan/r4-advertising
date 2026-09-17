"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Image } from "next-sanity/image";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

// Styles
import styles from "../styles/team-grid.module.scss";

// Icons
import { emailIcon, linkedInIcon } from "@/utils/icons";

export default function TeamItem({
    name,
    category,
    position,
    image,
    email,
    linkedIn,
    index = 0,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });
    const imageUrl = getSanityImageUrl(image, "teamCard");

    return (

        <motion.article
            ref={ref}
            className={styles.teamItem}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
        >

            {imageUrl && (

                <div className={styles.teamItemImage}>

                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 512px"
                    />

                </div>

            )}

            <div className={styles.teamItemContent}>

                <div className={styles.teamItemLeft}>

                    <span className={styles.teamItemCategory}>{category}</span>

                    <h3 className={styles.teamItemName}>{name}</h3>

                    <h4 className={styles.teamItemPosition}>{position}</h4>

                </div>

                <div className={styles.teamItemRight}>

                    {email && (

                        <a
                            href={`mailto:${email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.teamItemSocial}
                            dangerouslySetInnerHTML={{ __html: emailIcon }}
                            aria-label={`Email ${name}`}
                        />

                    )}

                    {linkedIn && (

                        <a
                            href={linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.teamItemSocial}
                            dangerouslySetInnerHTML={{ __html: linkedInIcon }}
                            aria-label={`LinkedIn ${name}`}
                        />

                    )}

                </div>

            </div>

        </motion.article>

    );

}
