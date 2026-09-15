// Components
import Eyebrow from "@/components/content/eyebrow";
import Text from "@/components/content/text";
import CategoryTags from "@/components/content/category-tags";
import Button from "@/components/handlers/buttons";

// Styles
import styles from "../styles/work-carousel-section.module.scss";

export default function WorkCarouselItem({
    title,
    description,
    categories = [],
    video,
    videoPoster,
    workHref = "/work",
}) {

    return (

        <div className={styles.workCarouselItem}>

            <div className={`container`}>

                <div className={`content ${styles.workCarouselItemContent}`}>

                    <div className={`titleContainer ${styles.workCarouselItemHeader}`}>

                        <Eyebrow text="Featured Showreel" className={styles.workCarouselItemEyebrow} />

                        <Text
                            title={title}
                            titleClass="sectionTitle"
                        />

                        {categories.length > 0 && (

                            <CategoryTags categories={categories} />

                        )}

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
                        poster={videoPoster}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />

                </div>

            )}

        </div>

    )

}
