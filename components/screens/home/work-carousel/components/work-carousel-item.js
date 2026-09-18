// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import Text from "@/components/content/text/text";
import CategoryTags from "@/components/content/category-tags/category-tags";
import Button from "@/components/handlers/button";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

// Styles
import styles from "../styles/work-carousel-section.module.scss";

export default function WorkCarouselItem({
    index,
    title,
    description,
    categories = [],
    video,
    videoPoster,
    workHref = "/work",
}) {

    const posterUrl = getSanityImageUrl(videoPoster, "videoPoster");

    return (

        <div className={styles.workCarouselItem}>

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

            {video && (

                <div className={styles.workCarouselItemVideo}>

                    <video
                        src={video}
                        poster={posterUrl || undefined}
                        muted
                        loop
                        playsInline
                        preload={index === 0 ? "metadata" : "none"}
                    />

                </div>

            )}

        </div>

    )

}
