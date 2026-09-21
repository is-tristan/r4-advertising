"use client";

// Imports
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";

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

    video.play().catch(() => { });
}

function pauseSlideVideo(splide, slide) {
    const video = getSlideVideo(slide);

    if (!video) {
        return;
    }

    video.pause();
}

function pauseAllVideos(root) {
    root?.querySelectorAll("video").forEach((video) => {
        video.pause();
    });
}

function playActiveVideo(root) {
    const activeVideo = root?.querySelector(".splide__slide.is-active video")
        || root?.querySelector("video");

    if (!activeVideo) {
        return;
    }

    activeVideo.play().catch(() => { });
}

export default function WorkCarousel({ works = [] }) {

    const containerRef = useRef(null);
    const isVisibleRef = useRef(false);
    const isInView = useInView(containerRef, { amount: 0.25 });

    useEffect(() => {

        isVisibleRef.current = isInView;

        if (!containerRef.current) {
            return;
        }

        if (isInView) {
            playActiveVideo(containerRef.current);
            return;
        }

        pauseAllVideos(containerRef.current);

    }, [isInView]);

    if (!works.length) {
        return null;
    }

    return (

        <div ref={containerRef}>

            <Splide
                className={`${styles.workCarousel} hasPagination hasArrows`}
                options={{
                    type: "slide",
                    perPage: 1,
                    perMove: 1,
                    gap: "0",
                    pagination: true,
                    arrows: true,
                    rewind: true,
                    breakpoints: {
                        1023: {
                            arrows: false,
                        }
                    }
                }}
                onActive={(splide, slide) => {

                    if (!isVisibleRef.current) {
                        pauseSlideVideo(splide, slide);
                        return;
                    }

                    playSlideVideo(splide, slide);

                }}
                onInactive={pauseSlideVideo}
            >

                {works.map((work, index) => (

                    <SplideSlide key={work._id}>

                        <WorkCarouselItem
                            index={index}
                            title={work.title}
                            description={work.description}
                            categories={work.categories}
                            video={work.video}
                            videoPoster={work.videoPoster}
                            workHref={work.slug ? `/work/${work.slug}` : "/work"}
                        />

                    </SplideSlide>

                ))}

            </Splide>

        </div>

    )

}
