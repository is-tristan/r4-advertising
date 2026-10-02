"use client";

// Next
import Link from "next/link";

// React
import { useEffect, useRef, useState } from "react";

// Styles
import styles from "./styles/sticky-nav.module.scss";

const sectionIds = ["trade", "plan", "activate"];

function getHeaderOffset() {

    const header = document.getElementById("header");

    if (!header) {
        return 0;
    }

    return header.getBoundingClientRect().height;

}

export default function StickyNav() {

    const sentinelRef = useRef(null);
    const navRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const [activeId, setActiveId] = useState("");
    const [navHeight, setNavHeight] = useState(0);
    const [headerOffset, setHeaderOffset] = useState(0);

    useEffect(() => {

        const nav = navRef.current;

        if (!nav) {

            return;

        }

        const updateHeight = () => {

            setNavHeight(nav.offsetHeight);

        };

        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);

        resizeObserver.observe(nav);

        const update = () => {

            const sentinel = sentinelRef.current;
            const currentHeaderOffset = getHeaderOffset();
            const marker = currentHeaderOffset + nav.offsetHeight;

            setHeaderOffset(currentHeaderOffset);

            if (sentinel) {

                setIsSticky(sentinel.getBoundingClientRect().top <= currentHeaderOffset);

            }

            let nextActiveId = "";

            sectionIds.forEach((id) => {

                const section = document.getElementById(id);

                if (!section) {

                    return;

                }

                section.style.scrollMarginTop = `${marker}px`;

                const rect = section.getBoundingClientRect();
                const containsMarker = rect.top <= marker && rect.bottom > marker;
                const isVisible = rect.bottom > marker && rect.top < window.innerHeight;

                if (containsMarker) {

                    nextActiveId = id;

                    return;

                }

                if (!nextActiveId && isVisible) {

                    nextActiveId = id;

                }

            });

            setActiveId(nextActiveId);

        };

        update();

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {

            resizeObserver.disconnect();
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);

        };

    }, []);

    const isActive = (id) => activeId === id;

    return (

        <div
            ref={sentinelRef}
            className={styles.stickyNavSentinel}
            style={isSticky ? { height: navHeight } : undefined}
        >

            <div
                ref={navRef}
                className={`${styles.stickyNav} borderTop borderBottom`}
                data-sticky={isSticky}
                style={isSticky ? { top: headerOffset } : undefined}
            >

                <div className={`container ${styles.stickyNavContainer}`}>

                    <Link className={styles.stickyNavLink} href="#trade" data-active={isActive("trade")}>Trade</Link>

                    <span className={styles.stickyNavSeperator}><span style={{ width: "0" }}></span></span>

                    <Link className={styles.stickyNavLink} href="#plan" data-active={isActive("plan")}>Plan</Link>

                    <span className={styles.stickyNavSeperator}><span style={{ width: "0" }}></span></span>

                    <Link className={styles.stickyNavLink} href="#activate" data-active={isActive("activate")}>Activate</Link>

                </div>

            </div>

        </div>

    );

}
