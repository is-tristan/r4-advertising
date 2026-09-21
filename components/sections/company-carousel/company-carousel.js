"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

// Styles
import styles from "./styles/company-carousel.module.scss";

// Data
import { companyData } from "@/data/company-carousel-data";

// Icons
import { brandMark } from "@/utils/icons";

export default function CompanyCarousel() {

    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.2 });

    const [trackWidth, setTrackWidth] = useState(0);

    useEffect(() => {

        const track = trackRef.current;

        if (!track) return;

        const updateTrackWidth = () => {

            setTrackWidth(Math.max(0, track.scrollWidth - window.innerWidth));

        };

        updateTrackWidth();

        const resizeObserver = new ResizeObserver(updateTrackWidth);

        resizeObserver.observe(track);

        window.addEventListener("resize", updateTrackWidth);

        return () => {

            resizeObserver.disconnect();

            window.removeEventListener("resize", updateTrackWidth);

        };

    }, []);

    return (

        <section ref={sectionRef} className={`${styles.companyCarousel}`}>

            <div
                ref={trackRef}
                className={`${styles.companyCarouselTrack}`}
                data-paused={!isInView}
                style={{
                    minWidth: trackWidth ? `${trackWidth}px` : undefined,
                    "--companyCarouselTrackWidth": trackWidth ? `${trackWidth}px` : undefined
                }}
            >

                {companyData.map((company, index) => (

                    <Fragment key={index}>

                        <div className={`${styles.companyCarouselBrandMark}`} dangerouslySetInnerHTML={{ __html: brandMark }} />

                        <div className={`${styles.companyCarouselItem}`}>

                            <span>{company.name}</span>

                        </div>

                    </Fragment>

                ))}

            </div>

        </section>

    );

}
