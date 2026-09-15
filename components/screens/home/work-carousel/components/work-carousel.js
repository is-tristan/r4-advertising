"use client";

// Splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

// Styles
import styles from "../styles/work-carousel-section.module.scss";

// Components
import WorkCarouselItem from "./work-carousel-item";

function getSlideVideo(slide) {
    return slide?.slide?.querySelector("video") || null;
}

function playSlideVideo(splide, slide) {
    const video = getSlideVideo(slide);

    if (!video) {
        return;
    }

    video.play().catch(() => {});
}

function pauseSlideVideo(splide, slide) {
    const video = getSlideVideo(slide);

    if (!video) {
        return;
    }

    video.pause();
}

export default function WorkCarousel({ works = [] }) {

    if (!works.length) {
        return null;
    }

    return (

        <Splide
            className={styles.workCarousel}
            options={{
                type: "slide",
                perPage: 1,
                perMove: 1,
                gap: "0",
                autoplay: true,
                interval: 5500,
                pagination: false,
                arrows: false,
                breakpoints: {
                    1023: {
                        arrows: false,
                    }
                }
            }}
            onActive={playSlideVideo}
            onInactive={pauseSlideVideo}
        >

            {works.map((work) => (

                <SplideSlide key={work._id}>

                    <WorkCarouselItem
                        title={work.title}
                        description={work.description}
                        categories={work.categories}
                        video={work.video}
                        videoPoster={work.videoPoster}
                        workHref="/work"
                    />

                </SplideSlide>

            ))}

        </Splide>

    )

}
