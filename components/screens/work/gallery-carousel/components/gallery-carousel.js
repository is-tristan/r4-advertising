"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Next
import Image from "next/image";

// Splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

// Sanity
import { getSanityImageUrl } from "@/sanity/lib/image";

// Styles
import styles from "../styles/gallery-carousel.module.scss";

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

export default function GalleryCarousel({
    video,
    videoPoster,
    gallery = [],
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const posterUrl = getSanityImageUrl(videoPoster, "videoPoster");

    const gallerySlides = (gallery ?? [])
        .map((image, index) => {
            const imageUrl = getSanityImageUrl(image, "workGallery");

            if (!imageUrl) {
                return null;
            }

            return {
                key: image?._key || `gallery-${index}`,
                type: "image",
                imageUrl,
            };
        })
        .filter(Boolean);

    const slides = [
        ...(video
            ? [{
                key: "video",
                type: "video",
                video,
                posterUrl,
            }]
            : []),
        ...gallerySlides,
    ];

    if (!slides.length) {
        return null;
    }

    return (

        <motion.div
            ref={ref}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            style={{ width: "100%", height: "100%" }}
        >

            <Splide
                className={`${styles.galleryCarousel} hasArrows`}
                options={{
                    type: "slide",
                    perPage: 1,
                    perMove: 1,
                    gap: "0",
                    pagination: true,
                    arrows: true,
                    rewind: true,
                    classes: {
                        pagination: `splide__pagination ${styles.galleryPagination}`,
                    },
                    breakpoints: {
                        1023: {
                            arrows: false,
                        }
                    }
                }}
                onActive={playSlideVideo}
                onInactive={pauseSlideVideo}
            >

                {slides.map((slide, index) => (

                    <SplideSlide key={slide.key} className={styles.galleryCarouselSlide}>

                        {slide.type === "video" ? (

                            <video
                                src={slide.video}
                                poster={slide.posterUrl || undefined}
                                muted
                                loop
                                playsInline
                                controls
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />

                        ) : (

                            <Image
                                src={slide.imageUrl}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                sizes="100%"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />

                        )}

                    </SplideSlide>

                ))}

            </Splide>

        </motion.div>

    )

}
