"use client";

// Imports
import { useMemo, useState } from "react";

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import CareerItem from "./career-item";

// Styles
import styles from "../styles/career-grid.module.scss";

const locationFilters = ["London", "Cardiff"];

export default function CareersGridList({
    items = [],
}) {

    const [activeLocation, setActiveLocation] = useState("all");

    const locations = useMemo(() => {

        return locationFilters.filter((location) => items.some((item) => item.location?.toLowerCase().includes(location.toLowerCase())));

    }, [items]);

    const filteredItems = activeLocation === "all"
        ? items
        : items.filter((item) => item.location?.toLowerCase().includes(activeLocation.toLowerCase()));

    return (

        <>

            <div className={`container noPaddingBottom ${styles.careersGridHeader}`}>

                <Eyebrow
                    number="02"
                    text="Current openings"
                    type="heading"
                />

                {locations.length > 0 && (

                    <div className={styles.locationFilter} role="group" aria-label="Filter by location">

                        <button
                            type="button"
                            data-active={activeLocation === "all"}
                            aria-pressed={activeLocation === "all"}
                            onClick={() => setActiveLocation("all")}
                        >

                            <div className={styles.locationFilterButton}>

                                <span>All</span>

                            </div>

                        </button>

                        {locations.map((location) => (

                            <button
                                key={location}
                                type="button"
                                data-active={activeLocation === location}
                                aria-pressed={activeLocation === location}
                                onClick={() => setActiveLocation(location)}
                            >

                                <div className={styles.locationFilterButton}>

                                    <span>{location}</span>

                                </div>

                            </button>

                        ))}

                    </div>

                )}

            </div>

            <div className={`container noPaddingTop flexAuto flexAutoConstrained ${styles.careersGridList}`}>

                {filteredItems.map((item, index) => (

                    <CareerItem
                        key={item._id}
                        title={item.title}
                        slug={item.slug}
                        category={item.category}
                        location={item.location}
                        contractType={item.contractType}
                        salary={item.salary}
                        image={item.image}
                        excerpt={item.excerpt}
                        index={index}
                    />

                ))}

                {!filteredItems.length && (

                    <p className={styles.careersGridEmpty}>No openings in this location.</p>

                )}

            </div>

        </>

    );

}
