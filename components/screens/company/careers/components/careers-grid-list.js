"use client";

// Imports
import { useMemo, useState } from "react";

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import CareerItem from "./career-item";
import LocationFilter from "./location-filter";

// Styles
import styles from "../styles/career-grid.module.scss";

export default function CareersGridList({
    items = [],
}) {

    const [activeLocation, setActiveLocation] = useState("all");

    const locations = useMemo(() => {

        const titles = [];

        items.forEach((item) => {

            item.locations?.forEach((location) => {

                if (location?.title && !titles.includes(location.title)) {

                    titles.push(location.title);

                }

            });

        });

        return titles;

    }, [items]);

    const filteredItems = activeLocation === "all"
        ? items
        : items.filter((item) => item.locations?.some((location) => location.title === activeLocation));

    return (

        <>

            <div className={`container noPaddingBottom ${styles.careersGridHeader}`}>

                <Eyebrow
                    number="02"
                    text="Current openings"
                    type="heading"
                />

                <LocationFilter
                    locations={locations}
                    activeLocation={activeLocation}
                    onSelect={setActiveLocation}
                />

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
