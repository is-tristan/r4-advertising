// Styles
import styles from "./styles/work-carousel-section.module.scss";

// Sanity
import { client } from "@/sanity/lib/client";
import { workCarouselQuery } from "@/sanity/lib/queries";

// Components
import WorkCarousel from "./components/work-carousel";
import Spinner from "@/components/decoration/spinner/spinner";

export default async function WorkCarouselSection() {

    const works = await client.fetch(workCarouselQuery, {}, {
        next: { revalidate: 1 },
    });

    return (

        <section className={`row bgDark ${styles.workCarouselSection}`}>

            <WorkCarousel works={works} />

            <Spinner className={`bannerSpinner`} />

        </section>

    )

}
