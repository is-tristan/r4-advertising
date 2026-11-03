// Next
import { Image } from "next-sanity/image";

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import Text from "@/components/content/text/text";
import CategoryTags from "@/components/content/category-tags/category-tags";
import Button from "@/components/handlers/button";

// Sanity
import { getSanityImageAlt, getSanityImageUrl } from "@/sanity/lib/image";

// Styles
import styles from "../styles/work-carousel-section.module.scss";

export default function WorkCarouselItem({
    index,
    title,
    description,
    categories = [],
    hasFeaturedVideo = false,
    video,
    image,
    workHref = "/work",
}) {

    const imageUrl = getSanityImageUrl(image, "videoPoster");
    const imageAlt = getSanityImageAlt(image, title);

    return (

        <div
            className={styles.workCarouselItem}
            data-has-featured-video={hasFeaturedVideo ? "true" : "false"}
            style={{ position: "relative", zIndex: "100" }}
        >

            <div className={`container`}>

                <div className={`content ${styles.workCarouselItemContent}`}>

                    <div className={`titleContainer ${styles.workCarouselItemHeader}`}>

                        <Eyebrow text="Featured Showreel" className={styles.workCarouselItemEyebrow} />

                        {categories.length > 0 && (
                            <CategoryTags categories={categories} />
                        )}

                        <Text
                            title={title}
                            titleClass="sectionTitle"
                        />

                    </div>

                    <div className={`description ${styles.workCarouselItemDescription}`}>

                        <Text description={`<p>${description}</p>`} />

                    </div>

                    <div className={`buttons ${styles.workCarouselItemFooter}`}>

                        <Button href={workHref} text="View Case Study" />

                        <Button href={`/work`} text="View All Work" className={`transparent`} />

                    </div>

                </div>

            </div>

            {(video || imageUrl) && (

                <div className={styles.workCarouselItemVideo}>

                    {video ? (

                        <video
                            src={video}
                            poster={imageUrl || undefined}
                            muted
                            loop
                            playsInline
                            preload={index === 0 ? "metadata" : "none"}
                            aria-hidden="true"
                        />

                    ) : (

                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            sizes="100vw"
                            priority={index === 0}
                            loading={index === 0 ? undefined : "lazy"}
                            style={{ objectFit: "cover" }}
                        />

                    )}

                </div>

            )}

        </div>

    )

}
