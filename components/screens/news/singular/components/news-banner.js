// Next
import Link from "next/link";
import { Image } from "next-sanity/image";

// Components
import Text from "@/components/content/text/text";
import NewsMeta from "@/components/screens/news/singular/components/news-meta";
import NewsBannerReveal from "@/components/screens/news/singular/components/news-banner-reveal";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

// Styles
import styles from "../styles/news-singular.module.scss";

// Icons
import { arrowLeft } from "@/utils/icons";

export default function NewsBanner({
    author,
    category,
    title,
    image,
    excerpt,
    shareUrl,
}) {

    const imageUrl = getSanityImageUrl(image, "newsBanner");

    return (

        <section id="banner" className={`row headerOffset ${styles.newsBanner}`}>

            <div className={`container gapSm condensed noPaddingBottom`}>

                <NewsBannerReveal
                    className={`content gapMd ${styles.bannerContent}`}
                    delay={0.15}
                >

                    <Link href="/news" className={`textLink`}>

                        <div className={`icon`} dangerouslySetInnerHTML={{ __html: arrowLeft }} />

                        <span>Back to news</span>

                    </Link>

                    {category && (<span className={`${styles.newsMetaItem} colorPrimary`}>{category}</span>)}

                    <Text
                        hasAnimation={false}
                        titleTag="h1"
                        titleClass={styles.newsBannerTitle}
                        title={title}
                    />

                    <Text
                        hasAnimation={false}
                        description={excerpt ? `<p>${excerpt}</p>` : undefined}
                    />

                    <NewsMeta
                        author={author}
                        title={title}
                        shareUrl={shareUrl}
                    />

                </NewsBannerReveal>

                {imageUrl && (

                    <NewsBannerReveal
                        className={styles.newsBannerImage}
                        delay={0.3}
                    >

                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 960px"
                            priority
                        />

                    </NewsBannerReveal>

                )}

            </div>

        </section>

    );

}
