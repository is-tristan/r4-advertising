// Next
import Image from "next/image";
import Link from "next/link";

// Styles
import styles from "../styles/news-singular.module.scss";

// Icons
import { facebookIcon, xIcon, linkedInIcon } from "@/utils/icons";

export default function NewsMeta({
    author,
    title,
    shareUrl,
}) {

    const encodedUrl = shareUrl ? encodeURIComponent(shareUrl) : "";
    const encodedTitle = title ? encodeURIComponent(title) : "";

    const shareLinks = [
        {
            key: "facebook",
            label: "Share on Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: facebookIcon,
        },
        {
            key: "x",
            label: "Share on X",
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            icon: xIcon,
        },
        {
            key: "linkedin",
            label: "Share on LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            icon: linkedInIcon,
        },
    ];

    return (

        <div className={styles.newsMeta}>

            {author?.name && (

                <div className={styles.authorMetaItem}>

                    {author.image && (

                        <Image
                            width={80}
                            height={80}
                            src={author.image}
                            alt={author.name}
                            loading="lazy"
                            sizes="80px"
                        />

                    )}

                    <span>By {author.name}</span>

                </div>

            )}

            {shareUrl && (

                <div className={styles.share}>

                    <span className={styles.shareLabel}>Share</span>

                    <div className={styles.shareIcons}>

                        {shareLinks.map((link) => (

                            <Link
                                key={link.key}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                title={link.label}
                                className={styles.shareIcon}
                                dangerouslySetInnerHTML={{ __html: link.icon }}
                            />

                        ))}

                    </div>

                </div>

            )}

        </div>

    );

}
